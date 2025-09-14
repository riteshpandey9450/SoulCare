# Save this file as build_database.py
import os
import json
import time
import google.generativeai as genai
import chromadb
from openai import OpenAI 
from dotenv import load_dotenv
load_dotenv()

# --- UNIFIED SETUP ---
EMBEDDING_PROVIDER = os.environ.get("EMBEDDING_PROVIDER", "GEMINI").upper()

if EMBEDDING_PROVIDER == "GEMINI":
    print("🚀 Using GEMINI for embeddings.")
    try:
        genai.configure(api_key=os.environ["GEMINI_API_KEY"])
        EMBEDDING_MODEL = "models/text-embedding-004"
    except KeyError:
        print("CRITICAL ERROR: EMBEDDING_PROVIDER is 'GEMINI' but GEMINI_API_KEY is not set.")
        exit()
elif EMBEDDING_PROVIDER == "OPENAI":
    print("🚀 Using OPENAI for embeddings.")
    try:
        openai_client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
        EMBEDDING_MODEL = "text-embedding-3-small"
    except KeyError:
        print("CRITICAL ERROR: EMBEDDING_PROVIDER is 'OPENAI' but OPENAI_API_KEY is not set.")
        exit()
else:
    print(f"CRITICAL ERROR: Unknown EMBEDDING_PROVIDER '{EMBEDDING_PROVIDER}'. Must be 'GEMINI' or 'OPENAI'.")
    exit()

KNOWLEDGE_BASE_DIR = "knowledge_base"
DB_PATH = "./chroma_db"
COLLECTION_NAME = "mental_health_support"
PROCESSED_FILES_MARKER = os.path.join(DB_PATH, 'processed_files.json')


def create_chunks(text_input, source_file, max_chunk_size=2000):
    """
    Splits a large text into smaller chunks, respecting paragraph boundaries.
    
    1. Splits text by paragraphs.
    2. If a paragraph is larger than max_chunk_size, it's split further
       into smaller pieces.
    """
    topic = text_input.split('\n', 1)[0].replace("Topic:", "").strip()
    paragraphs = text_input.split('\n\n')
    
    chunks = []
    for para in paragraphs:
        para = para.strip()
        if len(para) > 50: # Ignore very short paragraphs
            if len(para) <= max_chunk_size:
                chunks.append({
                    "source": source_file,
                    "topic": topic,
                    "content": para
                })
            else:
                # The paragraph is too long, split it further
                for i in range(0, len(para), max_chunk_size):
                    sub_chunk = para[i:i + max_chunk_size]
                    chunks.append({
                        "source": source_file,
                        "topic": topic,
                        "content": sub_chunk.strip()
                    })
    return chunks

def build_database():
    """
    Builds the database by processing and embedding one file at a time.
    """
    chroma_client = chromadb.PersistentClient(path=DB_PATH)
    collection = chroma_client.get_or_create_collection(name=COLLECTION_NAME)

    processed_files = set()
    if os.path.exists(PROCESSED_FILES_MARKER):
        with open(PROCESSED_FILES_MARKER, 'r') as f:
            processed_files = set(json.load(f))

    files_to_process = [f for f in os.listdir(KNOWLEDGE_BASE_DIR) if f.endswith('.txt') and f not in processed_files]

    if not files_to_process:
        print("✅ Knowledge base is already up to date.")
        return

    print(f"📚 Found {len(files_to_process)} new file(s) to process.")

    for filename in files_to_process:
        print(f"\n--- Processing file: {filename} ---")
        filepath = os.path.join(KNOWLEDGE_BASE_DIR, filename)
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                text = f.read()
            
            chunks = create_chunks(text, filename)

            if not chunks:
                print("⚠️ No valid chunks found. Marking as processed and skipping.")
                processed_files.add(filename)
                with open(PROCESSED_FILES_MARKER, 'w') as f:
                    json.dump(list(processed_files), f)
                continue

            print(f"🧠 Generating embeddings for {len(chunks)} chunks...")
            embeddings = []
            for i, chunk in enumerate(chunks):
                
                # --- CONDITIONAL API CALL ---
                if EMBEDDING_PROVIDER == "GEMINI":
                    response = genai.embed_content(model=EMBEDDING_MODEL, content=chunk['content'])
                    embedding = response['embedding']
                else: # Assumes OPENAI
                    response = openai_client.embeddings.create(model=EMBEDDING_MODEL, input=chunk['content'])
                    embedding = response.data[0].embedding
                
                embeddings.append(embedding)
                print(f"  - Embedded chunk {i+1}/{len(chunks)}")
                time.sleep(1)

            start_index = collection.count()
            collection.add(
                embeddings=embeddings,
                documents=[item['content'] for item in chunks],
                metadatas=[{"source": item["source"], "topic": item["topic"]} for item in chunks],
                ids=[f"{item['source']}_{i}" for i, item in enumerate(chunks, start=start_index)]
            )
            print(f"✅ Successfully added {len(chunks)} chunks from {filename}.")

            processed_files.add(filename)
            with open(PROCESSED_FILES_MARKER, 'w') as f:
                json.dump(list(processed_files), f)

        except Exception as e:
            print(f"❌ An error occurred while processing {filename}: {e}")
            print("Skipping to the next file.")
            continue

    print("\n🎉 All new files have been successfully processed.")

if __name__ == "__main__":
    if not os.path.exists(KNOWLEDGE_BASE_DIR):
        os.makedirs(KNOWLEDGE_BASE_DIR)
        print(f"Created '{KNOWLEDGE_BASE_DIR}' directory. Please add your .txt files there.")
    else:
        build_database()