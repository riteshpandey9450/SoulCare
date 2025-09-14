# Save this file as main.py
import os
import google.generativeai as genai
import chromadb
import datetime
import json
import re
import time
from dotenv import load_dotenv
load_dotenv()

# --- SETUP & CONSTANTS ---
try:
    genai.configure(api_key=os.environ["GEMINI_API_KEY"])
except KeyError:
    print("CRITICAL ERROR: GEMINI_API_KEY environment variable not set.")
    exit()

EMBEDDING_MODEL = "models/text-embedding-004"
DB_PATH = "./chroma_db"
COLLECTION_NAME = "mental_health_support"
# LOG_FILE = "conversation_log.txt"
LOG_DIR = "conversation_logs"

# ==============================================================================
# --- SAFETY SYSTEM ---
# ==============================================================================
CRISIS_KEYWORDS = [
    "kill myself", "suicide", "end my life", "wanna die", "want to die", "all lonely",
    "disappear forever", "not worth living", "can't go on", "want it to be over", "no one gets me"
]

def check_keywords(user_input):
    return any(keyword in user_input.lower() for keyword in CRISIS_KEYWORDS)

def check_with_llm_classifier(user_input):
    classification_model = genai.GenerativeModel('gemini-1.5-flash')
    prompt = f"Classify the following message as 'CRISIS' or 'SAFE'. 'CRISIS' means the user is expressing suicidal ideation. User Message: \"{user_input}\"\nClassification:"
    try:
        response = classification_model.generate_content(prompt)
        return "CRISIS" in response.text.upper()
    except Exception: return True # Default to crisis for safety

def get_helpline_response():
    return "⚠️ It sounds like you are going through a very difficult time. Please know that help is available. In India, you can contact iCall at +91 9152987821 or AASRA at +91-9820466726."

import json

def get_counselor_info_response():
    """
    Loads counselor information for a single university from a JSON file
    and returns a formatted, detailed response.
    """
    try:
        with open("counselor_directory.json", "r", encoding="utf-8") as f:
            directory = json.load(f)
    except FileNotFoundError:
        return "⚠️ It sounds like you are going through a difficult time. The campus counselor directory is currently unavailable. Please contact student services for immediate assistance."

    # Extract info from the JSON
    center = directory.get("counseling_center", {})
    counselors = directory.get("counselors", [])

    # Format the response message
    message = (
        f"✅ Reaching out is a sign of strength. Your university has a dedicated team at the "
        f"**{center.get('name', 'Counseling Center')}** ready to support you.\n\n"
        "Here is their contact information:\n"
    )

    details = []
    if center.get('location'):
        details.append(f"- **📍 Location**: {center['location']}")
    if center.get('phone'):
        details.append(f"- **📞 Phone**: `{center['phone']}` (for appointments)")
    if center.get('email'):
        details.append(f"- **✉️ Email**: {center['email']}")
    if center.get('hours'):
        details.append(f"- **🕒 Hours**: {center['hours']}")
    
    message += "\n".join(details)
    
    if counselors:
        message += "\n\n**Meet the Counseling Team:**\n"
        counselor_list = []
        for counselor in counselors:
            counselor_info = f"- **{counselor['name']}** ({counselor['title']}): {counselor['specialization']}"
            counselor_list.append(counselor_info)
        message += "\n".join(counselor_list)
        
    message += "\n\nAll conversations are confidential. Please don't hesitate to connect with them."
    
    return message

def generate_session_summary(conversation_history, session_log_path):
    """
    Generates a summary of the bot's advice, saves it to a file linked
    to the conversation log, and returns the summary text.
    """
    SUMMARY_DIR = "summaries"

    bot_responses = [
        turn['parts'][0]['text']
        for turn in conversation_history
        if turn['role'] == 'model'
    ]

    if not bot_responses:
        return "No specific advice was provided in this session."

    bot_responses_text = "\n\n---\n\n".join(bot_responses)

    model = genai.GenerativeModel('gemini-1.5-flash')
    prompt = f"""
    Analyze the following responses from the wellness bot 'Elara'.
    Your task is to extract only the actionable advice and coping strategies that Elara suggested.
    Create a concise, clear summary for a user's dashboard.
    The summary should be a list of key techniques or suggestions the user can try. Use bullet points.
    --- ELARA'S RESPONSES ---
    {bot_responses_text}
    --- END RESPONSES ---
    Summary of Elara's Key Suggestions:
    """
    try:
        response = model.generate_content(prompt)
        summary_text = response.text

        os.makedirs(SUMMARY_DIR, exist_ok=True)

        base_log_filename = os.path.basename(session_log_path)
        summary_filename = base_log_filename.replace("log_", "summary_", 1)
        filepath = os.path.join(SUMMARY_DIR, summary_filename)

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(summary_text)

        print(f"\n✅ Summary successfully saved to: {filepath}")

        # D. Return the summary text as before.
        return summary_text

    except Exception as e:
        return f"Could not generate or save a summary. Error: {e}"

# ==============================================================================
# --- CORE RAG CHATBOT LOGIC ---
# ==============================================================================
def get_relevant_context(user_query, db_collection):
    query_embedding = genai.embed_content(model=EMBEDDING_MODEL, content=user_query)['embedding']
    results = db_collection.query(query_embeddings=[query_embedding], n_results=2)
    return "\n---\n".join(results['documents'][0])

def generate_response(user_query, db_collection, conversation_history):
    print(f"\n🔍 User Query: '{user_query}'")
    if check_keywords(user_query) or check_with_llm_classifier(user_query):
        print("🚨 Crisis detected. Providing on-campus counselor information...")
        return get_counselor_info_response()
    
    print("✅ Safety checks passed. Retrieving context...")
    retrieved_context = get_relevant_context(user_query, db_collection)

    history_str = "\n".join([f"{'You' if turn['role'] == 'user' else 'Sahay'}: {turn['parts'][0]['text']}" for turn in conversation_history])
    
    prompt_template = """
    You are 'Elara', a supportive and empathetic AI wellness assistant for college students.
    Your role is to provide helpful first-aid coping strategies. You are not a doctor.
    You must always be caring, reassuring, and safe.
    Never give medical advice. If a user seems to be in a crisis, you must advise them to seek professional help immediately.
    Your goal is to have a natural, caring conversation.
    
    Based on the context provided below, answer the user's query.
    If no specific context is provided, offer general support and encouragement.
    
    Review the 'CONVERSATION HISTORY' to understand what has already been discussed.
    Use the 'CONTEXT FROM KNOWLEDGE BASE' only if the user asks a new question or needs specific information.
    If the user is simply replying to you or expressing feelings, prioritize continuing the conversation naturally based on the history. Avoid repeating advice.

    --- CONVERSATION HISTORY ---
    {history}
    --- END HISTORY ---

    --- CONTEXT FROM KNOWLEDGE BASE ---
    {context}
    --- END CONTEXT ---

    User's New Message: {query}
    
    Your Helpful Response:
    """
    # 3. Pass the formatted history string into the prompt
    prompt = prompt_template.format(history=history_str, context=retrieved_context, query=user_query)
    
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content(prompt)
    return response.text

# ==============================================================================
# --- MAIN EXECUTION with Logging ---
# ==============================================================================
def log_conversation(user_msg, bot_msg, session_log_path):
    """Appends a conversation turn to a session-specific log file."""
    os.makedirs(LOG_DIR, exist_ok=True)

    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_entry = f"[{timestamp}] You: {user_msg}\n[{timestamp}] Elara: {bot_msg}\n\n"

    try:
        with open(session_log_path, "a", encoding="utf-8") as f:
            f.write(log_entry)
    except Exception as e:
        print(f"Warning: Could not write to log file {session_log_path}. Error: {e}")
   
if __name__ == "__main__":
    try:
        client = chromadb.PersistentClient(path=DB_PATH)
        db = client.get_collection(name=COLLECTION_NAME)
    except Exception as e:
        print("❌ DATABASE NOT FOUND. Please run 'python build_database.py' first.")
        exit()
    
    while True:
        conversation_history = []
        
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        session_log_filename = f"log_{timestamp}.txt"
        session_log_path = os.path.join(LOG_DIR, session_log_filename)

        print("\n" + "="*50)
        print("🤖 Meet Elara — your Shining support for every student moment")
        print("Type 'quit' to exit.")
        print("="*50)

        while True:
            user_input = input("You: ")
            
            if user_input.lower() == 'quit':
                break

            ai_response = generate_response(user_input, db, conversation_history)
            
            conversation_history.append({"role": "user", "parts": [{"text": user_input}]})
            conversation_history.append({"role": "model", "parts": [{"text": ai_response}]})

            print("\n🤖 Elara says:")
            print(ai_response)
            
            log_conversation(user_input, ai_response, session_log_path)
            
            print("\n" + "-"*50)

        if conversation_history:
            print("\n🤖 Elara is generating a summary of your conversation...")
            
            summary = generate_session_summary(conversation_history, session_log_path)
            
            # print("\n--- Your Conversation Summary ---")
            # print(summary)
            # print("---------------------------------")
        
        print("🤖 Elara says: Goodbye! Take care. Feel free to reach out again!")
        break 