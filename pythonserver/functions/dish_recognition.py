from PIL import Image
import torch
from transformers import AutoImageProcessor, AutoModelForImageClassification
import io

# Load model once globally
processor = AutoImageProcessor.from_pretrained("nateraw/food", use_fast=True)
model = AutoModelForImageClassification.from_pretrained("nateraw/food")

def classify_dish(image_bytes: bytes):
    """
    Classify a dish image and return top prediction with confidence.
    
    Args:
        image_bytes (bytes): Image content from uploaded file.
        
    Returns:
        dict: {"dish_detected": str, "confidence": float}
    """
    # Convert bytes to PIL image
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    # Prepare inputs and run model
    inputs = processor(images=image, return_tensors="pt")
    with torch.no_grad():
        logits = model(**inputs).logits

    probs = torch.nn.functional.softmax(logits, dim=-1)[0]

    top_id = probs.argmax().item()
    label = model.config.id2label[top_id]
    confidence = round(probs[top_id].item(), 4)

    return {"dish_detected": label, "confidence": confidence}
