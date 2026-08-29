import os
import httpx
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("A variável GEMINI_API_KEY não foi configurada no .env")

# O Pydantic da SDK exige uma instância de httpx.Client (síncrono) nas HttpOptions
# Configuramos os timeouts de conexão e leitura diretamente nele
httpx_client_config = httpx.Client(
    timeout=httpx.Timeout(connect=30.0, read=600.0, write=600.0, pool=600.0)
)

client = genai.Client(
    api_key=api_key,
    http_options=types.HttpOptions(httpx_client=httpx_client_config)
)

async def enviar_para_gemini(prompt_final: str) -> str:
    # Usamos o client.aio para fazer a requisição sem travar o loop de eventos do FastAPI
    response = await client.aio.models.generate_content(
        model="gemini-3.1-flash-lite",
        contents=prompt_final
    )
    return response.text