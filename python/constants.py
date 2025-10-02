import os
import google.generativeai as genai
from dotenv import load_dotenv
import chromadb

load_dotenv()

# --- GEMINI SETUP ---
try:
    GEMINI_API_KEY = os.environ["GEMINI_API_KEY"]
    genai.configure(api_key=GEMINI_API_KEY)
except KeyError:
    print("CRITICAL ERROR: GEMINI_API_KEY environment variable not set.")
    exit()

# Initializing the model globally
MODEL_NAME = 'gemini-2.5-flash'
MODEL = genai.GenerativeModel(MODEL_NAME)

# --- RAG/DB CONSTANTS ---
EMBEDDING_MODEL = "models/text-embedding-004"
DB_PATH = "./chroma_db"
COLLECTION_NAME = "mental_health_support"

# Initialize DB client globally
try:
    CLIENT = chromadb.PersistentClient(path=DB_PATH)
    DB_COLLECTION = CLIENT.get_collection(name=COLLECTION_NAME)
except Exception:
    DB_COLLECTION = None
    print("DATABASE NOT FOUND. Please run 'python build_database.py' first.")

# --- LOGGING CONSTANTS ---
LOG_DIR = "conversation_logs"
SUMMARY_DIR = "summaries"

# --- SAFETY CONSTANTS ---
CRISIS_KEYWORDS = [
    "kill myself", 
    "suicide",
    "end my life",
    "wanna die", 
    "want to die", 
    "all lonely",   
    "i don't want to continue this life", 
    "don't want to be here anymore",
    "can't live like this",
    "i give up on everything",
    "gonna hurt myself", 
    "i'm done with life", 
    "disappear forever", 
    "not worth living", 
    "can't go on", 
    "want it to be over", 
    "no one gets me"
]

MODERATE_KEYWORDS = [
    "depressed", "depression", "clinically ill", "disorder", "severe anxiety", "hopeless", "worthless", "i feel so lonely and empty"
]

BOOKING_LINK = "[http://localhost:5173/booking]"

# --- SYSTEM PROMPT TEMPLATE (FOR UNIFIED CALL) ---
UNIFIED_PROMPT_TEMPLATE = """
You are 'Elara', a supportive AI wellness assistant for college students. Your goal is to have a natural, safe, and caring conversation. You are NOT a doctor and must not give medical advice.

*** DUAL TASK INSTRUCTION ***
1.  **CLASSIFY:** Analyze the user's message and classify its severity into one of three categories: CRISIS, MODERATE, or SAFE.
    - CRISIS: The user is expressing **any form** of desire to end their life, is considering immediate self-harm, or explicitly states they **do not want to continue this life**. Examples: "I want to end my life," "I'm going to kill myself," **"i don't want to continue this life."** This is the highest priority.
    - MODERATE: The user is expressing significant, chronic distress, depression, severe anxiety, or hopelessness, but NOT a direct or immediate intent to end life. Examples: "I feel so depressed," "i am feeling lonely," "My anxiety is overwhelming," "I feel worthless."
    - SAFE: The user is expressing general academic sadness, stress, or other non-critical issues, or is simply continuing the conversation.
2.  **RESPOND:** Generate your supportive, short, and empathetic response.

*** TONE AND STYLE GUIDELINES ***
- Maintain a supportive, empathetic, and respectful tone.
- AVOID overly familiar or patronizing language.
- Address the user as a peer. Be encouraging but not condescending.

*** IMPORTANT RULE ***
If the user asks how to contact a counselor in a NON-CRISIS context, you MUST guide them to the confidential booking page: {booking_link}.

Review the 'CONVERSATION HISTORY' to continue the flow.
Use the 'CONTEXT FROM KNOWLEDGE BASE' only if the user asks a new question or needs specific information.

--- CONVERSATION HISTORY ---
{history}
--- END HISTORY ---

--- CONTEXT FROM KNOWLEDGE BASE ---
{context}
--- END CONTEXT ---

User's New Message: {query}

Return your output in the following strict JSON format ONLY. Do not include any other text outside the JSON block.
{{
    "intent": "CRISIS|MODERATE|SAFE", 
    "response": "Your helpful and supportive response text."
}}
"""