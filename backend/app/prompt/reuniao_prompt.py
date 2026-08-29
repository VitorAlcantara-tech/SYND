def montar_prompt(transcricao_tratada: str) -> str:
    return f"""
Você é uma IA especialista em análise de reuniões de negócio, relacionamento com clientes, Customer Success e identificação de oportunidades comerciais.

Sua tarefa é analisar a transcrição anonimizada da reunião abaixo, considerando também os dados contextuais da reunião e do cliente fornecidos.

Gere uma análise objetiva e estruturada, preenchendo o JSON abaixo:

  "resumo_geral": "string",
  "principais_assuntos": "string",
  "dores": ["dict(texto: string, trecho: string | null)"],
  "oportunidades": ["dict(texto: string, trecho: string | null)"],
  "risco_churn": "baixo | medio | alto",
  "evidencias_churn": ["dict(texto: string, trecho: string | null)"],
  "sentimento": 0.0,
  "tarefas": ["dict(nome: string, data_prevista: string | null, trecho: string | null)"]

Dicionário de dados:
- resumo_geral: Resumo geral da reunião, máximo de 5 linhas
- principais_assuntos: Principais assuntos tratados
- dores: Lista de dores, reclamações ou dificuldades mencionadas. Cada item é um dict com:
  - texto: a dor resumida em uma frase curta e objetiva
  - trecho: citação verbatim da transcrição que comprova essa dor específica (ou null se não houver trecho claro o suficiente para citar)
- oportunidades: Lista de possíveis oportunidades comerciais, expansão de contrato ou melhoria no relacionamento. Cada item é um dict com:
  - texto: a oportunidade resumida em uma frase curta e objetiva
  - trecho: citação verbatim da transcrição que comprova essa oportunidade específica (ou null se não houver trecho claro o suficiente para citar)
- risco_churn: Percepção de possibilidade de desistência do cliente ("baixo", "medio" ou "alto")
- evidencias_churn: Lista de sinais que indicam risco de churn. Cada item é um dict com:
  - texto: o sinal de risco resumido em uma frase curta e objetiva
  - trecho: citação verbatim da transcrição que comprova esse sinal específico (ou null se não houver trecho claro o suficiente para citar, por exemplo quando o sinal vem do NPS/dados contextuais em vez da conversa)
- sentimento: Nível de satisfação percebido do cliente, de 0 a 10
- tarefas: Próximas ações recomendadas. Cada item é um dict com:
  - nome: descrição da tarefa
  - data_prevista: data prevista para entrega da tarefa(ou null se não houver)
  - trecho: citação verbatim da transcrição que originou essa tarefa (ou null se não houver trecho claro o suficiente para citar)

Regras obrigatórias:
- Cada "trecho" deve ser uma citação literal e contínua da transcrição (não parafraseada, não combinada de partes distintas). Se não existir um trecho único que comprove o item com clareza, use null em vez de inventar ou forçar uma citação.
- Não crie um item de dor/oportunidade/evidência de churn/tarefa sem uma frase objetiva em "texto" — "trecho" é sempre complementar, nunca o único conteúdo do item.
- Use a Nota NPS e a Data da última pesquisa, quando disponíveis, como evidência complementar para calibrar `risco_churn` e `sentimento` — uma nota baixa ou desatualizada reforça atenção ao risco mesmo que o tom da conversa pareça neutro. Se não houver NPS disponível, baseie-se apenas na transcrição.
- Considere a Faixa de Faturamento e o Segmento do cliente como contexto para avaliar a relevância das oportunidades identificadas.
- A transcrição pode conter ruído de diarização (rótulos de locutor incorretos, fragmentos soltos, texto cortado). Ignore fragmentos sem sentido semântico e interprete o conteúdo da conversa como um todo, sem forçar atribuição perfeita por locutor.
- Se o responsável por uma tarefa não estiver claro devido a mascaramento ou ambiguidade na transcrição, não adivinhe: descreva a tarefa sem nome de responsável.
- Não invente informações.
- Se não houver evidência suficiente, use lista vazia [] nos campos de lista.
- Use somente as informações presentes na transcrição e nos dados fornecidos.
- Considere que a transcrição já está anonimizada.
- Responda em português do Brasil.
- Devolva APENAS o JSON válido, sem texto antes ou depois, sem markdown, sem ```.

Dados e transcrição da reunião:


{transcricao_tratada}
"""