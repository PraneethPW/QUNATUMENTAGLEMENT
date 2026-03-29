from transformers import pipeline

# Load sentiment model
sentiment_pipeline = pipeline(
    "sentiment-analysis",
    model="cardiffnlp/twitter-roberta-base-sentiment"
)

label_map = {
    "LABEL_0": "Negative",
    "LABEL_1": "Neutral",
    "LABEL_2": "Positive"
}


# 🔥 NO SPACY VERSION
def extract_aspects(text: str):
    words = text.lower().split()
    return list(set(words))[:5]


async def analyze_aspect_sentiment(text: str):

    aspects = extract_aspects(text)

    if not aspects:
        aspects = ["overall"]

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
        "aspects": results
    }