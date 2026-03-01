from pydantic import BaseModel
from typing import List

class QuestionRequest(BaseModel):
    question: str
    top_k: int = 3

class AnswerCreate(BaseModel):
    content: str

class AnswerResponse(BaseModel):
    id: int
    content: str
    confidence: float

class QuestionResponse(BaseModel):
    question: str
    answers: List[AnswerResponse]

class QuestionResponse(BaseModel):
    question: str
    ranked_answers: list
    ai_generated_answer: str