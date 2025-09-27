from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import Optional, List, Dict
import numpy as np 
from fastapi import FastAPI 
from PIL import Image
import io
from functions.search import hierarchical_search_ids
from functions.embeddings_updates import update_embeddings_from_json
from functions.user_personalize import recommend_homepage, create_user_embedding
from functions.dish_recognition import classify_dish, search_restaurants_by_dish
from functions.reviews import summarize_reviews
app = FastAPI()

class ReviewRequest(BaseModel):
    restaurant_id: int

class UserPreferences(BaseModel):
    user_id: int
    prefered_cuisines: str
    favourite_dishes: str

class UserEmbeddingRequest(BaseModel):
    user_embedding: List[float]
    top_k: int = 10

class QueryRequest(BaseModel):
    query: str

class Dish(BaseModel):
    dish_id: int
    restaurant_id: int
    name: str
    category: Optional[str] = None
    type: Optional[str] = None
    cuisine: Optional[str] = None
    cost: Optional[float] = None
    rating: Optional[float] = None

class Restaurant(BaseModel):
    restaurant_id: int
    name: str
    restaurant_type: Optional[str] = None
    location: Optional[str] = None
    city: Optional[str] = None
    cuisine_category: Optional[str] = None
    price_for_two: Optional[float] = None
    votes: Optional[int] = None
    timing: Optional[str] = None

class Review(BaseModel):
    review_id: int
    restaurant_id: int
    dish_id: Optional[int] = None
    rating: Optional[float] = None
    review_text: str
    ambiance: Optional[str] = None
    occasion: Optional[str] = None
    dietary: Optional[str] = None
    features: Optional[str] = None
    sentiment: Optional[str] = None

class EmbeddingUpdateRequest(BaseModel):
    review: Review
    dish: Optional[Dish] = None
    restaurant: Optional[Restaurant] = None
    restaurant_dishes: Optional[List[Dish]] = None
    restaurant_reviews: Optional[List[Review]] = None


@app.post("/search")
def search(request: QueryRequest):
    return hierarchical_search_ids(request.query)


@app.post("/update_embeddings/")
def update_embeddings_endpoint(payload: EmbeddingUpdateRequest):
    try:
        result = update_embeddings_from_json(
            review_json=payload.review.dict(),
            dish_json=payload.dish.dict() if payload.dish else None,
            restaurant_json=payload.restaurant.dict() if payload.restaurant else None,
            restaurant_dishes_json=[d.dict() for d in payload.restaurant_dishes] if payload.restaurant_dishes else None,
            restaurant_reviews_json=[r.dict() for r in payload.restaurant_reviews] if payload.restaurant_reviews else None
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.post("/user/embedding")
def create_embedding(user_pref: UserPreferences):
    # Create embedding
    embedding = create_user_embedding(user_pref.prefered_cuisines, user_pref.favourite_dishes)
    embedding_list = embedding.tolist()  # convert numpy array to list for JSON
    
    return {
        "status": "success",
        "user_id": user_pref.user_id,
        "user_embedding": embedding_list
    }


@app.post("/homepage/recommendations")
def get_homepage_recommendations(request: UserEmbeddingRequest):
    # Convert list back to numpy array
    user_embedding_np = np.array(request.user_embedding, dtype=np.float32)
    
    # Get top restaurant IDs
    restaurant_ids = recommend_homepage(user_embedding_np, top_k=request.top_k)

    return {
        "top_restaurant_ids": restaurant_ids
    }

# @app.post("/classify_dish")
# async def classify_dish_api(file: UploadFile = File(...)):
#     # Read uploaded file
#     image_bytes = await file.read()
    
#     # Call classifier
#     result = classify_dish(image_bytes)
    
#     return result



@app.post("/search_dish_image")
async def search_dish_image(file: UploadFile = File(...)):
    image_bytes = await file.read()
    
    # Classify the dish
    result = classify_dish(image_bytes)  # your existing function
    dish_label = result['dish_detected']
    
    # Search restaurants
    search_results = search_restaurants_by_dish(dish_label)
    
    return {"dish_detected": dish_label, "restaurants": search_results}

@app.post("/summarize")
async def summarize(request: ReviewRequest):
    try:
        result = summarize_reviews(request.restaurant_id)
        return {"restaurant_id": request.restaurant_id, "summary": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))