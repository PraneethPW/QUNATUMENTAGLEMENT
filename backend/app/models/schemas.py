from pydantic import BaseModel
from typing import List

class SentimentRequest(BaseModel):
    text: str


class AspectResult(BaseModel):
    aspect: str
    sentiment: str
    confidence: float


class SentimentResponse(BaseModel):
    text: str
    aspects: List[AspectResult]