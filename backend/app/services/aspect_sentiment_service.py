from transformers import pipeline
from app.services.gemini_service import generate_ai_answer
import json

sentiment_pipeline = pipeline(
    "sentiment-analysis",
    model="cardiffnlp/twitter-roberta-base-sentiment"
)

label_map = {
    "LABEL_0": "Negative",
    "LABEL_1": "Neutral",
    "LABEL_2": "Positive"
}


def extract_aspects_basic(text: str):
    words = text.lower().split()
    return list(set(words))[:5]


async def analyze_aspect_sentiment(text: str):

    # 🔹 Step 1: Context + aspect extraction (LLM)
    context_prompt = f"""
Analyze the sentence:
"{text}"

Return JSON:
{{
  "aspects": ["..."],
  "explanation": "..."
}}
"""

    try:
        ai_response = await generate_ai_answer(text, context_prompt)
        parsed = json.loads(ai_response)

        aspects = parsed.get("aspects", [])
        explanation = parsed.get("explanation", "")

    except Exception:
        aspects = extract_aspects_basic(text)
        explanation = "Basic extraction used"

    if not aspects:
        aspects = ["overall"]

    # 🔹 Step 2: Sentiment
    results = []

    for aspect in aspects:
        phrase = f"{aspect} in sentence: {text}"
        result = sentiment_pipeline(phrase)[0]

        sentiment = label_map.get(result["label"], result["label"])

        results.append({
            "aspect": aspect,
            "sentiment": sentiment,
            "confidence": float(result["score"])
        })

    return {
        "text": text,
        "explanation": explanation,
        "aspects": results
    }