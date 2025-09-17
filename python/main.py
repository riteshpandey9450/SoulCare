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

model = genai.GenerativeModel('gemini-1.5-flash')

EMBEDDING_MODEL = "models/text-embedding-004"
DB_PATH = "./chroma_db"
COLLECTION_NAME = "mental_health_support"
LOG_DIR = "conversation_logs"
SUMMARY_DIR = "summaries"

# ==============================================================================
# --- SAFETY SYSTEM ---
# ==============================================================================
CRISIS_KEYWORDS = [
    "kill myself", "suicide", "end my life", "wanna die", "want to die", "all lonely",
    "disappear forever", "not worth living", "can't go on", "want it to be over", "no one gets me"
]

MODERATE_KEYWORDS = [
    "depressed", "depression", "clinically ill", "disorder", "severe anxiety", "hopeless", "worthless"
]

def check_keywords(user_input, keyword_bag):
    return any(keyword in user_input.lower() for keyword in keyword_bag)

def classify_intent_with_llm(user_input):
    """
    Uses an LLM to classify the user's intent into one of three categories:
    CRISIS, MODERATE, or SAFE.
    """

    prompt = f"""
    You are a safety classification system. Analyze the user's message and classify its severity into one of three categories: CRISIS, MODERATE, or SAFE.
    
    - CRISIS: The user is expressing immediate suicidal thoughts or intent to self-harm. (e.g., "I want to end my life", "I'm going to kill myself").
    - MODERATE: The user is expressing significant distress, feelings of depression, severe anxiety, or hopelessness, but NOT immediate suicidal intent. (e.g., "I feel so depressed", "My anxiety is overwhelming", "I feel worthless", "I feel so lonely and empty").
    - SAFE: The user is expressing general sadness, stress, or other non-critical issues. (e.g., "I'm stressed about exams", "I feel lonely").

    Return only the single word: CRISIS, MODERATE, or SAFE.

    User Message: "{user_input}"
    Classification:
    """
    try:
        response = model.generate_content(prompt)
        result = response.text.strip().upper()
        if result in ["CRISIS", "MODERATE", "SAFE"]:
            return result
        if "CRISIS" in result: return "CRISIS"
        if "MODERATE" in result: return "MODERATE"
        return "SAFE"
    except Exception:
        return "CRISIS" # Default to crisis for safety if the API fails

# ==============================================================================
# --- FUNCTION FOR CRISIS RESPONSE ---
# ==============================================================================
def generate_crisis_response(user_query):
    """Generates an empathetic response for immediate, life-threatening crises."""
    counselor_info = get_counselor_info_response()
    
    prompt = f"""
    You are Elara, an AI wellness assistant. Your current and ONLY role is to act as a Crisis First Responder.
    A user has sent a message indicating they are in severe distress, considering immediate self-harm.
    Your goal is to respond with empathy, validate their feelings, and immediately and clearly guide them to professional help.
    Keep your response short and to the point.
    
    Follow these steps precisely:
    1. Acknowledge their pain.  Use phrases like "Thank you for telling me, that sounds incredibly difficult."
    2. Emphasize the importance of speaking to a person who can support them right now.Know your limitations as an AI but don't tell the user about it. Keep the conversation centerd at them. Say something like, "It's really important that you speak with someone who can truly support you right now."
    3. Seamlessly integrate the provided counselor information as the main call to action. Make it clear and direct.
    4. Keep the entire message concise, calm, and supportive. DO NOT ask questions or try to continue the conversation. Your only job is to refer.

    USER'S MESSAGE: "{user_query}"

    COUNSELOR INFORMATION TO INCLUDE:
    {counselor_info}

    Your Empathetic and Supportive Response:
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text+"\nAll conversations are confidential. Please don't hesitate to connect with them."
    except Exception as e:
        print(f"CRITICAL: Crisis response generation failed. Falling back to static message. Error: {e}")
        # Failsafe: If the API fails, return the raw, safe information.
        return "It sounds like you are in severe distress. Please reach out now. " + counselor_info
    
# ==============================================================================
# --- FUNCTION FOR MODERATE RESPONSE ---
# ==============================================================================
def generate_moderate_response(user_query, booking_already_offered):
    """
    Generates a supportive response for users with significant, but not immediately critical, distress and guides them to book a session.
    """
     
    if booking_already_offered:
        # If we already offered, provide a conversational follow-up instead.
        follow_up_prompt = f"""
        You are Elara, an AI wellness assistant. A user you previously encouraged to book a counseling session is continuing to express feelings of distress (like depression or severe anxiety).
        Your goal is to continue the conversation supportively WITHOUT offering the booking link again. Listen, validate their feelings, and maybe ask a gentle open-ended question.
        
        USER'S MESSAGE: "{user_query}"
        Your Gentle Follow-up Response:
        """
        try:
            response = model.generate_content(follow_up_prompt)
            return response.text
        except Exception as e:
            print(f"MODERATE follow-up generation failed. Error: {e}")
            return "I'm still here to listen. Thank you for continuing to share with me."
    else:
        # first time, offer the booking link.
        initial_prompt = f"""
        You are Elara, an AI wellness assistant. A user has expressed significant distress, like feelings of depression or severe anxiety, but is not in immediate crisis.
        Your goal is to validate their feelings, show support, and strongly but gently encourage them to seek professional help in the near future.
        Keep your response short and to the point.
        
        1. Acknowledge and validate their feelings (e.g., "It sounds incredibly tough to be feeling this way," "Thank you for sharing that, feeling depressed can be isolating.").
        2. Express that talking to a professional can be a very helpful next step for these kinds of feelings.
        
        USER'S MESSAGE: "{user_query}"
        Your Empathetic Response (guiding them to book a session without provding any links):
        """
        try:
            response = model.generate_content(initial_prompt)
            booking_info = "\nTaking the step to talk to someone is really brave. You can book a confidential session with an on-campus counselor through the university's booking page: [https://university.edu/counseling-booking]"
            return response.text + booking_info
        except Exception as e:
            print(f"MODERATE response generation failed. Error: {e}")
            return "It sounds like you're going through a lot. Talking to a professional can be a really positive step. You can book a confidential session with a counselor here: [https://university.edu/counseling-booking]"

# ==============================================================================
# --- CORE RAG CHATBOT LOGIC ---
# ==============================================================================
def get_relevant_context(user_query, db_collection, model):
    """
    Retrieves the most relevant context and its associated medical terms.

    It first tries to get medical terms from the database metadata. 
    If not found, it uses a generative model to extract them from the text.

    Returns:
        A tuple containing (retrieved_text, retrieved_medical_terms) 
        or (None, None) if no relevant context is found.
    """
    try:
        query_embedding = genai.embed_content(
            model=EMBEDDING_MODEL, 
            content=user_query
        )['embedding']

        results = db_collection.query(
            query_embeddings=[query_embedding],
            n_results=1,
            include=['documents', 'metadatas'] # Ensure metadatas are included
        )

        if results and results['documents'] and results['documents'][0]:
            retrieved_text = results['documents'][0][0]
            metadata = results['metadatas'][0][0]
            
            # 1. First, attempt to get medical terms from the database metadata.
            #    This assumes your metadata contains a key like 'medical_terms'.
            retrieved_medical_terms = metadata.get('medical_terms')

            # 2. If no terms were found in the metadata, use the Gemini model as a fallback.
            if not retrieved_medical_terms:
                # print("DEBUG: Medical terms not found in metadata. Using Gemini for extraction.") # Optional: for debugging
                extraction_prompt = f"""
                From the following text, please extract all medical terms. 
                List them as a comma-separated string. If no medical terms are found, return an empty string.

                Text: "{retrieved_text}"
                
                Medical Terms:
                """
                response = model.generate_content(extraction_prompt)
                retrieved_medical_terms = response.text.strip()
            
            return retrieved_text, retrieved_medical_terms
            
    except Exception as e:
        print(f"An error occurred in get_relevant_context: {e}")

    # Return None for both values if any part of the process fails
    return None, None


def generate_response(user_query, db_collection, model, conversation_history, booking_already_offered):
    """
    Generates a response based on the 3-tier classification and returns the text and a boolean indicating if the current query was a crisis.
    """

    is_current_prompt_crisis = False
    booking_offered_this_turn = booking_already_offered
    # print(f"\n🔍 User Query: '{user_query}'")
    
    if check_keywords(user_query, CRISIS_KEYWORDS) :
        is_current_prompt_crisis = True
        print("🚨 Crisis detected. Generating a supportive referral response...")
        response_text = generate_crisis_response(user_query)
        return response_text, is_current_prompt_crisis,booking_offered_this_turn
    
    if check_keywords(user_query, MODERATE_KEYWORDS) :
        # is_current_prompt_moderate = True         #if needed in future
        print("🔶 Moderate concern detected. Generating a supportive counselling response...")
        response_text = generate_moderate_response(user_query, booking_already_offered)
        booking_offered_this_turn = True
        return response_text,is_current_prompt_crisis,booking_offered_this_turn
    
    # If no keywords, use the LLM for nuanced classification
    intent = classify_intent_with_llm(user_query)
    # print("intent: ", intent)         #debugging la la la
    main_response_text = ""
    history_text = "\n".join([f"{turn['role']}: {turn['parts'][0]['text']}" for turn in conversation_history])

    if intent == "CRISIS":
        print("🚨 Crisis detected. Generating a supportive referral response.")
        is_current_prompt_crisis = True
        main_response_text = generate_crisis_response(user_query)
    elif intent == "MODERATE":
        # Now we can use the context we retrieved earlier
        print("🔶 Moderate concern detected. Generating a supportive counselling response.")
        response = generate_moderate_response(user_query, booking_already_offered)
        booking_offered_this_turn = True
        main_response_text = response   
    else: # SAFE
        print("✅ Safety checks passed. Retrieving context for normal response...")
        retrieved_context, context_topic = get_relevant_context(user_query, db_collection, model)
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
        If the user is simply replying to you, prioritize continuing the conversation naturally. Avoid repeating advice. Keep your response short and to the point.

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
        
        response = model.generate_content(prompt)
        main_response_text = response.text

    # --- Meta-analysis to identify the condition ---
    if intent in ["SAFE", "MODERATE"] and conversation_history and context_topic: # Only add this if there's context
        meta_prompt = f"""
        Based on the conversation history and the primary topic identified from the knowledge base, formulate a single, gentle, non-diagnostic sentence that helps the user label their feelings.
        The sentence should start with "It sounds like you might be dealing with...". Keep it simple and empathetic. Keep your response short and to the point.
        
        CONVERSATION HISTORY:
        {history_text}
        
        USER'S LATEST MESSAGE:
        {user_query}
        
        IDENTIFIED TOPIC: {context_topic}
        
        Formulate the single sentence:
        """
        meta_response = model.generate_content(meta_prompt)
        condition_identification = meta_response.text.strip()
        final_response = f"{main_response_text}\n_{condition_identification}_"
    else:
        final_response = main_response_text

    return final_response, is_current_prompt_crisis, booking_offered_this_turn

# ==============================================================================
# --- Counsellor Information ---
# ==============================================================================
def get_counselor_info_response():
    """
    Loads counselor information for a single university from a JSON file and returns a formatted, detailed response.
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

# ==============================================================================
# --- Session Summary for Dashboard and Future Reference---
# ==============================================================================
def generate_session_summary(conversation_history, session_log_path, session_had_crisis):
    """
    Generates two summaries from the conversation, saves them to respective directories, and returns the summary of Elara's advice.
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

    # print(user_queries_text+"\n")         #debugging
    # print(bot_responses_text+"\n")        #debugging
    
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
        # print(f"✅ Student problem summary saved to: {student_filepath}")
    except Exception as e:
        # print(f"Warning: Could not generate student problem summary. Error: {e}")
        with open(student_filepath, "w", encoding="utf-8") as f:
            f.write(e)

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
        # print(f"✅ Elara advice summary saved to: {elara_filepath}")
        
        # return elara_summary_text # Return this summary to the user
    except Exception as e:
        # return f"Could not generate or save Elara's advice summary. Error: {e}"
        with open(elara_filepath, "w", encoding="utf-8") as f:
            f.write(elara_summary_text)

# ==============================================================================
# --- Logging ---
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

# ==============================================================================
# --- Main Execution 
# ==============================================================================
   
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
        session_offered_booking = False
        
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

            ai_response, is_crisis_now, session_offered_booking = generate_response(
                user_input, db, model, conversation_history, session_offered_booking
            )
            if is_crisis_now:
                session_had_crisis = True
            
            conversation_history.append({"role": "user", "parts": [{"text": user_input}]})
            conversation_history.append({"role": "model", "parts": [{"text": ai_response}]})

            print("\n🤖 Elara says:")
            print(ai_response)
            
            log_conversation(user_input, ai_response, session_log_path)
            
            print("\n" + "-"*50)

        if conversation_history:
            # print("\n🤖 Elara is generating a summary of your conversation...")
            
            summary = generate_session_summary(conversation_history, session_log_path, session_had_crisis)
        
        print("🤖 Elara says: Goodbye! Take care. Feel free to reach out again!")
        break 