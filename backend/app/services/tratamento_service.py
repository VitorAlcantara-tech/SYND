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
    "FAIXA_FATURAMENTO_CLIENTE",
    "DT_ULTIMA_PESQUISA",
    "NOTA_NPS",
]


def processar_arquivo(nome_arquivo: str, conteudo: bytes) -> str:
    """
    Recebe o arquivo enviado pelo front-end e identifica se é JSON, CSV ou TXT.
    Retorna um texto tratado pronto para ser usado no prompt.
    """

    nome_arquivo = nome_arquivo.lower()

    if nome_arquivo.endswith(".json"):
        return processar_json(conteudo)

    if nome_arquivo.endswith(".csv"):
        return processar_csv(conteudo)

    if nome_arquivo.endswith(".txt"):
        return processar_txt(conteudo)

    raise ValueError("Formato de arquivo não suportado. Envie .json, .csv ou .txt.")


def processar_json(conteudo: bytes) -> str:
    try:
        dados_json = json.loads(conteudo.decode("utf-8"))
    except Exception:
        raise ValueError("Não foi possível ler o arquivo JSON.")

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


def processar_csv(conteudo: bytes) -> str:
    try:
        texto = conteudo.decode("utf-8")
    except UnicodeDecodeError:
        texto = conteudo.decode("latin-1")

    try:
        df = pd.read_csv(io.StringIO(texto))
    except Exception:
        try:
            df = pd.read_csv(io.StringIO(texto), sep=";")
        except Exception:
            raise ValueError("Não foi possível ler o arquivo CSV.")

    return processar_dataframe(df)


def processar_txt(conteudo: bytes) -> str:
    try:
        texto = conteudo.decode("utf-8")
    except UnicodeDecodeError:
        texto = conteudo.decode("latin-1")

    texto = texto.strip()

    if not texto:
        raise ValueError("O arquivo TXT está vazio.")

    texto_tratado = f"""
==============================
TRANSCRIÇÃO EM TEXTO PURO
==============================
{texto}
"""

    return texto_tratado.strip()


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
        Nota NPS: {row["NOTA_NPS"]} (De 1 a 5)

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
        "Transcrição":row["ANON_TRANSCRICAO"]}
        
        textos_reunioes.append(contexto_reuniao.strip())
        
    return ("\n\n".join(textos_reunioes), reuniao_dict)