from transformers import pipeline
import spacy

sentiment_pipeline = pipeline(
    "sentiment-analysis",
    model="cardiffnlp/twitter-roberta-base-sentiment"
)

nlp = spacy.load("en_core_web_sm")

label_map = {
    "LABEL_0": "Negative",
    "LABEL_1": "Neutral",
    "LABEL_2": "Positive"
}

def extract_aspects(text: str):

    doc = nlp(text)

    aspects = []

    for token in doc:
        if token.pos_ in ["NOUN", "PROPN"]:
            aspects.append(token.text.lower())

    return list(set(aspects))


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