from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
import numpy as np

from app.models.db_models import Answer
from app.embeddings.embedding_model import generate_embedding
from app.services.gemini_service import generate_ai_answer


# -------------------------
# Quantum Formulation
# -------------------------

def to_quantum_state(vec):
    norm = np.linalg.norm(vec)
    if norm == 0:
        return vec
    return vec / norm


def density_matrix(psi):
    return np.outer(psi, psi)


def quantum_similarity(vec1, vec2):
    psi1 = to_quantum_state(vec1)
    psi2 = to_quantum_state(vec2)

    rho1 = density_matrix(psi1)
    rho2 = density_matrix(psi2)

    return float(np.trace(np.dot(rho1, rho2)))


# -------------------------
# Main Ranking Function
# -------------------------

async def rank_answers(question: str, top_k: int, db: AsyncSession):

    question_embedding = generate_embedding(question)

    result = await db.execute(select(Answer))
    answers = result.scalars().all()

    if not answers:
        return {
            "ranked_answers": [],
            "ai_generated_answer": "No answers found in database."
        }

    scored = []

    for ans in answers:
        answer_embedding = generate_embedding(ans.content)

        score = quantum_similarity(
            question_embedding,
            answer_embedding
        )

        scored.append({
            "id": ans.id,
            "content": ans.content,
            "confidence": round(score, 6)
        })

    scored.sort(key=lambda x: x["confidence"], reverse=True)

    top_answers = scored[:top_k]

    context_text = "\n".join([a["content"] for a in top_answers])

    ai_response = await generate_ai_answer(question, context_text)

    return {
        "ranked_answers": top_answers,
        "ai_generated_answer": ai_response
    }