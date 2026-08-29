def montar_prompt(transcricao_tratada: str) -> str:
    return f"""
Você é uma IA especialista em análise de reuniões de negócio, relacionamento com clientes, Customer Success e identificação de oportunidades comerciais.

Sua tarefa é analisar a transcrição anonimizada da reunião abaixo, considerando também os dados contextuais da reunião e do cliente fornecidos.

Gere uma análise objetiva e estruturada, preenchendo o JSON abaixo:

  "resumo_geral": "string",
  "principais_assuntos": "string",
  "dores": "string",
  "trechos_chave_dores": ["string"],
  "oportunidades": "string",
  "trechos_chave_oportunidades": ["string"],
  "risco_churn": "baixo | medio | alto",
  "evidencias_churn": ["string"],
  "sentimento": 0.0,
  "tarefas": ["dict(nome": "string", "data_prevista": "string)"],
  "trechos_chave_tarefas": ["string"]


Dicionário de dados:
- resumo_geral: Resumo geral da reunião, máximo de 5 linhas
- principais_assuntos: Principais assuntos tratados
- dores: Dores, reclamações ou dificuldades mencionadas
- trechos_chave_dores: Trechos ou evidências da transcrição que justificam as dores
- oportunidades: Possíveis oportunidades comerciais, expansão de contrato ou melhoria no relacionamento
- trechos_chave_oportunidades: Trechos ou evidências da transcrição que justificam oportunidades de venda
- risco_churn: Percepção de possibilidade de desistência do cliente ("baixo", "medio" ou "alto")
- evidencias_churn: Trechos ou evidências da transcrição que demonstrem possibilidade de churn
- sentimento: Nível de satisfação percebido do cliente, de 0 a 10
- tarefas: Próximas ações recomendadas, cada uma com nome e data prevista (ou null se não houver)
- trechos_chave_tarefas: Trechos ou evidências da transcrição que geraram as tarefas

Regras obrigatórias:
- Use a Nota NPS e a Data da última pesquisa, quando disponíveis, como evidência complementar para calibrar `risco_churn` e `sentimento` — uma nota baixa ou desatualizada reforça atenção ao risco mesmo que o tom da conversa pareça neutro. Se não houver NPS disponível, baseie-se apenas na transcrição.
- Considere a Faixa de Faturamento e o Segmento do cliente como contexto para avaliar a relevância das oportunidades identificadas.
- A transcrição pode conter ruído de diarização (rótulos de locutor incorretos, fragmentos soltos, texto cortado). Ignore fragmentos sem sentido semântico e interprete o conteúdo da conversa como um todo, sem forçar atribuição perfeita por locutor.
- Se o responsável por uma tarefa não estiver claro devido a mascaramento ou ambiguidade na transcrição, não adivinhe: descreva a tarefa sem nome de responsável.
- Não invente informações.
- Se não houver evidência suficiente, use "Não identificado" (ou lista vazia [] nos campos de lista).
- Use somente as informações presentes na transcrição e nos dados fornecidos.
- Considere que a transcrição já está anonimizada.
- Responda em português do Brasil.
- Devolva APENAS o JSON válido, sem texto antes ou depois, sem markdown, sem ```.

Dados e transcrição da reunião:


{transcricao_tratada}
"""