# Pink Diary — Projetos Reais da Ivy Oliveira
## Análise Técnica e Referências Autênticas

Este documento reúne a verificação técnica dos três projetos reais publicados pela Ivy e apresentados no portfólio. Nenhuma funcionalidade ou métrica foi inventada.

---

### Projeto 1 — Turno da Madrugada
- **Endereço Oficial:** [https://terror-gold.vercel.app/](https://terror-gold.vercel.app/)
- **Gênero:** Terror psicológico / Simulador de central de monitoramento CFTV.
- **Identidade Visual:** Fundo escuro (#030406), verde fosfórico de fósforo CRT (#38EF7D), vermelho de alerta (#EF4444), linhas de varredura (scanlines), ruído estático em canvas e vinheta analógica.
- **Funcionalidades e Elementos Verificados:**
  1. **Matriz de Câmeras (CAM 01 a 05):**
     - CAM 01 — Corredor Leste (sombras distantes)
     - CAM 02 — Administração (silhueta na janela sob chuva)
     - CAM 03 — Subsolo Inundado (criatura humanoide emaciada)
     - CAM 04 — Quarto 4 (Room 13)
     - CAM 05 — Central de Segurança (stalker)
  2. **Sistema de Anomalias:** Botão "REPORTAR ANOMALIA" com feedback OSD no monitor.
  3. **Medidor de Tensão:** Barra de instabilidade do sistema com cálculo de falsos alarmes (máx 4).
  4. **Motor de Áudio Procedural:** Criado 100% nativamente em JavaScript com a Web Audio API (zumbido elétrico de 58Hz, tape hiss, batimentos cardíacos procedurais e screeches).
  5. **Progressão Temporal:** Sobrevivência das 03:00 até às 04:00 AM com tela de jumpscare e epílogo de vitória.

---

### Projeto 2 — Chioriya Boutique
- **Endereço Oficial:** [https://chioriya-boutique.vercel.app/](https://chioriya-boutique.vercel.app/)
- **Página de Catálogo:** [https://chioriya-boutique.vercel.app/home.html](https://chioriya-boutique.vercel.app/home.html)
- **Gênero:** Interface Web / Vitrine temática de moda e skins de jogos.
- **Identidade Visual:** Estética elegante e estilosa inspirada na personagem Chiori, tons dourados e seda suave, logotipo próprio da marca.
- **Funcionalidades e Elementos Verificados:**
  1. **Fluxo de Autenticação:**
     - Tela de Cadastro com campos de usuário, e-mail, senha e confirmação de senha.
     - Tela de Login com campos de e-mail e senha.
     - Alternância dinâmica entre formulários ("Já tem conta? Entre!" / "Não tem conta? Crie uma!").
  2. **Catálogo de Skins (home.html):**
     - Menu com abas: Skins, Promoções, Ajuda.
     - *Genshin Impact:* Yelan (Tranquil Banquet), Ningguang (Orchid's Evening Gown), Jean (Sea Breeze Dandelion), Klee (Blossoming Starlight), Ayaka (Springbloom Missive).
     - *Honkai: Star Rail:* March 7th (Nascent Spring), Sparkle (Candy-Coated Waves), Firefly (Spring Missive), Ruan Mei (Plumblossom Letter), Castorice (Gossamer Flutter).

---

### Projeto 3 — Agência Espírita Reigen (Consultoria Paranormal)
- **Endereço Oficial:** [https://consultoria-reigen.vercel.app/](https://consultoria-reigen.vercel.app/)
- **Gênero:** RPG narrativo interativo web no universo de *Mob Psycho 100*.
- **Identidade Visual:** Cyber-retrô japonês com scanlines, kanji (霊&魂相談所), paleta neon com rosa elétrico (#FF2D87), amarelo vibrante (#FFD600) e azul ciano sobre fundo escuro.
- **Funcionalidades e Elementos Verificados:**
  1. **Fluxo de Entrada:** Tela de login para registrar o nome do estagiário ("Estagiário") e visualização do crachá oficial da agência ("Intern Badge").
  2. **Narrativa e Escolhas:** Chat com árvore de decisões e diálogos com Reigen Arataka, Mob e clientes sobrenaturais.
  3. **Minigame de Exorcismo:** Minigame interativo de reflexo e pontuação para purificação de espíritos.
  4. **Gestão de Métricas:** Acompanhamento dinâmico de Dinheiro, Reputação, XP/Nível e Espíritos Exorcizados.
  5. **Múltiplos Finais & Conquistas:** Finais calculados com base no desempenho e sistema de troféus desbloqueáveis ("Conquistas", como First Day, Exorcist Pro e Exorcist God) com notificações toast.
