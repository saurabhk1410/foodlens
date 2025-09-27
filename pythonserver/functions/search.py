import numpy as np
import faiss
import pickle
import re
from sentence_transformers import SentenceTransformer
import os


BASE_DIR = os.path.dirname(__file__)  # directory of function_search.py
EMBED_DIR = os.path.join(BASE_DIR, "embeddings")  # embeddings folder path

restaurant_index = faiss.read_index(os.path.join(EMBED_DIR, "restaurant_index.faiss"))
dish_index = faiss.read_index(os.path.join(EMBED_DIR, "dish_index.faiss"))
review_index = faiss.read_index(os.path.join(EMBED_DIR, "review_index.faiss"))

# Load metadata
with open(os.path.join(EMBED_DIR, "restaurant_meta.pkl"), "rb") as f:
    restaurant_meta = pickle.load(f)

with open(os.path.join(EMBED_DIR, "dish_meta.pkl"), "rb") as f:
    dish_meta = pickle.load(f)

with open(os.path.join(EMBED_DIR, "review_meta.pkl"), "rb") as f:
    review_meta = pickle.load(f)

# Load sentence transformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Locations & Cuisines
locations = ["Andheri","Bandra","Borivali","Malad","Lower Parel","Kandivali",
             "Churchgate", "Goregaon", "Dadar","Byculla"]
cuisines = ["North Indian","Chinese","South Indian","Biryani","Fast Food",
            "Desserts","Italian","American","Continental","Mughlai"]

# ------------------------------
# Extract location & cuisine from query
# ------------------------------
def extract_location_cuisine(query: str):
    query_lower = query.lower()
    location = next((loc for loc in locations if re.search(rf'\b{re.escape(loc.lower())}\b', query_lower)), None)
    cuisine = next((c for c in cuisines if re.search(rf'\b{re.escape(c.lower())}\b', query_lower)), None)
    return {"location": location, "cuisine": cuisine}

# ------------------------------
# Main search function (IDs only)
# ------------------------------
def hierarchical_search_ids(query: str, top_k: int = 5):
    filters = extract_location_cuisine(query)
    location_filter = filters['location']
    cuisine_filter = filters['cuisine']

    # Filter restaurants by location/cuisine
    filtered_rest_ids = [
        idx for idx, meta in restaurant_meta.items()
        if (not location_filter or meta.get("location") == location_filter)
        and (not cuisine_filter or cuisine_filter in meta.get("cuisine_category", ""))
    ]

    if not filtered_rest_ids:
        return {"query": query, "results": []}

    # Semantic search on restaurant embeddings
    query_vec = model.encode([query]).astype('float32')[0]
    restaurant_vectors = np.array([restaurant_index.reconstruct(idx) for idx in filtered_rest_ids])

    sim_scores = [
        (idx, np.dot(query_vec, vec) / (np.linalg.norm(query_vec) * np.linalg.norm(vec)))
        for idx, vec in zip(filtered_rest_ids, restaurant_vectors)
    ]
    sim_scores.sort(key=lambda x: x[1], reverse=True)
    top_restaurants = sim_scores[:min(top_k, len(sim_scores))]

    # Build results with only IDs
    results = []
    for rest_idx, _ in top_restaurants:
        rest_meta = restaurant_meta[rest_idx]
        rest_dish_ids = rest_meta.get('dish_ids', [])
        rest_review_ids = rest_meta.get('review_ids', [])

        dishes_list = []
        for dish_id in rest_dish_ids:
            d_meta = dish_meta.get(dish_id)
            if not d_meta or (cuisine_filter and cuisine_filter not in d_meta.get('cuisine', "")):
                continue

            # Dish-level reviews
            dish_reviews = [
                r_meta['review_id'] for rev_id in rest_review_ids
                if (r_meta := review_meta.get(rev_id)) and r_meta.get('dish_id') == d_meta['dish_id']
            ]

            dishes_list.append({
                "dish_id": d_meta['dish_id'],
                "review_ids": dish_reviews
            })

        # Restaurant-level reviews (not linked to dishes)
        restaurant_reviews = [
            r_meta['review_id'] for rev_id in rest_review_ids
            if (r_meta := review_meta.get(rev_id)) and (r_meta.get('dish_id') is None or np.isnan(r_meta.get('dish_id')))
        ]

        results.append({
            "restaurant_id": rest_meta['restaurant_id'],
            "dishes": dishes_list,
            "restaurant_reviews": restaurant_reviews
        })

    return {"query": query, "results": results}
