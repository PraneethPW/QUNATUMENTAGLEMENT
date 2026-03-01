from google import genai
from app.core.config import settings

# ✅ DEFINE CLIENT PROPERLY
client = genai.Client(api_key=settings.GEMINI_API_KEY)


async def generate_ai_answer(question: str, context: str):

    prompt = f"""
    You are an intelligent AI assistant.

    Try to answer using the provided context.
    If the context is not sufficient, you may use your own knowledge.

    Context:
    {context}

    Question:
    {question}

    Provide a clear and helpful explanation.
    """

    try:
        response = client.models.generate_content(
            model="models/gemini-2.5-flash",
            contents=prompt
        )

        return response.text

    except Exception as e:
        return f"Gemini generation failed: {str(e)}"