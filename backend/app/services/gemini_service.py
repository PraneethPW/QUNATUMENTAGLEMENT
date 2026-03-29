import google.generativeai as genai
from app.core.config import settings

# Configure API key
genai.configure(api_key=settings.GEMINI_API_KEY)


async def generate_ai_answer(user_input: str, prompt: str) -> str:
    """
    Calls Gemini API and returns cleaned response text.
    """

    final_prompt = f"""
STRICT RULES:
- Return ONLY valid JSON
- No extra text before or after JSON
- No markdown

{prompt}

User Input:
{user_input}
"""

    try:
        # ✅ CORRECT WAY
        model = genai.GenerativeModel("gemini-1.5-flash")

        response = model.generate_content(final_prompt)

        text = ""

        if hasattr(response, "text") and response.text:
            text = response.text.strip()
        elif response.candidates:
            text = response.candidates[0].content.parts[0].text.strip()

        # Cleanup markdown
        if text.startswith("```"):
            text = text.replace("```json", "").replace("```", "").strip()

        return text

    except Exception as e:
        print("❌ Gemini API Error:", str(e))
        return ""