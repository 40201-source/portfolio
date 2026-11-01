# Pink Diary — Funcionalidades e Interatividades
## Especificação Técnica de Componentes

### 1. Visão Geral das Tecnologias
- **Padrão Técnico:** HTML5 Semântico, Vanilla CSS e Vanilla JavaScript (ES6+).
- **Dependências Externas:** Nenhuma biblioteca ou framework de terceiros foi adicionado. O projeto roda 100% nativamente em qualquer navegador moderno.
- **Fontes Utilizadas:** Google Fonts (`Quicksand`, `Inter`, `Patrick Hand`) com fallbacks nativos robustos.

---

### 2. Componentes e Interatividades

#### 2.1 Mascote Pinky (Hero & Widget Flutuante)
- **Vetor SVG Original:** Desenhado em vetor com camadas separadas para corpo, cauda, orelhas, laço com coração dourado e expressões faciais.
- **Ciclo de Mensagens:** Ao clicar no mascote (seja na polaroid do Hero ou no widget fixo no canto inferior direito), Pinky profere falas acolhedoras e comentários sobre os projetos.
- **Animações Reativas:** Piscadela com olhos felizes em SVG (`dock-eyes-happy`), movimento de balanço de cauda e orelhas.
- **Áudio Procedural Suave:** Chime harmônico sintetizado via Web Audio API (sem arquivos MP3 externos).
- **Acessibilidade & Mobile:** Botão de minimizar (`−`) para que o mascote não cubra textos ou botões em telas pequenas.

#### 2.2 Easter Egg — Segredinho do Pink Diary
- **Ativação:** 5 cliques seguidos no botão de coração do cabeçalho (`#btn-heart-easter-egg`).
- **Comportamento:** Apresenta um modal estilo carta de diário com envelope animado, mensagens carinhosas e adesivos.
- **Fechamento:** Botão de fechar, clique fora do modal ou tecla `Esc`.

#### 2.3 Alternância de Câmeras no Card de "Turno da Madrugada"
- **Seletor Interativo:** Botões CAM 1, CAM 1 [ANOMALIA] e CAM 2 permitem inspecionar as imagens reais do circuito fechado de segurança.
- **Efeito Visual:** Efeito de glitch e varredura CRT ao alternar canais, com som mecânico de relé analógico via Web Audio API.

#### 2.4 Modal de Detalhes Técnicos (Ficha Técnica dos Projetos)
- **Acionamento:** Botão "Ver Ficha Técnica" em qualquer um dos 3 cards de projetos.
- **Conteúdo Dinâmico:** Injeta a descrição aprofundada, lista de recursos reais verificados no site, stack de tecnologias e notas autorais.
- **Segurança de Links:** Todos os links externos abrem em nova aba com `target="_blank" rel="noopener noreferrer"`.

#### 2.5 Mural de Recadinhos Interativo (Guestbook em LocalStorage)
- **Armazenamento:** Salvo diretamente no navegador do visitante via `localStorage` com a chave `pink_diary_guest_notes`.
- **Prevenção de XSS:** Função `escapeHTML` para higienização completa de nomes e mensagens.
- **Adesivos Personalizáveis:** Coração (♡), Laço (🎀), Estrela (✨) e Gatinho (🐾).
- **Semente Padrão:** Mensagem de boas-vindas do Pinky pré-carregada caso a lista esteja vazia.
- **Gerenciamento:** O visitante pode adicionar novos recados ou remover os que desejar.

#### 2.6 Copiar E-mail com Feedback Visual
- **Comportamento:** Botão no card de contato copia `ivyoliveiram@gmail.com` para o clipboard usando `navigator.clipboard.writeText` (com fallback para `execCommand`).
- **Feedback:** Altera o botão para "Copiado! ✓" e exibe notificação toast flutuante.

#### 2.7 Botão Voltar ao Topo & Menu Mobile
- **Voltar ao Topo:** Surge suavemente quando a página é rolada além de 320px. Ao clicar, executa a transição do diário mágico de volta ao início (`#hero`).
- **Menu Mobile:** Hambúrguer acessível com atributos `aria-expanded` e `aria-controls`, fechando automaticamente ao clicar em qualquer link de navegação.

#### 2.8 Transição de Tela de Diário Mágico (Page Turn Transition)
- **Conceito:** Efeito visual de passagem de página entre seções (Sobre Mim, Projetos, Processo, Contato, Início), simulando a exploração de um diário encantado com estética de scrapbook.
- **Estrutura Visual:** Abas duplas de papel creme com textura de pontilhado pastel, linhas de pauta de caderno, fitas washi tape nos cantos, costura e vinco sombreado no centro.
- **Selo Central:** Cartão com moldura vinho e pontilhada, laço fofo (`ribbon bow`) em SVG, estrelinhas flutuantes e o nome da seção de destino (ex.: *Galeria de Projetos ♡*, *Sobre Mim ♡*, *Vamos Conversar ♡*).
- **Sincronização:** Cobertura suave em ~380ms, salto instantâneo de scroll compensando a altura do cabeçalho fixo, atualização da URL hash no histórico (`pushState` e `popstate`), animação de abertura em leque (~400ms) e entrada suave (`section-entering`). Duração total em torno de 800ms.
- **Áudio Procedural:** Chime arpejado ascendente delicado sintetizado via Web Audio API nativo (`playPageTurnChime`).
- **Proteções & Acessibilidade:** Bloqueio contra cliques simultâneos (`isTransitioning`), respeito integral a `prefers-reduced-motion: reduce`, navegação por teclado preservada com foco programático acessível e total compatibilidade com o sistema de conquistas e mascote Pinky.

#### 2.9 Camada de Efeitos Visuais Ligados à Rolagem (Scroll-Driven Effects)
- **Fita Marcadora do Diário (Scroll Progress):** Fita acetinada na base do cabeçalho fixo com barra de progresso em gradiente rosa-vinho e um lacinho deslizante (`🎀`) que acompanha continuamente a leitura de 0% a 100%. Suporta nativamente CSS `animation-timeline: scroll()` com fallback fluido em Vanilla JS (`requestAnimationFrame`).
- **Parallax Delicado de Scrapbook:** Microdeslocamentos orgânicos em adesivos, estrelas cintilantes, fitas washi tape e bilhete de post-it com leve oscilação de ângulo ao folhear a página.
- **Trilha de Descoberta dos Projetos:** Barra de marcos (`01 // CFTV`, `02 // Vitrine`, `03 // Paranormal`) que destaca dinamicamente o projeto em foco conforme o leitor desliza pela galeria.
- **Detalhe Surpresa Secreto — Peekaboo Pinky 🐾:** Um Pinky ilustrado em miniatura espia curiosamente da margem lateral da página durante a rolagem pela seção de Processo Criativo, exibindo uma bolha de coração e reagindo a cliques/toques com saltinho e chime sonoro.
- **Selo Final do Diário:** Marcador de página estilo fita e carimbo "Fim do Volume 1" revelado ao aproximar-se do final da página de Contato.
- **Preservação de Desempenho:** Rolagem 100% nativa sem bloqueios, sem scroll-snapping, com desativação graciosa sob `prefers-reduced-motion: reduce`.
