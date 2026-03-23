# LeafGuard

Sistema especialista para apoio ao diagnóstico inicial de doenças em plantas, construído com base de conhecimento em Prolog e integração com Python.

## Visão geral

O LeafGuard foi criado para transformar sinais observáveis no campo (sintomas nas folhas, frutos, caule, raízes e fatores ambientais) em hipóteses de doenças com nível de confiança.

Em vez de depender apenas de inspeção subjetiva, o projeto organiza conhecimento agronômico em regras explícitas de inferência, permitindo:

- padronizar triagem inicial de doenças;
- reduzir tempo entre observação do problema e tomada de decisão;
- apoiar pequenos produtores e equipes técnicas com um fluxo simples e reproduzível.

## Por que este projeto foi feito

Em contextos agrícolas, principalmente em pequenas propriedades, é comum enfrentar três dificuldades:

- sintomas parecidos entre doenças diferentes;
- acesso limitado e não imediato a diagnóstico especializado;
- risco de perda de produtividade por atraso na identificação correta da causa.

O LeafGuard foi feito para atacar exatamente esse gap de diagnóstico inicial:

- organiza conhecimento especializado em uma base consultável;
- combina sintomas + ambiente para priorizar hipóteses;
- oferece uma estimativa de confiança para ajudar na decisão;
- sugere sintomas adicionais para confirmação em campo.

Importante: o sistema é de apoio à decisão e não substitui laudo técnico, análise laboratorial ou recomendação agronômica oficial.

## O que ele resolve na prática

Com o LeafGuard, o usuário consegue:

- listar doenças possíveis a partir de sintomas observados;
- obter hipóteses mais prováveis considerando também fatores ambientais;
- entender quais sinais ainda faltam verificar para ganhar confiança no diagnóstico;
- consultar sintomas e ambiente associados a cada doença cadastrada.

Isso ajuda a priorizar próximas ações (inspeção complementar, isolamento de área, consulta técnica, coleta para análise etc.) com menos tentativa e erro.

## Arquitetura e funcionamento

O projeto tem dois blocos principais:

- Base de conhecimento em Prolog: contém sintomas, fatores ambientais, doenças e regras de inferência.
- API em Python: consulta a base Prolog e expõe métodos de uso para aplicações externas.

### 1) Base de conhecimento (Prolog)

A base em Prolog modela quatro tipos de informação:

- sintomas (ex.: manchas, murcha, deformações, podridão);
- fatores ambientais (ex.: alta umidade, chuva, presença de insetos);
- doenças por categoria (fúngicas, bacterianas, virais e por vermes/nematoides);
- relação entre doença, conjunto de sintomas esperados e ambiente associado.

Cada doença é representada como um fato com:

- nome da doença;
- tipo (fungal, bacterial, viral, verms);
- sintomas requeridos/esperados;
- fatores ambientais relacionados.

### 2) Regras de inferência

O mecanismo central compara a observação do usuário com os sintomas e o ambiente esperados para cada doença.

O cálculo de confiança segue este princípio:

$$
	ext{confiança final} = 0{,}7 \times \text{confiança dos sintomas} + 0{,}3 \times \text{confiança do ambiente}
$$

Onde:

- confiança dos sintomas = proporção de sintomas da doença encontrados na entrada;
- confiança do ambiente = proporção de fatores ambientais compatíveis;
- há um limiar mínimo para considerar a hipótese no resultado.

Além disso, existe um modo ponderado alternativo (compatibilidade retroativa) com corte padrão mais alto.

### 3) Camada Python

A classe principal em Python carrega a base Prolog e disponibiliza operações de alto nível, como:

- diagnóstico por sintomas e ambiente;
- diagnóstico ponderado;
- listagem de doenças possíveis apenas por sintomas;
- consulta de sintomas, tipo e ambiente de uma doença;
- listagem de todas as doenças da base;
- sugestão de sintomas adicionais para validação em campo.

A API também inclui tratamento de exceções para erros de carregamento e falhas de consulta.

## Escopo de conhecimento atual

O sistema contempla doenças em diferentes grupos etiológicos:

- fúngicas;
- bacterianas;
- virais;
- associadas a vermes/nematoides.

Também cobre sinais em diferentes partes da planta:

- folhas;
- caule e raízes;
- flores e frutos;
- sintomas de planta inteira.

Esse desenho foi pensado para refletir inspeção real de campo, que normalmente combina sinais de múltiplas partes da planta com contexto ambiental.

## Fluxo de uso recomendado

1. Registrar sintomas observados no campo.
2. Informar condições ambientais recentes.
3. Executar o diagnóstico.
4. Ordenar hipóteses por confiança.
5. Verificar sintomas sugeridos para confirmação.
6. Encaminhar para validação técnica quando necessário.

## Exemplo de uso pela API Python

```python
from plant_diagnosis import PlantDiagnoser

diagnoser = PlantDiagnoser("src/diagnoser.pl")

symptoms = [
	"symptom(leaf_yellowing)",
	"symptom(leaf_hanged_like_a_skirt)",
	"symptom(dark_internal_vessels_when_cut)"
]

environment = [
	"environmental(high_humidity)",
	"environmental(hotter_temperatures)"
]

results = diagnoser.diagnose(symptoms, environment, min_confidence=0.5)
print(results)
```

Observação: os identificadores devem ser compatíveis com os termos definidos na base de conhecimento Prolog.

## Como executar

Pré-requisitos:

- Python 3.9+;
- SWI-Prolog instalado no sistema;
- biblioteca `pyswip` disponível no ambiente Python.

Instalação típica:

```bash
pip install pyswip
```

Execução: utilize a classe `PlantDiagnoser` em scripts Python ou notebooks para consultar a base e obter os diagnósticos.

## Limitações e boas práticas

- O resultado depende da qualidade da observação de sintomas.
- Doenças com sinais muito semelhantes podem aparecer com confiança próxima.
- A base atual é fechada ao conjunto de doenças cadastradas.
- O sistema não substitui confirmação laboratorial.

Para melhores resultados:

- descreva sintomas de forma consistente;
- inclua fatores ambientais reais e recentes;
- use as sugestões de sintomas adicionais para reduzir ambiguidade.
