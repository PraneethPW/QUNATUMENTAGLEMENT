from google import genai

client = genai.Client(api_key="PASTE_KEY_HERE")

print("Testing Gemini connection...")

response = client.models.generate_content(
    model="models/gemini-1.5-flash",
    contents="Say hello."
)

print(response.text)