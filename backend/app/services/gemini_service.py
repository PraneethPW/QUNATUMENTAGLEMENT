from google import genai
from app.core.config import settings

client = genai.Client(api_key=settings.GEMINI_API_KEY)

async def generate_ai_answer(question, context):

    prompt = f"""
You are an intelligent NLP system.

Context:
{context}

User Input:
{question}

Respond STRICTLY in valid JSON if asked.
"""

    response = client.models.generate_content(
        model="models/gemini-2.5-flash",
        contents=prompt
    )

    return response.text.strip()