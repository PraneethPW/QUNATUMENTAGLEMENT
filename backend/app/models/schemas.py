from pydantic import BaseModel
from typing import List

# -----------------------------
# Sentiment Schemas
# -----------------------------

class SentimentRequest(BaseModel):
    text: str


class AspectResult(BaseModel):
    aspect: str
    sentiment: str
    confidence: float


class SentimentResponse(BaseModel):
    text: str
    explanation: str
    aspects: List[AspectResult]


# -----------------------------
# QA Schemas
# -----------------------------

class QuestionRequest(BaseModel):
    question: str
    top_k: int = 3


class DualInputRequest(BaseModel):
    input1: str
    input2: str
    top_k: int = 3


class RankedAnswer(BaseModel):
    id: int
    content: str
    confidence: float


class QuestionResponse(BaseModel):
    question: str
    ranked_answers: List[RankedAnswer]
    ai_generated_answer: str


class AnswerCreate(BaseModel):
    content: str