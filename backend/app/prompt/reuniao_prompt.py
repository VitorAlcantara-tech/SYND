def montar_prompt(transcricao_tratada: str) -> str:
    return f"""
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

{transcricao_tratada}
"""