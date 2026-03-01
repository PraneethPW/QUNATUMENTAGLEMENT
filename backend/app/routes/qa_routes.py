from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.models.schemas import (
    QuestionRequest,
    QuestionResponse,
    AnswerCreate
)
from app.models.db_models import Answer
from app.services.qa_service import rank_answers

router = APIRouter(prefix="/qa", tags=["Quantum QA"])


# 🔹 Add Answer
@router.post("/add-answer")
async def add_answer(answer: AnswerCreate, db: AsyncSession = Depends(get_db)):
    new_answer = Answer(content=answer.content)
    db.add(new_answer)
    await db.commit()
    await db.refresh(new_answer)
    return {"message": "Answer added", "id": new_answer.id}


# 🔹 Get All Answers
@router.get("/all-answers")
async def get_all_answers(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Answer))
    answers = result.scalars().all()
    return answers


# 🔹 Ask Question (Quantum + Gemini)
@router.post("/ask", response_model=QuestionResponse)
async def ask_question(
    request: QuestionRequest,
    db: AsyncSession = Depends(get_db)
):
    result = await rank_answers(request.question, request.top_k, db)

    return {
        "question": request.question,
        "ranked_answers": result["ranked_answers"],
        "ai_generated_answer": result["ai_generated_answer"]
    }