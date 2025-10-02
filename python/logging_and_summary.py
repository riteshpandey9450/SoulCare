import os
import datetime
from constants import LOG_DIR, SUMMARY_DIR, MODEL

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

def generate_session_summary(conversation_history, session_log_path, intent):
    """
    Generates two summaries from the conversation and saves them.
    (This uses two LLM calls, but only once at the end of the session.)
    """
    # ... (Summary setup and directory creation as in the original code) ...
    elara_summary_dir = os.path.join(SUMMARY_DIR, "Elara_responses")
    student_summary_dir = os.path.join(SUMMARY_DIR, "student_problems")
    os.makedirs(elara_summary_dir, exist_ok=True)
    os.makedirs(student_summary_dir, exist_ok=True)

    user_queries = [turn['parts'][0]['text'] for turn in conversation_history if turn['role'] == 'user']
    Elara_responses = [turn['parts'][0]['text'] for turn in conversation_history if turn['role'] == 'model']

    if not conversation_history:
        return "There was no conversation to summarize."

    user_queries_text = "\n".join(user_queries)
    Elara_responses_text = "\n\n---\n\n".join(Elara_responses)
    base_log_filename = os.path.basename(session_log_path)

    # --- 1. Generate and Save Student Problem Summary (1 LLM Call) ---
    try:
        # ... (student_prompt definition using user_queries_text) ...
        crisis_note = ""
        if intent == "CRISIS":
            crisis_note = "\n\nIMPORTANT: A crisis was detected at least once during this conversation. PRIORITIZE this review."

        student_prompt = f"""
        Analyze the following messages from a student. Identify and summarize the main problem or emotional state the student is describing.
        The summary should be a concise, high-level overview for an admin dashboard.
        
        --- STUDENT'S MESSAGES ---
        {user_queries_text}
        --- END MESSAGES ---

        Summary of the student's primary concern:{crisis_note}
        """
        student_response = MODEL.generate_content(student_prompt)
        student_summary_text = student_response.text
        
        student_summary_filename = base_log_filename.replace("log_", "student_problem_", 1)
        student_filepath = os.path.join(student_summary_dir, student_summary_filename)
        with open(student_filepath, "w", encoding="utf-8") as f:
            f.write(student_summary_text)
    except Exception as e:
        print(f"Warning: Could not generate student problem summary. Error: {e}")

    # --- 2. Generate and Save Elara's Advice Summary (1 LLM Call) ---
    try:
        # ... (elara_prompt definition using Elara_responses_text) ...
        elara_prompt = f"""
        Analyze the following responses from the wellness bot 'Elara'. Extract only the actionable advice and coping strategies suggested.
        Create a concise summary as a bulleted list for the user.
        
        --- ELARA'S RESPONSES ---
        {Elara_responses_text}
        --- END RESPONSES ---
        
        Summary of Elara's Key Suggestions:
        """
        elara_response = MODEL.generate_content(elara_prompt)
        elara_summary_text = elara_response.text
        
        elara_summary_filename = base_log_filename.replace("log_", "elara_advice_", 1)
        elara_filepath = os.path.join(elara_summary_dir, elara_summary_filename)
        with open(elara_filepath, "w", encoding="utf-8") as f:
            f.write(elara_summary_text)
            
        return elara_summary_text # Return the summary for the user
    except Exception as e:
        print(f"Warning: Could not generate Elara advice summary. Error: {e}")
        return "The summary service is temporarily unavailable."