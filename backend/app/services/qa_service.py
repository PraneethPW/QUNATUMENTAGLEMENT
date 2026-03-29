from sqlalchemy import select
import numpy as np

from app.models.db_models import Answer
from app.embeddings.embedding_model import generate_embedding
from app.services.gemini_service import generate_ai_answer
from app.quantum.entanglement import entangle_two_inputs


# -----------------------------
# Quantum Helpers
# -----------------------------

def to_quantum_state(vec):
    norm = np.linalg.norm(vec)
    if norm == 0:
        return vec
    return vec / norm


def density_matrix(psi):
    return np.outer(psi, psi)


# 🔥 FIXED: Dimension-safe similarity
def quantum_similarity(vec1, vec2):

    # Match dimensions
    min_dim = min(len(vec1), len(vec2))

    vec1 = vec1[:min_dim]
    vec2 = vec2[:min_dim]

    psi1 = to_quantum_state(vec1)
    psi2 = to_quantum_state(vec2)

    rho1 = density_matrix(psi1)
    rho2 = density_matrix(psi2)

    return float(np.trace(np.dot(rho1, rho2)))


# -----------------------------
# Quantum → Embedding
# -----------------------------

def quantum_to_embedding(state):
    real_part = np.real(state)

    norm = np.linalg.norm(real_part)
    if norm == 0:
        return real_part

    return real_part / norm


# -----------------------------
# EXISTING: Single Input QA
# -----------------------------

async def rank_answers(question, top_k, db):

    question_embedding = generate_embedding(question)

    result = await db.execute(select(Answer))
    answers = result.scalars().all()

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
            "confidence": score
        })

    scored.sort(key=lambda x: x["confidence"], reverse=True)

    top_answers = scored[:top_k]

    context = "\n".join([a["content"] for a in top_answers])

    ai_answer = await generate_ai_answer(question, context)

    return {
        "ranked_answers": top_answers,
        "ai_generated_answer": ai_answer
    }


# -----------------------------
# 🔥 NEW: Dual Input Entanglement QA
# -----------------------------

async def rank_answers_dual(input1, input2, top_k, db):

    # 🔹 Step 1: Entangle inputs
    entangled_state = entangle_two_inputs(input1, input2)

    # 🔹 Step 2: Convert to embedding
    query_embedding = quantum_to_embedding(entangled_state)

    result = await db.execute(select(Answer))
    answers = result.scalars().all()

    scored = []

    for ans in answers:

        answer_embedding = generate_embedding(ans.content)

        score = quantum_similarity(
            query_embedding,
            answer_embedding
        )

        scored.append({
            "id": ans.id,
            "content": ans.content,
            "confidence": score
        })

    scored.sort(key=lambda x: x["confidence"], reverse=True)

    top_answers = scored[:top_k]

    context = "\n".join([a["content"] for a in top_answers])

    # 🔥 Combine both inputs for better reasoning
    combined_query = f"{input1} AND {input2}"

    ai_answer = await generate_ai_answer(combined_query, context)

    return {
        "ranked_answers": top_answers,
        "ai_generated_answer": ai_answer
    }