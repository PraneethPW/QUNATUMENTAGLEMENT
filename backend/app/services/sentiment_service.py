from transformers import pipeline

# Load once
sentiment_pipeline = pipeline(
    "sentiment-analysis",
    model="cardiffnlp/twitter-roberta-base-sentiment"
)

label_map = {
    "LABEL_0": "Negative",
    "LABEL_1": "Neutral",
    "LABEL_2": "Positive"
}


async def analyze_sentiment(text: str):

    result = sentiment_pipeline(text)[0]

    label = label_map.get(result["label"], result["label"])
    score = float(result["score"])

    return {
        "text": text,
        "sentiment": label,
        "confidence": round(score, 4)
    }