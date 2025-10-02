import json
from constants import MODEL, UNIFIED_PROMPT_TEMPLATE, BOOKING_LINK
import google.generativeai.types as genai_types 
from rag_pipeline import get_relevant_context
from safety_handler import check_keywords, CRISIS_KEYWORDS, MODERATE_KEYWORDS, generate_crisis_response, generate_moderate_response

def classify_intent_with_llm_fast(user_input):
    """
    Uses an LLM to classify the user's intent into one of three categories:
    CRISIS, MODERATE, or SAFE. This is a dedicated, fast LLM call.
    """
    prompt = f"""
    You are a safety classification system for an Indian university wellness bot. 
    Analyze the user's message and classify its severity into one of three categories: CRISIS, MODERATE, or SAFE.
    
    - CRISIS: The user is expressing any form of desire to end their life, is considering immediate self-harm, or explicitly states they do not want to continue this life. This is the highest priority.
    - MODERATE: The user is expressing significant, chronic distress, depression, severe anxiety, or hopelessness, but NOT a direct or immediate intent to end life.
    - SAFE: The user is expressing general sadness, stress, non-critical issues, or is simply continuing a conversation.

    Return only the single word: CRISIS, MODERATE, or SAFE. Do not include any other text.

    User Message: "{user_input}"
    Classification:
    """
    try:
        response = MODEL.generate_content(prompt)
        result = response.text.strip().upper()
        if result in ["CRISIS", "MODERATE", "SAFE"]:
            return result
        # Fallback if LLM response is garbled
        if "CRISIS" in result: return "CRISIS"
        if "MODERATE" in result: return "MODERATE"
        return "SAFE"
    except Exception as e:
        print(f"Warning: Fast intent classification failed. Defaulting to CRISIS. Error: {e}")
        return "CRISIS"

def should_use_rag(user_query):
    """Simple heuristic to check if the user input is a question or query."""
    lower_query = user_query.lower().strip()
    if lower_query.endswith('?') or lower_query.startswith(('what', 'how', 'where', 'why', 'can you', 'tell me about', 'give me')):
        return True
    return False

def generate_response(user_query, conversation_history):
    # --- Step 1: Keyword Classification (NO API Call) ---
    intent = None
    
    if check_keywords(user_query, CRISIS_KEYWORDS):
        intent = 'CRISIS'
    elif check_keywords(user_query, MODERATE_KEYWORDS):
        intent = 'MODERATE'
    
    # --- Step 2: LLM Classification if Keyword Check Fails (1 LLM Call) ---
    if intent is None:
        # 1 LLM Call: Fast classification
        intent = classify_intent_with_llm_fast(user_query)
        print("LLM Classified Intent:", intent)

    # --- Step 3: Handle Final CRISIS/MODERATE Intent ---
    if intent == "CRISIS":
        print("🚨 Crisis detected. Generating a supportive referral response...")
        response_text = generate_crisis_response(user_query) # Uses hardcoded text (fast)
        conversation_history.append({"role": "user", "parts": [{"text": user_query}]})
        conversation_history.append({"role": "model", "parts": [{"text": response_text}]})
        return response_text, intent

    if intent == "MODERATE":
        print("🔶 Moderate concern detected. Generating a supportive counselling response...")
        response_text = generate_moderate_response(user_query) # Uses 1 LLM generate + hardcoded link
        conversation_history.append({"role": "user", "parts": [{"text": user_query}]})
        conversation_history.append({"role": "model", "parts": [{"text": response_text}]})
        return response_text, intent

    
    # --- Step 4: SAFE Intent - RAG or Pure Chat ---
    print("✅ Safety checks passed. Intent is SAFE.")
    
    retrieved_context = "No specific information found in the knowledge base." # Default context
    
    # Conditional RAG (Saves Embedding Call for non-questions)
    if should_use_rag(user_query):
        # 1 Embedding Call: Only runs if RAG is necessary
        retrieved_context = get_relevant_context(user_query)

    history_text = "\n".join([f"{turn['role']}: {turn['parts'][0]['text']}" for turn in conversation_history])

    # Sub-step 4b: Unified LLM Response Generation (ONE LLM Call)
    prompt = UNIFIED_PROMPT_TEMPLATE.format(
        booking_link=BOOKING_LINK, 
        history=history_text, 
        context=retrieved_context,
        query=user_query
    )
    
    json_config = genai_types.GenerationConfig(
        response_mime_type="application/json"
    )

    try:
        # 1 LLM Call: Generates the final SAFE response
        response = MODEL.generate_content(prompt, generation_config=json_config)
        
        llm_output = json.loads(response.text)
        main_response_text = llm_output["response"]
        
        final_llm_intent = llm_output["intent"].upper()
        
        # override and re-run the safe referral response for safety
        if final_llm_intent == "CRISIS":
             main_response_text = generate_crisis_response(user_query)
             intent = "CRISIS_FALLBACK"
        elif final_llm_intent == "MODERATE":
             main_response_text = generate_moderate_response(user_query)
             intent = "MODERATE_FALLBACK"

        return main_response_text, intent

    except Exception as e:
        print(f"CRITICAL: Final response generation failed. Error: {e}")
        return "I'm sorry, I'm experiencing a technical issue right now. Please try again in a moment.", "SAFE"