from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.services.tratamento_service import processar_arquivo
from app.prompt.reuniao_prompt import montar_prompt
from app.services.gemini_service import enviar_para_gemini

app = FastAPI(title="API de Análise de Reuniões")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"status": "Backend online"}


@app.post("/api/analisar-reuniao")
async def analisar_reuniao(file: UploadFile = File(...)):
    try:
        nome_arquivo = file.filename.lower()

        formatos_permitidos = [".json", ".csv", ".txt"]

        if not any(nome_arquivo.endswith(formato) for formato in formatos_permitidos):
            raise HTTPException(
                status_code=400,
                detail="Formato inválido. Envie um arquivo .json, .csv ou .txt."
            )

        conteudo = await file.read()

        transcricao_tratada = processar_arquivo(
            nome_arquivo=nome_arquivo,
            conteudo=conteudo
        )

        prompt_final = montar_prompt(transcricao_tratada)

        resposta_gemini = enviar_para_gemini(prompt_final)

        return {
            "status": "success",
            "arquivo": file.filename,
            "resposta": resposta_gemini
        }

    except HTTPException:
        raise

    except Exception as erro:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao analisar reunião: {str(erro)}"
        )