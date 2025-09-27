from PIL import Image
import torch
from transformers import AutoImageProcessor, AutoModelForImageClassification
import io
from sentence_transformers import SentenceTransformer
import faiss
import pickle
import numpy as np
import os

# ------------------------------
# Global setup
# ------------------------------
# 1️⃣ Image classification model
processor = AutoImageProcessor.from_pretrained("nateraw/food", use_fast=True)
image_model = AutoModelForImageClassification.from_pretrained("nateraw/food")

# 2️⃣ Text embedding model for FAISS search
text_model = SentenceTransformer('all-mpnet-base-v2')

# Paths
BASE_DIR = os.path.dirname(__file__)
EMBED_DIR = os.path.join(BASE_DIR, "new_embeddings")

# FAISS index and metadata
dish_index = faiss.read_index(os.path.join(EMBED_DIR, "dish_index1.faiss"))

with open(os.path.join(EMBED_DIR, "dish_meta1.pkl"), "rb") as f:
    dish_meta = pickle.load(f)

with open(os.path.join(EMBED_DIR, "restaurant_meta1.pkl"), "rb") as f:
    restaurant_meta = pickle.load(f)

# ------------------------------
# Dish image classification
# ------------------------------
def classify_dish(image_bytes: bytes):
    """
    Takes an image in bytes, predicts the dish label and confidence.
    """
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    inputs = processor(images=image, return_tensors="pt")

    with torch.no_grad():
        logits = image_model(**inputs).logits

    probs = torch.nn.functional.softmax(logits, dim=-1)[0]
    top_id = probs.argmax().item()
    label = image_model.config.id2label[top_id]
    confidence = round(probs[top_id].item(), 4)

    return {"dish_detected": label, "confidence": confidence}

# ------------------------------
# Search restaurants by dish name
# ------------------------------
def search_restaurants_by_dish(dish_label: str, top_k: int = 5):
    """
    Takes a dish label (string), searches FAISS dish embeddings,
    and returns results grouped by restaurant in hierarchical format.
    """
    # Encode label using text model
    query_vec = text_model.encode([dish_label]).astype('float32')[0]

    # Search dish embeddings
    D, I = dish_index.search(np.array([query_vec]), top_k)

    # Map indices → dish_ids → restaurant_ids
    dish_keys = list(dish_meta.keys())
    restaurant_map = {}  # restaurant_id -> list of dishes

    for idx in I[0]:
        if idx >= len(dish_keys):
            continue
        dish_id = dish_keys[idx]
        dish_info = dish_meta[dish_id]
        r_id = dish_info['restaurant_id']

        # Add dish under the correct restaurant
        if r_id not in restaurant_map:
            restaurant_map[r_id] = []
        restaurant_map[r_id].append({"dish_id": dish_id})

    # Build final hierarchical results
    results = []
    for r_id, dishes in restaurant_map.items():
        results.append({
            "restaurant_id": r_id,
            "dishes": dishes
        })

    return {
        "query": dish_label,
        "results": results
    }