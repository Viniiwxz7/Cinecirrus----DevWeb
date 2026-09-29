## Design Concept
O cenário é educacional técnico, voltado para aprendizado prático de um framework CSS. A âncora visual combina o design editorial da *Criterion Collection* (tipografia elegante com serifa, diagramação estruturada) com a documentação de tecnologia moderna (blocos de código limpos e contrastantes). A paleta evita o clichê de "cinema" (rolos de filme, claquetes) substituindo-o por uma estética de catálogo impressa: fundo de página em um tom de papel mineral claro para garantir a legibilidade pedagógica (regra do perfil educacional), texto em azul-noite profundo, e destaques em âmbar (remetendo aos letreiros de cinema) e ciano (para a sintaxe tecnológica). A voz tipográfica contrasta o requinte editorial das manchetes com a legibilidade utilitária do texto e do código.

## Visual Language
- **Imagery:** Minimalista e de suporte. Capturas de tela limpas da interface do CineCirrus e esquemas geométricos abstratos simulando os componentes. 
- **Containers:** Misto. Áreas de texto usam whitespace abundante (estilo editorial), enquanto blocos de código e componentes de exemplo vivem dentro de cartões com bordas arredondadas (estilo tech docs) usando fundo azul-noite.
- **Icons:** Sólidos e discretos, usados apenas para sinalizar categorias de componentes ou estados de alerta/atenção pedagógica.
- **Dataviz:** Tabelas de comparação com linhas horizontais finas em azul-noite; destaques de "vantagens" utilizam ícones e texto em âmbar; código usa ciano para palavras-chave.
- **Motif:** Uma linha superior fina de 3px, dividida em dois segmentos de cor (80% azul-noite, 20% âmbar), lembrando o corte de um ingresso de cinema minimalista, presente no topo de todas as páginas de conteúdo.

## Layout Directives
- **Global:** Margens de 48px. Alinhamento disciplinado à esquerda para leitura fluida. Motif posicionado no limite superior (top: 0). Paginação discreta no canto inferior direito.
- **Cover:** Fundo azul-noite total, título em tamanho display (âmbar e ciano), alinhamento centralizado com grande impacto visual.
- **TOC:** Ausente neste deck (conforme outline).
- **Section Dividers:** Fundo azul-noite, número da seção em ciano gigante, título em branco/papel.
- **Closing:** Espelho da capa, substituindo o título pelo convite à ação (demonstração).

| id | pattern | image | density |
|---|---|---|---|
| capa | cover dark cinema style | none | low |
| contexto | image-left text-right | supporting | medium |
| vantagens | two-column comparison table | none | medium-high |
| como_usar | text top, code bottom | none | medium |
| card_table | side-by-side component vs code | none | high |
| form_accordion | stacked examples with cards | none | medium-high |
| tabs_modal | side-by-side component vs code | none | high |
| projeto | large hero showcase + recap | hero | low |

## Design Tokens

| token | hex | usage |
|---|---|---|
| primary | `#0D1321` | Azul-noite: fundos de capa, bordas, e motif principal |
| bg-page | `#F4F1EA` | Off-white (papel): fundo padrão para as páginas de conteúdo |
| text-main | `#1D2D44` | Azul acinzentado escuro: texto principal e descrições |
| accent-amber | `#F5A623` | Âmbar: destaques pedagógicos, vantagens e detalhes do motif |
| accent-cyan | `#00B4D8` | Ciano: detalhes de código, ícones técnicos e nomes de classes |
| bg-code | `#1A2238` | Azul-noite suave: fundo dos cartões de código CSS/HTML |
| text-code | `#E0FBFC` | Ciano claríssimo: texto de código padrão |

| role | family | size (px) | applies_to |
|---|---|---|---|
| display | Playfair Display | 56 | Capa e títulos de seção principal |
| heading | Playfair Display | 32 | Títulos das páginas de conteúdo |
| body | Inter | 20 | Texto descritivo e listas (mínimo 18px) |
| code | Fira Code | 16 | Exemplos de classes e sintaxe HTML/CSS |
| caption | Inter | 14 | Notas de rodapé e paginação |

## Guardrails
- **Proibido fundos escuros em páginas de conteúdo:** A legibilidade em projeção exige fundos claros; o azul-noite é restrito a capas e blocos de código isolados.
- **Proibido imagens literais de cinema:** Sem pipoca, película de filme ou claquetes; a estética de cinema vem da tipografia e paleta.
- **Proibido blocos de código gigantes:** Qualquer código deve focar apenas nas classes Cirrus específicas, omitindo o boilerplate desnecessário.
- **Proibido texto centralizado no corpo:** Todo texto de parágrafo deve ser rigorosamente alinhado à esquerda.
