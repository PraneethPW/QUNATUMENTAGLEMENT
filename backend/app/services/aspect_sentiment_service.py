from transformers import pipeline
import spacy
from typing import List, Dict


# --------------------------------------------------
# Load Models Once (Startup Optimization)
# --------------------------------------------------

# Sentiment model
sentiment_pipeline = pipeline(
    "sentiment-analysis",
    model="cardiffnlp/twitter-roberta-base-sentiment"
)

# Load SpaCy model for aspect extraction
nlp = spacy.load("en_core_web_sm")


# Map model labels to readable sentiments
label_map = {
    "LABEL_0": "Negative",
    "LABEL_1": "Neutral",
    "LABEL_2": "Positive"
}


# --------------------------------------------------
# Aspect Extraction
# --------------------------------------------------

def extract_aspects(text: str) -> List[str]:
    """
    Extract potential aspects (nouns) from text
    Example:
    'The battery is amazing but the screen is dull'
    -> ['battery', 'screen']
    """

    doc = nlp(text)

    aspects = []

    for token in doc:
        if token.pos_ in ["NOUN", "PROPN"]:
            aspects.append(token.text.lower())

    # remove duplicates
    aspects = list(set(aspects))

    return aspects


# --------------------------------------------------
# Aspect Sentiment Analysis
# --------------------------------------------------

async def analyze_aspect_sentiment(text: str) -> Dict:
    """
    Perform aspect-based sentiment analysis.
    """

    try:

        aspects = extract_aspects(text)

        # fallback if no aspects detected
        if not aspects:
            aspects = ["overall"]

        results = []

        for aspect in aspects:

            # Create contextual phrase for model
            phrase = f"{aspect} in sentence: {text}"

            result = sentiment_pipeline(phrase)[0]

            sentiment = label_map.get(result["label"], result["label"])

            results.append({
                "aspect": aspect,
                "sentiment": sentiment,
                "confidence": round(float(result["score"]), 4)
            })

        return {
            "text": text,
            "aspects": results
        }

    except Exception as e:

        # Safe fallback so API never crashes
        return {
            "text": text,
            "aspects": [
                {
                    "aspect": "error",
                    "sentiment": "Unknown",
                    "confidence": 0.0
                }
            ]
        }