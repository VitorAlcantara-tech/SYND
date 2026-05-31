# SYND - Analisador de Transcrições com IA

Este projeto é uma aplicação web simples para envio de arquivos de transcrição de reunião e análise automática usando IA Gemini.

O fluxo da aplicação é:

1. O usuário envia um arquivo `.json`, `.csv` ou `.txt` pelo front-end.
2. O backend em FastAPI recebe o arquivo.
3. O backend processa e trata os dados usando Pandas.
4. O backend monta um prompt fixo com a transcrição tratada.
5. O backend envia o prompt para a API Gemini.
6. O Gemini retorna a análise.
7. O front-end em Next.js exibe a resposta para o usuário.

---

## Tecnologias utilizadas

### Backend

* Python
* FastAPI
* Pandas
* Uvicorn
* Google Gen AI SDK
* Python Dotenv

### Frontend

* Next.js
* TypeScript
* TSX
* Tailwind CSS

---

## Estrutura do projeto

```txt
SYND/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── prompt/
│   │   │   └── reuniao_prompt.py
│   │   └── services/
│   │       ├── gemini_service.py
│   │       └── tratamento_service.py
│   ├── .env
│   ├── requirements.txt
│   └── venv/
│
└── frontend/
    ├── app/
    │   ├── page.tsx
    │   ├── layout.tsx
    │   └── globals.css
    ├── .env.local
    ├── package.json
    └── tsconfig.json
```

---

# Como rodar o projeto localmente

## Pré-requisitos

Antes de iniciar, verifique se você possui instalado:

* Python 3.10 ou superior
* Node.js 20 ou superior
* npm
* Git

Para verificar as versões:

```bash
python --version
node --version
npm --version
```

---

# 1. Clonar o projeto

```bash
git clone URL_DO_REPOSITORIO
cd SYND
```

---

# 2. Configurar o backend

Entre na pasta do backend:

```bash
cd backend
```

Crie o ambiente virtual:

```bash
python -m venv venv
```

Ative o ambiente virtual.

No Windows:

```bash
venv\Scripts\activate
```

No Linux/Mac:

```bash
source venv/bin/activate
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

Caso o arquivo `requirements.txt` ainda não exista, instale manualmente:

```bash
pip install fastapi uvicorn pandas python-dotenv google-genai python-multipart
```

Depois gere o `requirements.txt`:

```bash
pip freeze > requirements.txt
```

---

# 3. Configurar variável de ambiente do Gemini

Dentro da pasta `backend`, crie um arquivo chamado `.env`.

```txt
backend/.env
```

Adicione a chave da API Gemini:

```env
GEMINI_API_KEY=SUA_CHAVE_DO_GEMINI_AQUI
```

Exemplo:

```env
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX
```

Importante: não subir o arquivo `.env` para o GitHub.

---

# 4. Rodar o backend

Ainda dentro da pasta `backend`, execute:

```bash
uvicorn app.main:app --reload
```

Se estiver funcionando, o backend ficará disponível em:

```txt
http://localhost:8000
```

Ao acessar essa URL no navegador, deve aparecer:

```json
{"status":"Backend online"}
```

A documentação automática da API estará em:

```txt
http://localhost:8000/docs
```

---

# 5. Testar o backend pelo Swagger

Acesse:

```txt
http://localhost:8000/docs
```

Procure a rota:

```txt
POST /api/analisar-reuniao
```

Clique em:

```txt
Try it out
```

Envie um arquivo nos formatos permitidos:

```txt
.json
.csv
.txt
```

Depois clique em:

```txt
Execute
```

Se tudo estiver correto, o backend retornará a resposta gerada pelo Gemini.

---

# 6. Configurar o frontend

Abra outro terminal e volte para a raiz do projeto:

```bash
cd ..
```

Entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

---

# 7. Configurar variável de ambiente do frontend

Dentro da pasta `frontend`, crie um arquivo chamado `.env.local`.

```txt
frontend/.env.local
```

Adicione a URL do backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

# 8. Rodar o frontend

Ainda dentro da pasta `frontend`, execute:

```bash
npm run dev
```

O front-end ficará disponível em:

```txt
http://localhost:3000
```

---

# 9. Como usar a aplicação

Com backend e frontend rodando:

1. Acesse `http://localhost:3000`
2. Selecione um arquivo `.json`, `.csv` ou `.txt`
3. Clique em `Analisar reunião`
4. Aguarde o processamento
5. A resposta da IA será exibida na tela

---

# 10. Formatos de arquivo aceitos

A aplicação aceita os seguintes formatos:

```txt
.json
.csv
.txt
```

Para arquivos `.json` e `.csv`, a coluna principal da transcrição deve ser:

```txt
ANON_TRANSCRICAO
```

As demais colunas esperadas são:

```txt
ID_MEETING
DT_MEETING
FORMATO_MEETING
ID_STATUS_MEETING
STATUS_MEETING
DURACAO_MEETING
CODT
TP_RECURSO
FLG_EXTERNO
DT_CRIACAO
ANON_TRANSCRICAO
UF
CNAE
NOME_UNIDADE
NOME_SEGMENTO
FAIXA_FATURAMENTO_CLIENTE
DT_ULTIMA_PESQUISA
NOTA_NPS
```

---

# 11. Comandos principais

## Rodar backend

```bash
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```


## Rodar frontend

```bash
cd frontend
npm run dev
```

---
