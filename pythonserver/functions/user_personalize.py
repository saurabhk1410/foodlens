from sentence_transformers import SentenceTransformer
import numpy as np
import faiss
import os
import pickle

# ------------------------------
# Load the model
# ------------------------------
model = SentenceTransformer('all-MiniLM-L6-v2')

# ------------------------------
# Directories
# ------------------------------
BASE_DIR = os.path.dirname(__file__)  # directory of function_search.py
EMBED_DIR = os.path.join(BASE_DIR, "embeddings")  # embeddings folder path

# ------------------------------
# Load FAISS indices
# ------------------------------
restaurant_index = faiss.read_index(os.path.join(EMBED_DIR, "restaurant_index.faiss"))
dish_index = faiss.read_index(os.path.join(EMBED_DIR, "dish_index.faiss"))

# ------------------------------
# Load dish metadata (dish_id -> restaurant_id mapping)
# ------------------------------
with open(os.path.join(EMBED_DIR, "dish_meta.pkl"), "rb") as f:
    dish_meta = pickle.load(f)  # list of dicts: [{'dish_id':1, 'restaurant_id':10}, ...]

# ------------------------------
# Function to create user embedding
# ------------------------------
def create_user_embedding(prefered_cuisines: str, favourite_dishes: str) -> np.ndarray:
    """
    Create a user embedding from their preferences.
    """
    user_text = f"I like these cuisines: {prefered_cuisines}. My favorite dishes are: {favourite_dishes}."
    embedding = model.encode(user_text)
    return embedding

# ------------------------------
# Function to recommend restaurants for homepage
# ------------------------------
def recommend_homepage(user_embedding: np.ndarray, top_k: int = 10):
    """
    Recommend restaurant IDs for the homepage based on user embedding.
    """
    user_embedding = np.array([user_embedding]).astype('float32')
    
    # Step 1: Search top dishes (use extra results to reduce duplicates)
    D, I = dish_index.search(user_embedding, top_k * 3)
    
    # Step 2: Map dish IDs to restaurant IDs
    restaurant_ids = []
    seen = set()
    for idx in I[0]:
        dish_info = dish_meta[idx]
        rid = dish_info['restaurant_id']
        if rid not in seen:
            restaurant_ids.append(rid)
            seen.add(rid)
        if len(restaurant_ids) >= top_k:
            break
    
    return restaurant_ids
