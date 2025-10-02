from constants import EMBEDDING_MODEL, DB_COLLECTION, genai

def get_relevant_context(user_query):
    """
    Retrieves the most relevant context text from the knowledge base.

    Returns:
        The retrieved text (str) or None if no relevant context is found.
    """
    if DB_COLLECTION is None:
        return "No knowledge base available. Please inform the user that you cannot answer specific resource questions."
    
    try:
        # ONE API Call: Embedding
        query_embedding = genai.embed_content(
            model=EMBEDDING_MODEL, 
            content=user_query
        )['embedding']

        results = DB_COLLECTION.query(
            query_embeddings=[query_embedding],
            n_results=1,
            include=['documents']
        )

        if results and results['documents'] and results['documents'][0]:
            retrieved_text = results['documents'][0][0]
            return retrieved_text
            
    except Exception as e:
        print(f"An error occurred in get_relevant_context: {e}")

    return "No specific information found in the knowledge base."