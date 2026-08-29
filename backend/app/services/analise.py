import json
import re
import pandas as pd
import nltk
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np

nltk.download('stopwords', quiet=True)

# Carregamento do arquivo — formato JSONL (uma linha por registro)
records = []
with open('ANON_transcricao.json', 'r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if line:
            records.append(json.loads(line))

df = pd.DataFrame(records)
print(f"Total de registros: {len(df)}")
print(f"Colunas: {list(df.columns)}")
# Exemplo de transcrição original (primeiros 400 caracteres)
print(df['ANON_TRANSCRICAO'].iloc[0][:400])
STOPWORDS_PT = set(stopwords.words('portuguese'))

# Stopwords adicionais específicas do domínio
STOPWORDS_EXTRA = {
    'tá', 'né', 'sim', 'então', 'aí', 'isso', 'esse', 'essa',
    'aqui', 'assim', 'vai', 'vou', 'bem', 'lá', 'já', 'só',
    'também', 'pode', 'tem', 'pra', 'pro', 'pessoa', 'empresa', 'locutor'
}
STOPWORDS = STOPWORDS_PT | STOPWORDS_EXTRA


def limpar_texto(texto):
    texto = texto.lower()                                      # 1. lowercase
    texto = re.sub(r'\[.*?\]', ' ', texto)                   # 2. remove tags
    texto = re.sub(r'[^a-záàâãéêíóôõúüç\s]', ' ', texto)    # 3. remove pontuação
    texto = re.sub(r'\s+', ' ', texto).strip()                # 4. espaços extras
    tokens = [t for t in texto.split()
              if t not in STOPWORDS and len(t) > 2]            # 5. stopwords e tokens curtos
    return ' '.join(tokens)


df['TEXTO_LIMPO'] = df['ANON_TRANSCRICAO'].apply(limpar_texto)

print("=== Antes da limpeza ===")
print(df['ANON_TRANSCRICAO'].iloc[0][:300])
print()
print("=== Depois da limpeza ===")
print(df['TEXTO_LIMPO'].iloc[0][:300])
# Comparativo de tamanho antes e depois
df['TAM_ORIGINAL'] = df['ANON_TRANSCRICAO'].apply(len)
df['TAM_LIMPO']    = df['TEXTO_LIMPO'].apply(len)
df['REDUCAO_PCT']  = ((df['TAM_ORIGINAL'] - df['TAM_LIMPO']) / df['TAM_ORIGINAL'] * 100).round(1)

print("=== Impacto da limpeza ===")
print(df[['TAM_ORIGINAL', 'TAM_LIMPO', 'REDUCAO_PCT']].describe().round(1))

vectorizer = TfidfVectorizer(
    max_features=2000,
    min_df=5,
    max_df=0.9,
    sublinear_tf=True
)

matriz_tfidf = vectorizer.fit_transform(df['TEXTO_LIMPO'])
vocabulario  = vectorizer.get_feature_names_out()

print(f"Dimensões da matriz TF-IDF: {matriz_tfidf.shape}")
print(f"  → {matriz_tfidf.shape[0]} reuniões × {matriz_tfidf.shape[1]} termos")
# Visualizando um recorte da matriz (5 reuniões × 10 termos)
df_matriz = pd.DataFrame(
    matriz_tfidf[:5, :10].toarray(),
    columns=vocabulario[:10],
    index=[f'Reunião {i+1}' for i in range(5)]
)
print("=== Recorte da Matriz TF-IDF ===")
print(df_matriz.round(4))
# Termos mais relevantes no corpus geral (maior peso médio)
pesos_medios = np.asarray(matriz_tfidf.mean(axis=0)).flatten()
df_termos = pd.DataFrame({'termo': vocabulario, 'peso_medio': pesos_medios})
df_termos = df_termos.sort_values('peso_medio', ascending=False)

print("=== Top 20 Termos Mais Relevantes ===")
print(df_termos.head(20).to_string(index=False))