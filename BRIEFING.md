# Briefing · Vinicius Orefice, app de equipe e site

Este repositório guarda os insumos para refazer do zero o site e o app da assessoria Vinicius Orefice. Os arquivos aqui são públicos de propósito: o código gerado busca cada imagem pelo endereço do CDN (ver "Endereços dos arquivos", no fim).

## 1. Quem é o cliente
- Vinicius Orefice é uma assessoria esportiva de endurance de Bauru (SP). O treinador é José Vinícius Orefice (o Vini), profissional de Educação Física (UNESP), pós-graduado em Treinamento Personalizado (USP) e em Treinamento de Endurance.
- Atende do iniciante no 5K ao maratonista sub 3h. Mais de 280 alunos ativos (dado de jun/2026). Não invente outros números, depoimentos ou nomes.
- Serviços: treino presencial em grupo em Bauru (o local muda: Alphaville, trilha do IPMet, pista da Unesp), planilha individual no TrainingPeaks, avaliação e reavaliação, fortalecimento, suporte em provas (Casa do Atleta), palestras e projetos para empresas (Bracell Runners).
- Pilares: Performance · Bem-estar · Comunidade · Endurance.
- Instagram: @viniorefice_. Domínio: viniorefice.com.br.

## 2. O que a marca é (a ideia, não o visual)
- Ideia-guia: **Treino é disciplina. Prova é recompensa.**
- Território: a linha de largada e tudo o que leva até ela.
- Tensão: intensidade de pôster na forma, cuidado técnico de treinador formado no conteúdo.
- Diferencial: método com comunidade. Não é só planilha nem só grupo de corrida. O atleta não fica sozinho em nenhuma etapa.
- Recusa: visual de academia genérica, foto sorridente de banco de imagem, azul corporativo, tom de influencer motivacional ("você consegue!"), linguagem de venda ("venha conferir", "o melhor", "incrível", "soluções").

## 3. Voz
- Treinador firme no meio do treino. Frase curta, imperativa, com número de verdade.
- "Você" para o atleta; "a gente" para a equipe.
- Números em dígito: 21K, 4:30/km, sub 2h.
- Sem travessão. Sem emoji na interface. Exclamação só em conquista.
- Frases reais que podem ser usadas: "TREINO É DISCIPLINA. PROVA É RECOMPENSA." · "VOCÊ SÓ PENSA EM CORRER. A GENTE CUIDA DO RESTO." · "CONSTÂNCIA VENCE TALENTO." · "MAIS DO QUE FORMAR CORREDORES". Não invente tagline nova como se fosse oficial; proposta nova vai marcada como proposta.

## 4. O que é fixo e o que está livre
**Fixo (não mudar):**
- O logo e a águia. Use só os arquivos de `logos/`. Não redesenhe, não recolora fora das versões dadas, não distorça.
- O nome e a assinatura: VINICIUS OREFICE / ASSESSORIA ESPORTIVA DE ENDURANCE.
- Idioma: português do Brasil.

**Livre (o desafio):** o KV inteiro. Paleta, tipografia, grafismo, composição, tratamento de foto, movimento, arquitetura de informação e o desenho do app. A identidade atual (preto `#120000`, laranja `#FF3901`, fonte condensada itálica em caixa alta, pinceladas de fogo cruzadas em X) é o ponto de partida a superar, não a regra. Ver `referencias-v2-atual/`.
- A fonte Tungsten da marca não tem licença web. Use só fontes livres (Google Fonts ou similar).

## 5. O app que já existe (o que ele precisa fazer)
Hoje o site viniorefice.com.br é um app instalável no celular (PWA), sem login, para os alunos. As funções que precisam continuar existindo:

1. **Conversor:** pace (min/km) para km/h e o contrário, com 0,1 km/h de precisão. Aceita faixa de pace (ex.: 5:25 a 4:59 /km).
2. **Treinos:** o aluno monta o treino uma vez (aquecimento, blocos repetidos de tiro + recuperação, desaquecimento; cada etapa por distância ou por tempo, com pace alvo ou faixa). Também pode trazer o treino de um print do TrainingPeaks.
3. **Treino na esteira (player):** tela cheia, a velocidade atual enorme, contagem regressiva, a próxima velocidade, aviso antes de cada troca (bipe, voz em pt-BR, vibração, flash), tela sempre acesa, pausar e pular. Etapa por distância vira contagem por tempo na velocidade escolhida.
4. **Fim do treino:** card para compartilhar no Instagram.
5. **Equipe:** agenda (próximo treino presencial ou próxima prova com "Faltam X dias"), cupons de parceiros, loja (produtos em `loja/`), ranking mensal (pódio).

Formas reais de treino do Vini no TrainingPeaks:
- "FARTLEK Z4 400X200": 1 km aquecimento, 6x (400 m forte + 200 m leve), 1 km desaquecimento.
- "FARTLEK Z3 300X500": 1 km aquecimento, 3x (300 m + 500 m), 1 km desaquecimento.
- "18KM RODAGEM Z2": 1 km aquecimento, 16 km contínuo, 1 km desaquecimento.

Contexto de uso: celular apoiado no painel da esteira, mão suada, tela balançando, leitura a 50 a 80 cm, academia barulhenta. Esteira aceita km/h com passo de 0,1 e acelera devagar, então o aviso vem antes da troca.

Princípios:
1. Legível a um braço de distância correndo: um número importa por vez.
2. Nunca surpreender o corredor: toda troca é anunciada antes.
3. Monta uma vez, roda com um toque.
4. Funciona offline, em qualquer celular e esteira, sem conta.

## 6. Insumos neste repositório
| Pasta | O que é |
|---|---|
| `logos/` | logo horizontal, vertical e a águia (ícone), em versões preta, branca e completas; águia laranja; `fogo-base.jpg` é o grafismo atual |
| `fotos/` | Vini correndo (`vini-correndo-01/02`, `vini-editada`, `vini-recorte-sem-fundo.png`) e fotos da equipe em prova (`kv-*`, hoje em duotone vermelho da campanha SP City; pode tratar de outro jeito) |
| `loja/` | fotos dos produtos da loja (camisetas, regata, babylook) |
| `referencias-v2-atual/` | telas do app no ar hoje e o grafismo atual. É o que deve ser superado |

## 7. Endereços dos arquivos
Base do CDN: `https://cdn.jsdelivr.net/gh/vtmelchiades/vo-insumos@main/`
Exemplo: `https://cdn.jsdelivr.net/gh/vtmelchiades/vo-insumos@main/logos/logo-horizontal-white.png`
A lista completa está em `ARQUIVOS.txt`.
