import faiss
import pickle
import numpy as np
import os
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')


BASE_DIR = os.path.dirname(__file__)        # directory of this script
EMBED_DIR = os.path.join(BASE_DIR, "embeddings")  # embeddings folder path
DATA_DIR = os.path.join(BASE_DIR, "data")        # optional: if CSVs are in a data folder

# FAISS index and metadata paths
REVIEW_INDEX_PATH = os.path.join(EMBED_DIR, "review_index.faiss")
REVIEW_META_PATH = os.path.join(EMBED_DIR, "review_meta.pkl")
DISH_INDEX_PATH = os.path.join(EMBED_DIR, "dish_index.faiss")
DISH_META_PATH = os.path.join(EMBED_DIR, "dish_meta.pkl")
RESTAURANT_INDEX_PATH = os.path.join(EMBED_DIR, "restaurant_index.faiss")
RESTAURANT_META_PATH = os.path.join(EMBED_DIR, "restaurant_meta.pkl")

# -----------------------
# Helper functions
# -----------------------

def embed_text(text):
    return model.encode([text]).astype('float32')

def build_restaurant_text_from_json(restaurant_json, dishes_json, reviews_json, max_dishes=3, max_reviews=2):
    """
    Construct restaurant text using JSON info.
    - restaurant_json: dict with restaurant info
    - dishes_json: list of dicts for this restaurant's dishes
    - reviews_json: list of dicts for this restaurant's reviews
    """
    text = (
        f"{restaurant_json['name']} is a {restaurant_json['restaurant_type']} restaurant in "
        f"{restaurant_json['location']}, {restaurant_json['city']} serving {restaurant_json['cuisine_category']}. "
        f"Average price for two: ₹{restaurant_json['price_for_two']}, Votes: {restaurant_json['votes']}, Open: {restaurant_json['timing']}."
    )

    # Top dishes
    dishes = sorted(dishes_json, key=lambda x: x.get("rating",0), reverse=True)[:max_dishes]
    dish_texts = [f"{d['name']} ({d['category']}, {d['type']}, {d['cuisine']}, ₹{d['cost']})" for d in dishes]
    if dish_texts:
        text += " Dishes: " + "; ".join(dish_texts)

    # Top reviews
    reviews = sorted(reviews_json, key=lambda x: x.get("rating",0), reverse=True)[:max_reviews]
    review_texts = []
    for rev in reviews:
        attrs = [f"{field}: {rev.get(field)}" for field in ['ambiance','occasion','dietary','features','sentiment'] if rev.get(field) is not None]
        attr_text = ", ".join(attrs)
        review_texts.append(f"{rev['review_text']} {attr_text}")
    if review_texts:
        text += " Reviews: " + "; ".join(review_texts)

    return text

# -----------------------
# Core update function
# -----------------------

def update_embeddings_from_json(review_json, dish_json=None, restaurant_json=None, restaurant_dishes_json=None, restaurant_reviews_json=None):
    """
    Update embeddings using provided JSON data.
    Handles all cases:
    1. Review for existing restaurant
    2. Review for existing dish of existing restaurant
    3. Review for new dish of existing restaurant
    4. Review for new restaurant
    5. Review for new dish of new restaurant

    :param review_json: dict of review info
    :param dish_json: dict of new dish info (if any)
    :param restaurant_json: dict of new restaurant info (if any)
    :param restaurant_dishes_json: list of all dishes of the restaurant (including new one)
    :param restaurant_reviews_json: list of all reviews of the restaurant (including new one)
    """

    # -----------------------
    # 1. Update review embedding
    # -----------------------
    text = review_json['review_text'] + " " + ", ".join(
        f"{field}: {review_json.get(field)}" for field in ['ambiance','occasion','dietary','features','sentiment'] if review_json.get(field) is not None
    )
    vec = embed_text(text)

    try:
        review_index = faiss.read_index(REVIEW_INDEX_PATH)
    except:
        review_index = faiss.IndexFlatL2(vec.shape[1])
    review_index.add(np.array(vec, dtype='float32'))
    faiss.write_index(review_index, REVIEW_INDEX_PATH)

    # Update review metadata
    try:
        with open(REVIEW_META_PATH, "rb") as f:
            review_meta = pickle.load(f)
    except:
        review_meta = {}
    review_meta[review_json['review_id']] = {
        "review_id": review_json['review_id'],
        "restaurant_id": review_json['restaurant_id'],
        "dish_id": review_json.get('dish_id', None),
        "rating": review_json.get('rating', None)
    }
    with open(REVIEW_META_PATH, "wb") as f:
        pickle.dump(review_meta, f)

    # -----------------------
    # 2. Update dish embedding (if new or provided)
    # -----------------------
    if dish_json is not None:
        dish_text = f"{dish_json['name']} ({dish_json['category']}, {dish_json['type']}, {dish_json['cuisine']}, ₹{dish_json['cost']})"
        dish_vec = embed_text(dish_text)
        try:
            dish_index = faiss.read_index(DISH_INDEX_PATH)
        except:
            dish_index = faiss.IndexFlatL2(dish_vec.shape[1])
        dish_index.add(np.array(dish_vec, dtype='float32'))
        faiss.write_index(dish_index, DISH_INDEX_PATH)

        # Update dish metadata
        try:
            with open(DISH_META_PATH, "rb") as f:
                dish_meta = pickle.load(f)
        except:
            dish_meta = {}
        dish_meta[dish_json['dish_id']] = {
            "dish_id": dish_json['dish_id'],
            "restaurant_id": dish_json['restaurant_id'],
            "cuisine": dish_json['cuisine'],
            "category": dish_json['category'],
            "type": dish_json['type'],
            "cost": dish_json['cost']
        }
        with open(DISH_META_PATH, "wb") as f:
            pickle.dump(dish_meta, f)

    # -----------------------
    # 3. Update restaurant embedding
    # -----------------------
    if restaurant_json is not None and restaurant_dishes_json is not None and restaurant_reviews_json is not None:
        restaurant_text = build_restaurant_text_from_json(
            restaurant_json, restaurant_dishes_json, restaurant_reviews_json
        )
        rest_vec = embed_text(restaurant_text)
        try:
            restaurant_index = faiss.read_index(RESTAURANT_INDEX_PATH)
        except:
            restaurant_index = faiss.IndexFlatL2(rest_vec.shape[1])
        restaurant_index.add(np.array(rest_vec, dtype='float32'))
        faiss.write_index(restaurant_index, RESTAURANT_INDEX_PATH)

        # Update restaurant metadata
        try:
            with open(RESTAURANT_META_PATH, "rb") as f:
                rest_meta = pickle.load(f)
        except:
            rest_meta = {}
        rest_meta[restaurant_json['restaurant_id']] = {"restaurant_id": restaurant_json['restaurant_id']}
        with open(RESTAURANT_META_PATH, "wb") as f:
            pickle.dump(rest_meta, f)

    return {"status": "success", "message": "Embeddings updated from JSON"}
