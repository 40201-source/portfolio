# AGENTS.md — Diretrizes para Antigravity & Futuros Desenvolvedores
## Projeto: Pink Diary — Ivy's Creative World

Este documento orienta agentes de IA e desenvolvedores que venham a manter ou expandir o portfólio da Ivy Oliveira.

---

### 1. Filosofia do Projeto
- **Sem Template de IA Genérico:** Nunca substitua a identidade autoral por designs genéricos com gradientes azuis/roxos corporativos, cards centralizados idênticos ou textos de marketing vazios.
- **Fidelidade aos Projetos Reais:** Os 3 projetos publicados (Turno da Madrugada, Chioriya Boutique e Consultoria Reigen) são reais. Nunca invente dados técnicos, métricas fictícias ou linguagens que não tenham sido confirmadas nos sites oficiais.
- **Tecnologias Obrigatórias:** HTML5 puro, CSS3 puro e Vanilla JavaScript puro. Não introduzir frameworks pesados (React, Vue, Tailwind, etc.) na raiz do portfólio, preservando o formato de trabalho escolar de TI.

---

### 2. Estrutura de Arquivos
```text
portfolio/
├── assets/
│   ├── icons/
│   │   └── ribbon_bow.svg          # Ícone decorativo de laço scrapbook
│   ├── mascot/
│   │   ├── pinky.svg               # Vetor SVG original do mascote Pinky
│   │   └── pinky_card.jpg          # Ilustração polaroid do mascote Pinky
│   ├── projects/
│   │   ├── turno_cam1.jpg          # Imagem real: feed CAM 01 Turno da Madrugada
│   │   ├── turno_shadow.jpg        # Imagem real: anomalia na CAM 01
│   │   ├── turno_cam2.jpg          # Imagem real: feed CAM 02 Administração
│   │   ├── chioriya_logo.png       # Logotipo real de Chioriya Boutique
│   │   ├── chioriya_yelan.jpg      # Skin real do catálogo
│   │   ├── chioriya_ayaka.jpeg     # Skin real do catálogo
│   │   ├── chioriya_ningguang.jpg  # Skin real do catálogo
│   │   └── reigen_preview.jpg      # Preview temático Agência Espírita Reigen
│   └── ivy_avatar.jpg              # Avatar ilustrado da estudante Ivy
├── index.html                      # Estrutura semântica do portfólio (5 seções)
├── style.css                       # Sistema de design, tokens, scrapbook e responsividade
├── script.js                       # Motor de interatividade, áudio web, mascote e guestbook
├── identidade.md                   # Documentação da identidade visual e paleta
├── funcionalidades.md              # Especificação de todos os componentes funcionais
├── referencias.md                  # Análise técnica e links dos 3 projetos reais
└── AGENTS.md                       # Este guia para agentes e manutenção
```

---

### 3. Convenções de Cores & Tokens
- Fundo principal: `#FFF0F5`
- Rosa pastel: `#F6B8CD`
- Rosa médio: `#E889AA`
- Vinho principal: `#741F43`
- Vinho escuro (texto): `#351421`
- Fundo de cartões: `#FFFAFC`

---

### 4. Checklist para Edições
1. Respeitar `prefers-reduced-motion` no CSS.
2. Garantir navegação por teclado (foco visível com `:focus-visible`).
3. Manter sanitização em inputs com `escapeHTML` no JavaScript.
4. Testar responsividade tanto em desktop quanto em telas móveis estreitas (390px).
