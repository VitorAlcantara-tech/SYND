import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("A variável GEMINI_API_KEY não foi configurada no .env")

client = genai.Client(api_key=api_key)


def enviar_para_gemini(prompt_final: str) -> str:
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt_final
    )

    return response.text