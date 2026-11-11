# Decisões · Vinicius Orefice refeito do zero

## O conceito em uma frase

**A LINHA.** Toda página é cortada pela linha de largada, e todo número é número de relógio.

A linha de largada é o território da marca. É onde o treino vira prova. Ela aparece como traço de giz em todas as telas, com marcadores de quilômetro (KM 00, KM 42, CHEGADA). A planilha de treino vira o sistema: linhas pautadas, numeração de etapa, relógio em fonte mono. Nada de fogo, nada de pincelada. A força vem da escala e do número, não do efeito.

## Por que serve a esta marca

A ideia-guia é "Treino é disciplina. Prova é recompensa." A linha diz isso sem frase de efeito: disciplina é a linha reta, a planilha, o pace repetido. Recompensa é cruzar a linha no dia da prova, com a equipe junto. O diferencial da assessoria é método com comunidade. A linha pertence aos dois: é do treinador (planilha) e da equipe (largada coletiva).

## Paleta

| Cor | Hex | Uso |
|---|---|---|
| Asfalto | `#101214` | Fundo escuro, player da esteira, cabeçalho |
| Papel de planilha | `#F2EEE3` | Fundo claro do site e do app |
| Amarelo-sinal | `#FFD400` | A linha, o número que importa, o aviso |
| Linha de pauta | `#D9D2BE` | Bordas e divisórias no papel |
| Tinta suave | `#4C4F4A` | Texto secundário |

Três cores e um papel. O laranja da águia aparece só no logo, nas cores em que vem. O amarelo-sinal é fita de largada e colete de alta visibilidade: cor de quem está na pista, não de academia. No player, amarelo sobre asfalto é o maior contraste possível. Um número importa por vez.

## Fontes

- **Archivo** (Google Fonts, OFL): títulos e texto. Peso 900, caixa alta, sem itálico, sem condensada. É o oposto da fonte atual da marca, de propósito.
- **IBM Plex Mono** (Google Fonts, OFL): todos os números. Pace, km/h, contagem, quilômetro, data. Largura fixa, leitura a um braço de distância.

## O que o app novo faz que o atual não faz

1. **Conversor com faixa de verdade.** Aceita 5:25 a 4:59 /km e mostra 11,1 a 12,0 km/h, com régua de velocidades vizinhas para tocar e ir direto.
2. **Montador com os três modelos reais do Vini** (FARTLEK Z4 400X200, FARTLEK Z3 300X500, 18KM RODAGEM Z2), com pace editável, etapa por distância ou por tempo, pace alvo ou faixa, e treino salvo no celular.
3. **Player que nunca surpreende.** Aviso 10 segundos antes de cada troca, com bipe, voz em pt-BR, vibração e flash. Etapa por distância vira tempo na velocidade escolhida. Pausar, pular, voltar e ajustar 0,1 km/h no meio do tiro.
4. **Card de fim de treino gerado na hora** (distância, tempo, etapas, data), para baixar e compartilhar no Instagram.
5. **Agenda com conta de dias de verdade.** "Faltam X dias" calculado da data de hoje, com os próximos sábados de treino presencial.
6. **Loja com foto de cada produto** e pedido pelo Instagram, sem preço inventado.
7. **Ranking em pódio** com dados de exemplo marcados.

## O que ficou de fora e por quê

- **Cupons de parceiros.** Não há parceiro nem cupom nos insumos. Inventar seria fabricar dado.
- **Preços na loja.** Não há preço nos insumos. A loja mostra o produto e chama para o Instagram.
- **Importar treino de print do TrainingPeaks.** Exige leitura de imagem no celular e quebra fácil. O montador cobre o uso real: montar uma vez, rodar com um toque.
- **Login e conta.** O app continua sem conta, como hoje. Treino salvo no `localStorage` do celular.
- **Biblioteca de animação e framework.** O site abre direto no navegador, sem build. CSS e JavaScript puros, com fonte do Google Fonts. Menos peça para quebrar, mais rápido no celular da esteira.

## Arquivos

- `site/index.html`: site e app na mesma página, com rota `#/app`.
- `site/style.css`: o KV inteiro.
- `site/app.js`: conversor, montador, player, agenda, loja, ranking e card.
- Imagens por caminho relativo: `../logos/`, `../fotos/`, `../loja/`.
