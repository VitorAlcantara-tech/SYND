import io
import json
import pandas as pd
import re


COLUNAS_ESPERADAS = [
    "ID_MEETING",
    "DT_MEETING",
    "FORMATO_MEETING",
    "ID_STATUS_MEETING",
    "STATUS_MEETING",
    "DURACAO_MEETING",
    "CODT",
    "TP_RECURSO",
    "FLG_EXTERNO",
    "DT_CRIACAO",
    "ANON_TRANSCRICAO",
    "UF",
    "CNAE",
    "NOME_UNIDADE",
    "NOME_SEGMENTO",
    "FAIXA_FATURAMENTO_CLIENTE_EC",
    "DT_ULTIMA_PESQUISA",
    "NOTA_NPS",
]

def processar_json(conteudo) -> str:

    try:
        dados_json = json.loads(conteudo)

    except ValueError as erro:
        print("Não foi possível ler o arquivo JSON.", erro)

    if isinstance(dados_json, list):
        df = pd.DataFrame(dados_json)

    elif isinstance(dados_json, dict):
        if "dados" in dados_json:
            df = pd.DataFrame(dados_json["dados"])
        elif "transcricao" in dados_json:
            df = pd.DataFrame(dados_json["transcricao"])
        elif "records" in dados_json:
            df = pd.DataFrame(dados_json["records"])
        else:
            df = pd.DataFrame([dados_json])
    else:
        raise ValueError("Formato de JSON inválido.")

    return processar_dataframe(df)

def processar_dataframe(df: pd.DataFrame) -> str:
    """
    Processa arquivos estruturados, como JSON e CSV.
    A coluna principal esperada é ANON_TRANSCRICAO.
    """

    if df.empty:
        raise ValueError("O arquivo está vazio.")

    # Remove espaços extras dos nomes das colunas
    df.columns = df.columns.str.strip()

    colunas_encontradas = df.columns.tolist()

    if "ANON_TRANSCRICAO" not in colunas_encontradas:
        raise ValueError(
            f"A coluna ANON_TRANSCRICAO não foi encontrada. "
            f"Colunas encontradas: {colunas_encontradas}"
        )

    # Garante que todas as colunas esperadas existam
    for coluna in COLUNAS_ESPERADAS:
        if coluna not in df.columns:
            df[coluna] = ""

    df["ANON_TRANSCRICAO"] = (
        df["ANON_TRANSCRICAO"]
        .fillna("")
        .astype(str)
        .str.strip()
    )

    df = df[df["ANON_TRANSCRICAO"] != ""]

    if df.empty:
        raise ValueError("Não há conteúdo válido na coluna ANON_TRANSCRICAO.")

    textos_reunioes = []

    for _, row in df.iterrows():
        
        Locutores = str(re.findall(r"LOCUTOR \d+", str(row["ANON_TRANSCRICAO"]))) 
        LocutoresTratados = []
        for locutor in Locutores:
            try:
                if locutor.index(Locutores):
                    LocutoresTratados.append(locutor)
            except ValueError:
                pass
            
        texto = str(row["ANON_TRANSCRICAO"])
        # re.findall busca todos as strings Locutor seguidas por um espaço e números. Devolve uma lista
        locutores_encontrados = re.findall(r"LOCUTOR \d+", texto)

        # dict.fromkeys transforma cada ite da lista em uma chave de dicionário, isso remove os duplicados
        locutores_tratados = list(dict.fromkeys(locutores_encontrados))
            
        contexto_reuniao = f"""
        ==============================
        DADOS DA REUNIÃO
        ==============================
        ID da reunião: {row["ID_MEETING"]}
        Data da reunião: {row["DT_MEETING"]}
        Formato da reunião: {row["FORMATO_MEETING"]}
        ID status da reunião: {row["ID_STATUS_MEETING"]}
        Status da reunião: {row["STATUS_MEETING"]}
        Duração da reunião: {row["DURACAO_MEETING"]}
        CODT: {row["CODT"]}
        Tipo de recurso: {row["TP_RECURSO"]}
        Reunião externa: {row["FLG_EXTERNO"]}
        Data de criação: {row["DT_CRIACAO"]}
        Participantes: {locutores_tratados}
        Quantidade de participantes: {len(locutores_tratados)}

        ==============================
        DADOS DO CLIENTE / UNIDADE
        ==============================
        UF: {row["UF"]}
        CNAE: {row["CNAE"]}
        Nome da unidade: {row["NOME_UNIDADE"]}
        Segmento: {row["NOME_SEGMENTO"]}
        Faixa de faturamento do cliente: {row["FAIXA_FATURAMENTO_CLIENTE_EC"]}
        Data da última pesquisa: {row["DT_ULTIMA_PESQUISA"]}
        Nota NPS: {row["NOTA_NPS"]}

        ==============================
        TRANSCRIÇÃO ANONIMIZADA
        ==============================
        {row["ANON_TRANSCRICAO"]}
        """
        
        reuniao_dict = {"ID": row["ID_MEETING"],
        "Data": row["DT_MEETING"],
        "Formato da reunião": row["FORMATO_MEETING"],
        "ID status da reunião": row["ID_STATUS_MEETING"],
        "Status": row["STATUS_MEETING"],
        "Duração": row["DURACAO_MEETING"],
        "CODT": row["CODT"],
        "Tipo de recurso": row["TP_RECURSO"],
        "Reunião externa": row["FLG_EXTERNO"],
        "Data de criação": row["DT_CRIACAO"],
        "UF": row["UF"],
        "CNAE": row["CNAE"],
        "Nome da unidade": row["NOME_UNIDADE"],
        "Segmento": row["NOME_SEGMENTO"],
        "Faixa de faturamento do cliente": row["FAIXA_FATURAMENTO_CLIENTE_EC"],
        "Data da última pesquisa": row["DT_ULTIMA_PESQUISA"],
        "Nota NPS": row["NOTA_NPS"],
        "Transcrição":row["ANON_TRANSCRICAO"],
        "Locutores":Locutores}
        
        textos_reunioes.append(contexto_reuniao.strip())
        
    return ("\n\n".join(textos_reunioes), reuniao_dict)


with open('ANON_transcricao.json', 'rb') as arquivo:
    dados = json.load(arquivo)


def montar_prompt(reuniao_tratada: str) -> str:

    with open("arquivo.txt", "w", encoding="utf-8") as f:
        f.write( f"""
Você é uma IA especialista em análise de reuniões de negócio, relacionamento com clientes, Customer Success e identificação de oportunidades comerciais.

Sua tarefa é analisar a transcrição anonimizada da reunião abaixo, considerando também os dados contextuais da reunião e do cliente.

Gere uma análise objetiva e estruturada contendo:

1. Resumo geral da reunião
2. Principais assuntos tratados
3. Dores, reclamações ou dificuldades mencionadas
4. Possíveis sinais de churn, cancelamento ou insatisfação
5. Possíveis oportunidades comerciais ou expansão de contrato
6. Nível de satisfação percebido do cliente
7. Relação entre a fala do cliente e a nota NPS, quando a nota estiver disponível
8. Pontos de atenção para o time comercial ou Customer Success
9. Próximas ações recomendadas
10. Trechos ou evidências da transcrição que justificam a análise

Regras obrigatórias:
- Não invente informações.
- Se não houver evidência suficiente, responda "Não identificado".
- Use somente as informações presentes na transcrição e nos dados da reunião.
- Não exponha dados sensíveis.
- Considere que a transcrição já está anonimizada.
- Responda em português do Brasil.
- Seja objetivo e organizado em tópicos.

Dados e transcrição da reunião:

{reuniao_tratada}
""")

reuniao_tratada, dict_reuniao = processar_json(json.dumps(dados))        
montar_prompt(reuniao_tratada)
