import datetime
import time
import os
from core_logic import generate_response
from logging_and_summary import log_conversation, generate_session_summary
from constants import DB_COLLECTION # Import to ensure it initializes, even if not used directly

if DB_COLLECTION is None:
    print("Exiting due to critical database error.")
    exit()

def main():    
    # --- Session Initialization ---
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    session_log_filename = f"log_{timestamp}.txt"
    session_log_path = os.path.join("conversation_logs", session_log_filename)
    conversation_history = []
    
    print("\n" + "="*50)
    print("🤖 Meet Elara — your Shining support for every student moment")
    print("Type 'quit' to exit.")
    print("="*50)

    while True:
        try:
            user_input = input("You: ")
        except EOFError:
            user_input = 'quit'
            
        if user_input.lower() == 'quit':
            break
        
        start_time = time.time()
        
        # --- Core Logic Call (Optimized: Max 1 LLM + 1 Embedding per turn) ---
        ai_response, intent = generate_response(user_input, conversation_history)
        
        end_time = time.time()
            
        # Update history
        conversation_history.append({"role": "user", "parts": [{"text": user_input}]})
        conversation_history.append({"role": "model", "parts": [{"text": ai_response}]})

        print("Time taken : ", round(end_time-start_time, 2), "seconds")
        print("\n🤖 Elara says:")
        print(ai_response)
        
        log_conversation(user_input, ai_response, session_log_path)
        
        print("\n" + "-"*50)

    if conversation_history:
        print("\n🤖 Elara is generating a summary of your conversation...")
        summary_text = generate_session_summary(conversation_history, session_log_path, intent)
        print("\n--- Summary of Advice ---")
        print(summary_text)
        print("-------------------------\n")
    
    print("🤖 Elara says: Goodbye! Take care. Feel free to reach out again!")


if __name__ == "__main__":
    main()