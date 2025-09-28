import pandas as pd
import openai
import json
from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent   # points to "functions"
DATA_PATH = BASE_DIR / "dataset_new" / "reviews_dataset_clean.csv"

print("Looking for file at:", DATA_PATH.resolve())
print("Exists?", DATA_PATH.exists())

df = pd.read_csv(DATA_PATH)

# OpenAI client
client = openai.OpenAI(
    api_key="",   # use env var ideally
    base_url="https://go.fastrouter.ai/api/v1"
)

def summarize_reviews(restaurant_id: int):
    """
    Summarizes reviews for a given restaurant_id and returns structured JSON:
    - summary: text
    - sentiment_distribution: {excellent, good, average} that add to 100
    - areas_for_improvement: list of 5 short 2-word phrases
    """
    # Filter reviews
    reviews = df[df['restaurant_id'] == restaurant_id]

    if reviews.empty:
        return {
            "restaurant_id": restaurant_id,
            "summary": "No reviews found for this restaurant.",
            "sentiment_distribution": {"excellent": 0, "good": 0, "average": 0},
            "areas_for_improvement": []
        }

    review_texts = "\n".join(reviews['review_text'].astype(str).tolist())

    prompt = f"""
    You are a restaurant review analyst. 
    Here are reviews for restaurant {restaurant_id}:
    
    {review_texts}
    
    Please return *valid JSON* with the following structure:
    {{
      "summary": "short summary of the reviews",
      "sentiment_distribution": {{
        "excellent": <integer>,   # percent
        "good": <integer>,        # percent
        "average": <integer>      # percent
      }},
      "areas_for_improvement": [
        "two-word phrase 1",
        "two-word phrase 2",
        "two-word phrase 3",
        "two-word phrase 4",
        "two-word phrase 5"
      ]
    }}
    Make sure that excellent + good + average = 100 exactly.
    """

    response = client.chat.completions.create(
        model="openai/gpt-4.1",
        messages=[{"role": "user", "content": prompt}],
        temperature=0
    )

    # Parse AI response safely
    try:
        result = json.loads(response.choices[0].message.content)
    except Exception:
        result = {"raw_output": response.choices[0].message.content}

    return {"restaurant_id": restaurant_id, **result}