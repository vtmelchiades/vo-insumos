# Tarefa para o agente

Leia este arquivo inteiro, depois `BRIEFING.md`. Os dois juntos são o briefing completo.

## Quem você é neste trabalho
Você é o diretor de criação, o designer de produto e o engenheiro front-end deste projeto, tudo ao mesmo tempo. Você é o dono do design e do código deste repositório, e as decisões são suas. Não existe código para preservar: o site e o app começam do zero.

## O desafio
Refaça do zero o site e o app da Vinicius Orefice, uma assessoria esportiva de endurance de Bauru (SP). Já existe uma versão no ar: as telas estão em `referencias-v2-atual/`. Ela funciona, mas o visual é previsível: preto, laranja, fonte condensada itálica e pinceladas de fogo. Crie um KV novo, que faça um corredor sentir que essa equipe é diferente de qualquer assessoria que ele já viu. Não repita a identidade atual. Supere.

Critério de sucesso: um diretor de arte de agência olha e quer ter feito; um aluno de 50 anos, suado, na esteira, usa o app sem óculos.

## O que é fixo
- O logo e a águia: use só os arquivos de `logos/`, nas cores em que vêm. Não redesenhe, não recrie em SVG, não distorça.
- Nome e assinatura: VINICIUS OREFICE / ASSESSORIA ESPORTIVA DE ENDURANCE.
- Português do Brasil em todo o texto.
- Só fontes livres (Google Fonts ou fontes com licença OFL). A fonte atual da marca não tem licença web.
- Não invente números, depoimentos, nomes de aluno nem parceiros. Dados de exemplo aparecem marcados como exemplo.
- Não apague nem altere `logos/`, `fotos/`, `loja/`, `referencias-v2-atual/`, `BRIEFING.md` e `ARQUIVOS.txt`.

Todo o resto está livre: paleta, tipografia, grafismo, tratamento de foto, composição, movimento, arquitetura de informação.

## O que entregar
Tudo dentro da pasta `site/`, num site estático que roda abrindo `site/index.html` no navegador, sem passo de build. Pode usar React, Tailwind e bibliotecas de animação por CDN. Referencie as imagens por caminho relativo (`../logos/...`, `../fotos/...`, `../loja/...`). Se preferir um projeto com build (Vite), deixe também o resultado compilado em `site/` para abrir direto.

**1. Site (`site/index.html`, ou rota `#/`)**: a página de apresentação da assessoria. Hero com o KV novo, método (anamnese, avaliação, planejamento, feedback, reavaliação), treinos presenciais, provas e Casa do Atleta, empresas, a loja e um chamado para treinar (botão para o Instagram @viniorefice_). Ótimo no celular e com presença no desktop.

**2. App (rota `#/app` ou `site/app.html`)**: o app dos alunos, primeiro para o celular, com a lógica funcionando de verdade:
- **Conversor:** pace (min/km) para km/h e o contrário, com 0,1 km/h de precisão. Aceita faixa de pace (ex.: 5:25 a 4:59 /km) e mostra a faixa em km/h.
- **Montador de treino:** aquecimento, um ou mais blocos repetidos (tiro + recuperação, N vezes), desaquecimento. Cada etapa por distância ou por tempo, com pace alvo ou faixa. Treinos salvos no `localStorage`. Venha com os três modelos reais do `BRIEFING.md` (seção 5), com paces plausíveis e editáveis.
- **Treino na esteira (player):** tela cheia; a velocidade atual em km/h enorme; contagem regressiva da etapa; a próxima velocidade; aviso 10 s antes de cada troca com bipe (Web Audio), voz em pt-BR (speechSynthesis), vibração e flash; tela acesa (Wake Lock); pausar, pular e voltar. Etapa por distância vira tempo na velocidade escolhida.
- **Fim do treino:** um card bonito do treino feito, para print e compartilhar no Instagram.
- **Equipe:** agenda (o próximo compromisso no alto, com "Faltam X dias" calculado da data de hoje), loja com os produtos de `loja/` e ranking mensal em pódio, com dados de exemplo marcados.

Contexto de uso do app: celular no painel da esteira, mão suada, tela balançando, leitura a 50 a 80 cm, academia barulhenta. Um número importa por vez. Alvos de toque grandes. Contraste alto. Nenhuma troca de velocidade pega o corredor de surpresa.

**3. `site/DECISOES.md`**: para um diretor de arte que não viu seu processo. O conceito do KV em uma frase e por que serve a esta marca; paleta (hex) e fontes; o que o app novo faz que o atual não faz; o que ficou de fora e por quê. Frases curtas, palavras simples.

## Como trabalhar
1. Antes de escrever código, olhe as fotos, os logos e as telas atuais. Decida o conceito: uma ideia visual forte que nasce do território da marca (a linha de largada, a disciplina, a equipe que aparece no dia da prova), não de uma tendência genérica. Aplique essa ideia com rigor no site e no app, para que pareçam do mesmo mundo.
2. Construa. Teste a lógica do conversor e do player (os cálculos de pace e km/h precisam bater). Se puder abrir o site num navegador, confira em 375 px e em 1440 px e corrija o que estiver quebrado.
3. Faça commit no seu branch de trabalho e abra o pull request com um resumo curto do que fez.

## Terminar o trabalho
Não pare enquanto faltar parte do que foi pedido. Não deixe "TODO" nem troque uma função por um texto dizendo que ela existiria. Se encontrar um obstáculo comum (erro, timeout, imagem que não carrega, ferramenta que falha), descubra a causa e contorne com o que você tem: tente de novo, use outro caminho, siga sem o recurso. Não pergunte se pode continuar: continue até a entrega estar completa. Se uma imagem não carregar, o layout precisa continuar de pé.

## Comunicação
Antes de começar, diga em uma linha o que vai fazer. Durante o trabalho, dê uma atualização curta de vez em quando. No fim, escreva um resumo que se sustente sozinho: o que você fez, onde está cada coisa e o que ficou de fora. Escreva para um leitor inteligente que não viu suas chamadas de ferramenta: frases curtas, palavras simples, sem termos que você inventou durante o trabalho.
