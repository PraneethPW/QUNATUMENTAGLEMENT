from fastapi import APIRouter
from app.models.schemas import SentimentRequest, SentimentResponse
from app.services.sentiment_service import analyze_sentiment

router = APIRouter(prefix="/sentiment", tags=["Sentiment Analysis"])


@router.post("/analyze", response_model=SentimentResponse)
async def sentiment_analysis(request: SentimentRequest):

    result = await analyze_sentiment(request.text)

    return result