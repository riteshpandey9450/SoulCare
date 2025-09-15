# Save this file as main.py
import os
import google.generativeai as genai
import chromadb
import datetime
import json
import re
import time
import json
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
SUMMARY_DIR = "summaries"

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

# def get_helpline_response():
#     return "⚠️ It sounds like you are going through a very difficult time. Please know that help is available. In India, you can contact iCall at +91 9152987821 or AASRA at +91-9820466726."

# def get_counselor_info_text():
#     """Returns the static, pre-written on-campus counselor information."""
#     return """
# Here is the contact information for the on-campus counselors. They are here to help you.
# ▶ Dr. Anjali Sharma (Head Counselor): anjali.sharma@university.edu | Office: Wellness Center, Room 101
# ▶ Mr. Rohan Verma (Counselor): rohan.verma@university.edu | Office: Wellness Center, Room 102
# ▶ Confidential Booking Link: [https://university.edu/counseling-booking]
# """

# --- NEW FUNCTION FOR GENERATING A DYNAMIC CRISIS RESPONSE ---
def generate_crisis_response(user_query):
    """Generates an empathetic response that incorporates helpline info."""
    counselor_info = get_counselor_info_response()
    
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    prompt = f"""
    You are Elara, an AI wellness assistant. Your current and ONLY role is to act as a Crisis First Responder.
    A user has sent a message indicating they are in severe distress or considering self-harm.
    Your goal is to respond with empathy, validate their feelings, and immediately and clearly guide them to professional help.
    
    Follow these steps precisely:
    1. Start by acknowledging their pain based on their message. Use phrases like "It sounds like you're in a tremendous amount of pain," or "Thank you for telling me, that sounds incredibly difficult."
    2. Know your limitations as an AI but don't tell the user about it. Keep the conversation centerd at them. Say something like, "It's really important that you speak with someone who can truly support you right now."
    3. Seamlessly integrate the provided counselor information as the main call to action. Make it clear and direct.
    4. Keep the entire message concise, calm, and supportive. DO NOT ask questions or try to continue the conversation. Your only job is to refer.

    USER'S MESSAGE: "{user_query}"

    COUNSELOR INFORMATION TO INCLUDE:
    {counselor_info}

    Your Empathetic and Supportive Response:
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text+"\n\nAll conversations are confidential. Please don't hesitate to connect with them."
    except Exception as e:
        print(f"CRITICAL: Crisis response generation failed. Falling back to static message. Error: {e}")
        # Failsafe: If the API fails, return the raw, safe information.
        return "It sounds like you are in severe distress. Please reach out now. " + counselor_info


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

def generate_session_summary(conversation_history, session_log_path, session_had_crisis):
    """
    Generates two summaries from the conversation, saves them to respective
    directories, and returns the summary of Elara's advice.
    """
    # --- Setup Directories ---
    elara_summary_dir = os.path.join(SUMMARY_DIR, "Elara_responses")
    student_summary_dir = os.path.join(SUMMARY_DIR, "student_problems")
    os.makedirs(elara_summary_dir, exist_ok=True)
    os.makedirs(student_summary_dir, exist_ok=True)

    # --- Extract Conversation Parts ---
    user_queries = [turn['parts'][0]['text'] for turn in conversation_history if turn['role'] == 'user']
    Elara_responses = [turn['parts'][0]['text'] for turn in conversation_history if turn['role'] == 'model']

    if not conversation_history:
        return "There was no conversation to summarize."

    user_queries_text = "\n".join(user_queries)
    Elara_responses_text = "\n\n---\n\n".join(Elara_responses)

    # print(user_queries_text+"\n")
    # print(bot_responses_text+"\n")
    
    model = genai.GenerativeModel('gemini-1.5-flash')
    base_log_filename = os.path.basename(session_log_path)

    # --- 1. Generate and Save Student Problem Summary ---
    try:
        crisis_note = ""
        if session_had_crisis:
            crisis_note = "\n\nIMPORTANT: A crisis was detected at least once during this conversation."

        student_prompt = f"""
        Analyze the following messages from a student. Identify and summarize the main problem or emotional state the student is describing.
        The summary should be a concise, high-level overview for an admin dashboard.
        Example: "The student is experiencing significant anxiety related to upcoming exams and feels overwhelmed by their workload."
        
        --- STUDENT'S MESSAGES ---
        {user_queries_text}
        --- END MESSAGES ---

        Summary of the student's primary concern:{crisis_note}
        """
        student_response = model.generate_content(student_prompt)
        student_summary_text = student_response.text
        
        student_summary_filename = base_log_filename.replace("log_", "student_problem_", 1)
        student_filepath = os.path.join(student_summary_dir, student_summary_filename)
        with open(student_filepath, "w", encoding="utf-8") as f:
            f.write(student_summary_text)
        print(f"✅ Student problem summary saved to: {student_filepath}")
    except Exception as e:
        print(f"Warning: Could not generate student problem summary. Error: {e}")

    # --- 2. Generate and Save Elara's Advice Summary ---
    try:
        elara_prompt = f"""
        Analyze the following responses from the wellness bot 'Elara'. Extract only the actionable advice and coping strategies suggested.
        Create a concise summary as a bulleted list for the user.
        
        --- ELARA'S RESPONSES ---
        {Elara_responses_text}
        --- END RESPONSES ---
        
        Summary of Elara's Key Suggestions:
        """
        elara_response = model.generate_content(elara_prompt)
        elara_summary_text = elara_response.text
        
        elara_summary_filename = base_log_filename.replace("log_", "elara_advice_", 1)
        elara_filepath = os.path.join(elara_summary_dir, elara_summary_filename)
        with open(elara_filepath, "w", encoding="utf-8") as f:
            f.write(elara_summary_text)
        print(f"✅ Elara advice summary saved to: {elara_filepath}")
        
        return elara_summary_text # Return this summary to the user
    except Exception as e:
        return f"Could not generate or save Elara's advice summary. Error: {e}"

# ==============================================================================
# --- CORE RAG CHATBOT LOGIC ---
# ==============================================================================
def get_relevant_context(user_query, db_collection):
    """
    Retrieves the most relevant context and its topic from the database.
    """
    query_embedding = genai.embed_content(model=EMBEDDING_MODEL, content=user_query)['embedding']
    results = db_collection.query(
        query_embeddings=[query_embedding],
        n_results=2,
        include=['documents', 'metadatas'] # Ensure metadata is included
    )
    if results and results['documents'][0]:
        retrieved_text = results['documents'][0][0]
        retrieved_topic = results['metadatas'][0][0].get('topic', 'a general concern')
        return retrieved_text, retrieved_topic
    return None, None


def generate_response(user_query, db_collection, conversation_history):
    """
    Generates a response, identifies the psychological condition, and returns the combined text along with a crisis flag.
    """
    is_current_prompt_crisis = False
    print(f"\n🔍 User Query: '{user_query}'")
    
    if check_keywords(user_query) or check_with_llm_classifier(user_query):
        is_current_prompt_crisis = True
        print("🚨 Crisis detected. Generating a supportive referral response...")
        response_text = generate_crisis_response(user_query)
        return response_text, is_current_prompt_crisis
    
    print("✅ Safety checks passed. Retrieving context...")
    retrieved_context, context_topic = get_relevant_context(user_query, db_collection)
    
    history_text = "\n".join([f"{turn['role']}: {turn['parts'][0]['text']}" for turn in conversation_history])

    prompt_template = """
    You are 'Elara', a supportive AI wellness assistant for college students.
    Your goal is to have a natural, safe and caring conversation. You are not a doctor and must not give medical advice.

    *** TONE AND STYLE GUIDELINES ***
    - Maintain a supportive, empathetic, and respectful tone.
    - AVOID overly familiar or patronizing language like "honey", "sweetheart", or "dear".
    - Address the user as a peer. Be encouraging but not condescending.
    *** END GUIDELINES ***

    *** IMPORTANT RULE ***
    If the user asks how to contact a counselor, book an appointment, or talk to someone professional in a NON-CRISIS context, DO NOT provide direct contact details like names or emails. Instead, you MUST guide them to the confidential booking page with a message like: "That's a great step to take. You can book a confidential session with one of our on-campus counselors through the booking page: [https://university.edu/counseling-booking]".
    *** END IMPORTANT RULE ***

    Review the 'CONVERSATION HISTORY' to understand what has already been discussed.
    Use the 'CONTEXT FROM KNOWLEDGE BASE' only if the user asks a new question or needs specific information.
    If the user is simply replying to you, prioritize continuing the conversation naturally. Avoid repeating advice.

    --- CONVERSATION HISTORY ---
    {history}
    --- END HISTORY ---

    --- CONTEXT FROM KNOWLEDGE BASE ---
    {context}
    --- END CONTEXT ---

    User's New Message: {query}
    
    Your Helpful Response:
    """
    prompt = prompt_template.format(history=history_text, context=retrieved_context, query=user_query)
    
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content(prompt)
    main_response_text = response.text

    # --- Meta-analysis to identify the condition ---
    if conversation_history and context_topic: # Only add this if there's context
        meta_prompt = f"""
        Based on the conversation history and the primary topic identified from the knowledge base, formulate a single, gentle, non-diagnostic sentence that helps the user label their feelings.
        The sentence should start with "It sounds like you might be dealing with...". Do not use medical jargon. Keep it simple and empathetic.
        
        CONVERSATION HISTORY:
        {history_text}
        
        USER'S LATEST MESSAGE:
        {user_query}
        
        IDENTIFIED TOPIC: {context_topic}
        
        Formulate the single sentence:
        """
        meta_response = model.generate_content(meta_prompt)
        condition_identification = meta_response.text.strip()
        final_response = f"{main_response_text}\n\n_{condition_identification}_"
    else:
        final_response = main_response_text

    return final_response, is_current_prompt_crisis


# 

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
        session_had_crisis = False
        
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

            ai_response, is_crisis_now = generate_response(user_input, db, conversation_history)
            if is_crisis_now:
                session_had_crisis = True
            
            conversation_history.append({"role": "user", "parts": [{"text": user_input}]})
            conversation_history.append({"role": "model", "parts": [{"text": ai_response}]})

            print("\n🤖 Elara says:")
            print(ai_response)
            
            log_conversation(user_input, ai_response, session_log_path)
            
            print("\n" + "-"*50)

        if conversation_history:
            print("\n🤖 Elara is generating a summary of your conversation...")
            
            summary = generate_session_summary(conversation_history, session_log_path, session_had_crisis)
        
        print("🤖 Elara says: Goodbye! Take care. Feel free to reach out again!")
        break 