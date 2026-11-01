/**
 * =============================================================================
 * PINK DIARY — IVY'S CREATIVE WORLD | SCRIPT PRINCIPAL (VANILLA JS ES6)
 * Interatividades: Mascote Pinky, Easter Egg, Câmeras CCTV, Modal de Projetos,
 * Mural de Recados em LocalStorage, Áudio Procedural, Scroll-Reveal Suave,
 * ScrollSpy Dinâmico e Sistema de Conquistas Secretas ("Minhas Conquistas").
 * =============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ===========================================================================
     1. SISTEMA DE ÁUDIO PROCEDURAL SUTIL (WEB AUDIO API NATIVO)
     Gera beeps delicados e chimes suaves sem carregar arquivos pesados de áudio
     =========================================================================== */
  class PinkDiaryAudio {
    constructor() {
      this.ctx = null;
    }

    init() {
      if (this.ctx) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      } catch (e) {
        // Navegador sem suporte a Web Audio API
      }
    }

    playCuteChime() {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const now = this.ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // Acorde C Major (C5, E5, G5, C6)

      freqs.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        gain.gain.setValueAtTime(0.04, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.35);
      });
    }

    playCameraClick() {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.05);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    }

    playAchievementChime() {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const now = this.ctx.currentTime;
      // Arpejo cintilante e festivo, doce e delicado (C5, E5, G5, C6, E6)
      const notes = [
        { freq: 523.25, time: 0, dur: 0.32, gain: 0.04 },
        { freq: 659.25, time: 0.07, dur: 0.32, gain: 0.04 },
        { freq: 783.99, time: 0.14, dur: 0.38, gain: 0.045 },
        { freq: 1046.50, time: 0.22, dur: 0.50, gain: 0.05 },
        { freq: 1318.51, time: 0.32, dur: 0.70, gain: 0.055 }
      ];

      notes.forEach(({ freq, time, dur, gain: gVal }) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + time);

        gain.gain.setValueAtTime(gVal, now + time);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + time);
        osc.stop(now + time + dur);
      });
    }

    playPageTurnChime() {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const now = this.ctx.currentTime;
      // Arpejo cintilante e delicado de passagem de página mágica (E5, G5, B5, E6)
      const notes = [659.25, 783.99, 987.77, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        gain.gain.setValueAtTime(0.035, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.3);
      });
    }
  }

  const soundEngine = new PinkDiaryAudio();

  /* ===========================================================================
     2. MASCOTE PINKY — BALÕES DE FALA, CICLO DE MENSAGENS E ANIMAÇÕES
     =========================================================================== */
  const pinkyLines = [
    "Oi! Você encontrou meu cantinho. ♡",
    "Vamos dar uma olhada nos projetos da Ivy?",
    "Sabia que o Turno da Madrugada tem 5 câmeras ativas? Dá um friozinho na barriga!",
    "A Chioriya Boutique tem skins lindas de Genshin e Star Rail! ✨",
    "Na Consultoria Reigen, cuidado para não irritar os espíritos! 👻",
    "Obrigada por passar por aqui no Pink Diary! ♡",
    "A Ivy caprichou muito em cada detalhe de código e estética! 💻",
    "Psst: já tentou clicar várias vezes no coração lá no topo? 💌"
  ];

  let currentLineIndex = 0;

  const heroSpeechBubble = document.getElementById('hero-speech-bubble');
  const heroSpeechText = document.getElementById('hero-speech-text');
  const heroCardPinky = document.getElementById('hero-card-pinky');

  const pinkyDock = document.getElementById('pinky-dock');
  const btnPinkyMascot = document.getElementById('btn-pinky-mascot');
  const pinkyDockBubble = document.getElementById('pinky-dock-bubble');
  const pinkyDockText = document.getElementById('pinky-dock-text');
  const btnClosePinkyBubble = document.getElementById('btn-close-pinky-bubble');
  const btnMinimizePinky = document.getElementById('btn-minimize-pinky');

  // Elementos dos olhinhos SVG
  const dockEyesOpen = document.getElementById('dock-eyes-open');
  const dockEyesHappy = document.getElementById('dock-eyes-happy');

  function triggerPinkyWink() {
    if (dockEyesOpen && dockEyesHappy) {
      dockEyesOpen.style.display = 'none';
      dockEyesHappy.style.display = 'block';
      setTimeout(() => {
        dockEyesOpen.style.display = 'block';
        dockEyesHappy.style.display = 'none';
      }, 750);
    }
  }

  function interactWithPinky() {
    currentLineIndex = (currentLineIndex + 1) % pinkyLines.length;
    const newLine = pinkyLines[currentLineIndex];

    if (heroSpeechText) heroSpeechText.textContent = newLine;
    if (pinkyDockText) pinkyDockText.textContent = newLine;

    if (pinkyDockBubble) {
      pinkyDockBubble.style.display = 'block';
      pinkyDockBubble.classList.remove('hidden');
    }

    triggerPinkyWink();
    soundEngine.playCuteChime();

    // Desbloqueia conquista ao interagir com o mascote
    if (achievementsManager) {
      achievementsManager.unlock('pinky_friend');
    }
  }

  if (btnPinkyMascot) {
    btnPinkyMascot.addEventListener('click', interactWithPinky);
  }

  if (heroCardPinky) {
    heroCardPinky.addEventListener('click', (e) => {
      // Evita disparar se clicar no sticky note
      if (!e.target.closest('.scrapbook-sticky-note')) {
        interactWithPinky();
      }
    });
  }

  if (btnClosePinkyBubble) {
    btnClosePinkyBubble.addEventListener('click', (e) => {
      e.stopPropagation();
      if (pinkyDockBubble) pinkyDockBubble.style.display = 'none';
    });
  }

  if (btnMinimizePinky) {
    btnMinimizePinky.addEventListener('click', (e) => {
      e.stopPropagation();
      if (pinkyDock) {
        pinkyDock.classList.toggle('minimized');
      }
    });
  }

  /* ===========================================================================
     3. EASTER EGG — CLIQUE MÚLTIPLO NO CORAÇÃO DO TOPO (PRESERVADO INTACTO)
     =========================================================================== */
  let heartClicks = 0;
  let heartResetTimer = null;
  const btnHeartEasterEgg = document.getElementById('btn-heart-easter-egg');
  const modalEasterEgg = document.getElementById('modal-easter-egg');
  const btnCloseEgg = document.getElementById('btn-close-egg');

  if (btnHeartEasterEgg) {
    btnHeartEasterEgg.addEventListener('click', () => {
      heartClicks++;
      soundEngine.playCuteChime();

      // Feedback visual suave no botão
      btnHeartEasterEgg.style.transform = `scale(${1 + heartClicks * 0.08}) rotate(${heartClicks * 6}deg)`;

      clearTimeout(heartResetTimer);
      heartResetTimer = setTimeout(() => {
        heartClicks = 0;
        btnHeartEasterEgg.style.transform = '';
      }, 3000);

      // Limiar original inalterado: 5 cliques
      if (heartClicks >= 5) {
        openModal(modalEasterEgg);
        heartClicks = 0;
        btnHeartEasterEgg.style.transform = '';

        // Desbloqueia conquista de segredos
        if (achievementsManager) {
          achievementsManager.unlock('secret_finder');
        }
      }
    });
  }

  if (btnCloseEgg) {
    btnCloseEgg.addEventListener('click', () => {
      closeModal(modalEasterEgg);
    });
  }

  /* ===========================================================================
     4. PROJETO 1 — ALTERNÂNCIA DE CÂMERAS NO CARD TURNO DA MADRUGADA
     =========================================================================== */
  const cctvPreviewImg = document.getElementById('cctv-preview-img');
  const camSwitcherButtons = document.querySelectorAll('.btn-cam-switch');

  camSwitcherButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      camSwitcherButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetSrc = btn.getAttribute('data-src');
      if (cctvPreviewImg && targetSrc) {
        soundEngine.playCameraClick();
        // Efeito rápido de glitch ao alternar câmeras
        cctvPreviewImg.style.opacity = '0.3';
        cctvPreviewImg.style.filter = 'contrast(180%) invert(0.2)';
        
        setTimeout(() => {
          cctvPreviewImg.src = targetSrc;
          cctvPreviewImg.style.opacity = '1';
          cctvPreviewImg.style.filter = 'contrast(115%) brightness(90%) saturate(85%)';
        }, 120);

        // Desbloqueia conquista secreta: Operador da Madrugada
        if (achievementsManager) {
          achievementsManager.unlock('nightwatch_operator');
        }
      }
    });
  });

  /* ===========================================================================
     5. MODAL DE DETALHES TÉCNICOS DOS PROJETOS (DADOS REAIS VERIFICADOS)
     =========================================================================== */
  const projectData = {
    turno: {
      title: "Turno da Madrugada — Horror Psicológico CCTV",
      badge: "Jogo Web Autoral // Sobrevivência Noturna",
      url: "https://terror-gold.vercel.app/",
      description: "Uma experiência de terror psicológico imersiva que coloca o jogador na cadeira de um operador de monitoramento às 03:00 da madrugada. O objetivo é vigiar 5 setores em circuito de câmeras, reportar anomalias a tempo e sobreviver até o fim do turno às 04:00 AM.",
      features: [
        "Matriz operacional com 5 câmeras identificadas (Corredor, Administração, Subsolo Inundado, Quarto 4 e Central de Segurança)",
        "Mecânica de detecção e contenção de anomalias com feedback visual OSD",
        "Medidor dinâmico de instabilidade de sinal e tensão psicológica",
        "Efeitos de lente CRT: scanlines, vinheta escura, estática analógica e glitches de interferência",
        "Motor de áudio procedural atmosférico com Web Audio API nativo (sem bibliotecas externas)",
        "Telas narrativas completas de Briefing inicial, Jumpscare realista e Epílogo com 100% de sobrevivência"
      ],
      techStack: ["HTML5", "CSS3 Moderno", "Vanilla JavaScript ES6+", "Web Audio API", "HTML5 Canvas (Noise)"],
      notes: "Projeto com atmosfera sombria intencional, preservando o contraste com o restante do portfólio."
    },
    chioriya: {
      title: "Chioriya Boutique — Vitrine Temática de Trajes",
      badge: "Interface Web // Genshin Impact & Star Rail",
      url: "https://chioriya-boutique.vercel.app/",
      description: "Interface estilosa e inspirada na estilista Chiori. O projeto combina telas de autenticação (Cadastro e Login) com uma vitrine visual de skins e trajes elegantes para personagens consagrados de jogos de anime.",
      features: [
        "Tela de Cadastro completa com validação de campos (Usuário, E-mail, Senhas)",
        "Tela de Login com alternância dinâmica ('Já tem conta? Entre!' / 'Não tem conta? Crie uma!')",
        "Página inicial (/home.html) com menu de navegação e logotipo original do projeto",
        "Catálogo de skins para Genshin Impact: Yelan (Tranquil Banquet), Ningguang (Orchid's Gown), Jean, Klee e Ayaka",
        "Catálogo de skins para Honkai Star Rail: March 7th, Sparkle, Firefly, Ruan Mei e Castorice",
        "Design visual com tons elegantes inspirados no universo dos jogos"
      ],
      techStack: ["HTML5 Semântico", "CSS3 Customizado", "Vanilla JavaScript", "Design de Vitrine"],
      notes: "Interface fiel ao projeto publicado, com navegação fluida entre seções."
    },
    reigen: {
      title: "Agência Espírita Reigen — Consultoria Paranormal",
      badge: "RPG Narrativo Web // Mob Psycho 100",
      url: "https://consultoria-reigen.vercel.app/",
      description: "Jogo narrativo interativo no universo de Mob Psycho 100. Você assume o papel de um estagiário contratado pela agência de Reigen Arataka ('Espíritos & Almas Consultoria / 霊&魂相談所'), atende clientes excêntricos, toma decisões em diálogos ramificados e encara minigames paranormais.",
      features: [
        "Sistema de crachá de estagiário e narrativa interativa guiada por escolhas de diálogo",
        "Minigame dinâmico de exorcismo e purificação de espíritos malignos",
        "Gerenciamento de status em tempo real: Dinheiro, Reputação, XP e Nível do estagiário",
        "Múltiplos finais calculados com base no desempenho e nas escolhas do jogador",
        "Sistema completo de conquistas desbloqueáveis (Conquistas) com modal de troféus",
        "Estética retrô cyber-japonesa com scanlines, neons rosa/amarelo (#FF2D87 / #FFD600) e trilha sonora imersiva"
      ],
      techStack: ["React", "JavaScript", "Tailwind CSS", "Sistema de Conquistas", "Áudio Web"],
      notes: "Projeto demonstrando conhecimento em lógica de jogos, árvores de diálogo e gerenciamento de estado."
    }
  };

  const modalProjectDetails = document.getElementById('modal-project-details');
  const projectModalTitle = document.getElementById('project-modal-title');
  const projectModalBadge = document.getElementById('project-modal-badge');
  const projectModalBody = document.getElementById('project-modal-body');
  const projectModalLink = document.getElementById('project-modal-link');
  const btnCloseProjectModal = document.getElementById('btn-close-project-modal');
  const btnModalBack = document.getElementById('btn-modal-back');

  const detailButtons = document.querySelectorAll('.btn-details');

  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectData[projKey];
      if (!data) return;

      if (projectModalTitle) projectModalTitle.textContent = data.title;
      if (projectModalBadge) projectModalBadge.textContent = data.badge;
      if (projectModalLink) {
        projectModalLink.href = data.url;
        projectModalLink.setAttribute('aria-label', `Visitar ${data.title} em nova aba`);
      }

      if (projectModalBody) {
        projectModalBody.innerHTML = `
          <div>
            <h4 class="modal-section-title">Sobre o Projeto</h4>
            <p>${data.description}</p>
          </div>

          <div>
            <h4 class="modal-section-title">Recursos e Funcionalidades Reais</h4>
            <ul class="features-list">
              ${data.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
          </div>

          <div>
            <h4 class="modal-section-title">Tecnologias Utilizadas</h4>
            <div class="modal-tech-pills">
              ${data.techStack.map(t => `<span class="tech-pill">${t}</span>`).join('')}
            </div>
          </div>

          <div style="background: rgba(246, 184, 205, 0.2); padding: 12px 14px; border-radius: 8px; font-size: 0.85rem; border: 1px dashed var(--borda-suave);">
            <strong>✦ Verificação Autoral:</strong> ${data.notes}
          </div>
        `;
      }

      openModal(modalProjectDetails);

      // Desbloqueia conquista secreta: Leitor Atento
      if (achievementsManager) {
        achievementsManager.unlock('tech_dossier');
      }
    });
  });

  if (btnCloseProjectModal) {
    btnCloseProjectModal.addEventListener('click', () => closeModal(modalProjectDetails));
  }
  if (btnModalBack) {
    btnModalBack.addEventListener('click', () => closeModal(modalProjectDetails));
  }

  /* Funções Utilitárias de Modal */
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.hidden = false;
    // Força reflow para animação CSS
    modalEl.offsetHeight;
    modalEl.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Foco no botão de fechar acessível
    const closeBtn = modalEl.querySelector('button');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      modalEl.hidden = true;
    }, 250);
  }

  // Fechar ao clicar fora do diálogo
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      closeModal(e.target);
    }
  });

  // Fechar no ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModalEl = document.querySelector('.modal-backdrop.open');
      if (openModalEl) closeModal(openModalEl);
    }
  });

  /* ===========================================================================
     6. MURAL INTERATIVO DE RECADINHOS (GUESTBOOK EM LOCALSTORAGE)
     Totalmente funcional no navegador, sem inventar backend ou envio falso
     =========================================================================== */
  const guestbookForm = document.getElementById('guestbook-form');
  const guestNameInput = document.getElementById('guest-name');
  const guestMsgInput = document.getElementById('guest-message');
  const boardNotesList = document.getElementById('board-notes-list');
  const notesCountSpan = document.getElementById('notes-count');

  const STORAGE_KEY = 'pink_diary_guest_notes';

  // Semente inicial de recados carinhosos
  const defaultNotes = [
    {
      id: 'seed-1',
      name: 'Pinky (o gatinho mascote)',
      message: 'Bem-vindo ao Pink Diary! Deixe seu recado aqui pra Ivy ler depois! ♡',
      sticker: 'cat',
      date: '01/11/2026'
    }
  ];

  function getStoredNotes() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultNotes;
    } catch (e) {
      return defaultNotes;
    }
  }

  function saveStoredNotes(notes) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {}
  }

  function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  function getStickerEmoji(stickerVal) {
    switch(stickerVal) {
      case 'bow': return '🎀';
      case 'star': return '✨';
      case 'cat': return '🐾';
      case 'heart':
      default: return '♡';
    }
  }

  function renderNotes() {
    if (!boardNotesList) return;
    const notes = getStoredNotes();

    if (notesCountSpan) notesCountSpan.textContent = notes.length;

    boardNotesList.innerHTML = notes.map(note => `
      <article class="board-note-item" data-id="${note.id}">
        <div class="note-header">
          <span class="note-author">${escapeHTML(note.name)}</span>
          <span class="note-sticker">${getStickerEmoji(note.sticker)}</span>
        </div>
        <p class="note-body">${escapeHTML(note.message)}</p>
        <div class="note-footer">
          <span>${note.date}</span>
          <button type="button" class="btn-delete-note" data-id="${note.id}" aria-label="Remover este recadinho">Remover</button>
        </div>
      </article>
    `).join('');

    // Eventos de exclusão de notas
    const deleteButtons = boardNotesList.querySelectorAll('.btn-delete-note');
    deleteButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const idToDelete = btn.getAttribute('data-id');
        const currentNotes = getStoredNotes().filter(n => n.id !== idToDelete);
        saveStoredNotes(currentNotes);
        renderNotes();
        showToast('Recado removido do mural.');
      });
    });
  }

  if (guestbookForm) {
    guestbookForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = guestNameInput.value.trim();
      const message = guestMsgInput.value.trim();
      const selectedSticker = document.querySelector('input[name="guest-sticker"]:checked')?.value || 'heart';

      if (!name || !message) return;

      const now = new Date();
      const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

      const newNote = {
        id: 'note-' + Date.now(),
        name,
        message,
        sticker: selectedSticker,
        date: formattedDate
      };

      const notes = getStoredNotes();
      notes.unshift(newNote);
      saveStoredNotes(notes);

      // Limpa formulário
      guestNameInput.value = '';
      guestMsgInput.value = '';

      renderNotes();
      soundEngine.playCuteChime();
      showToast('Recadinho colado no diário com sucesso! ♡');

      // Desbloqueia conquista secreta: Recadinho com Carinho
      if (achievementsManager) {
        achievementsManager.unlock('diary_signature');
      }
    });
  }

  // Renderiza notas salvas ao iniciar
  renderNotes();

  /* ===========================================================================
     7. COPIAR E-MAIL COM FEEDBACK VISUAL
     =========================================================================== */
  const btnCopyEmail = document.getElementById('btn-copy-email');
  const emailLink = document.getElementById('email-link');

  if (btnCopyEmail && emailLink) {
    btnCopyEmail.addEventListener('click', () => {
      const email = emailLink.textContent.trim();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          showToast('E-mail copiado para a área de transferência! ♡');
          btnCopyEmail.innerHTML = '<span>Copiado! ✓</span>';
          setTimeout(() => {
            btnCopyEmail.innerHTML = '<span>Copiar</span>';
          }, 2000);
        }).catch(() => {
          fallbackCopyText(email);
        });
      } else {
        fallbackCopyText(email);
      }
    });
  }

  function fallbackCopyText(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast('E-mail copiado! ♡');
  }

  /* ===========================================================================
     8. TOAST NOTIFICATION FLUTUANTE SIMPLES
     =========================================================================== */
  const toastNotification = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(msg) {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = msg;
    toastNotification.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3200);
  }

  /* ===========================================================================
     9. BOTÃO VOLTAR AO TOPO & ROLAGEM SUAVE
     =========================================================================== */
  const btnBackToTop = document.getElementById('btn-back-to-top');

  window.addEventListener('scroll', () => {
    if (btnBackToTop) {
      if (window.scrollY > 320) {
        btnBackToTop.classList.add('visible');
      } else {
        btnBackToTop.classList.remove('visible');
      }
    }
  }, { passive: true });

  // O clique do btnBackToTop é gerenciado com a transição mágica na seção 13

  /* ===========================================================================
     10. MENU MOBILE (HAMBÚRGUER)
     =========================================================================== */
  const btnMenuToggle = document.getElementById('btn-menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (btnMenuToggle && mainNav) {
    btnMenuToggle.addEventListener('click', () => {
      const isExpanded = btnMenuToggle.getAttribute('aria-expanded') === 'true';
      btnMenuToggle.setAttribute('aria-expanded', !isExpanded);
      btnMenuToggle.classList.toggle('active');
      mainNav.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        btnMenuToggle.setAttribute('aria-expanded', 'false');
        btnMenuToggle.classList.remove('active');
        mainNav.classList.remove('open');
      });
    });
  }

  /* ===========================================================================
     11. SISTEMA DE CONQUISTAS SECRETAS ("MINHAS CONQUISTAS")
     Inspirado em diários de bordo e jogos com persistência em localStorage
     =========================================================================== */
  class PinkDiaryAchievements {
    constructor(sound) {
      this.sound = sound;
      this.storageKey = 'pink_diary_unlocked_achievements';
      this.unlocked = this.loadUnlocked();
      this.toastQueue = [];
      this.isShowingToast = false;
      this.visitedSections = new Set();

      // 9 Conquistas: 6 padrão + 3 secretas exclusivas do Pink Diary
      this.achievements = [
        {
          id: 'first_visit',
          title: 'Primeira Visita',
          icon: '💗',
          desc: 'Sua história no Pink Diary começou! 💗',
          hint: 'Dê seus primeiros passos pelo diário da Ivy.',
          secret: false
        },
        {
          id: 'explore_projects',
          title: 'Explorador de Projetos',
          icon: '✨',
          desc: 'Você encontrou as criações da Ivy! ✨',
          hint: 'Explore a seção de Projetos do portfólio.',
          secret: false
        },
        {
          id: 'curious_visitor',
          title: 'Curioso de Plantão',
          icon: '🎀',
          desc: 'Olha só quem chegou até o finalzinho do diário! 🎀',
          hint: 'Chegue até a seção de Contato no final da página.',
          secret: false
        },
        {
          id: 'pinky_friend',
          title: 'Amigo do Pinky',
          icon: '🐾',
          desc: 'Pinky já reconhece você como um visitante especial! 🐾',
          hint: 'Converse e faça carinho no gatinho Pinky.',
          secret: false
        },
        {
          id: 'secret_finder',
          title: 'Descobridor de Segredos',
          icon: '💌',
          desc: 'Você encontrou um segredo escondido no Pink Diary! 💌',
          hint: 'Siga a dica do Pinky e investigue um elemento no topo.',
          secret: false
        },
        {
          id: 'complete_explorer',
          title: 'Explorador Completo',
          icon: '🌷',
          desc: 'Nenhum cantinho ficou sem explorar. Parabéns! 🌷',
          hint: 'Visite todas as seções principais do diário.',
          secret: false
        },
        {
          id: 'nightwatch_operator',
          title: 'Operador da Madrugada',
          icon: '📹',
          desc: 'Alternou entre as câmeras CCTV do Turno da Madrugada! 📹',
          hint: '??? — Um segredo ainda não descoberto no diário.',
          secret: true
        },
        {
          id: 'diary_signature',
          title: 'Recadinho com Carinho',
          icon: '💖',
          desc: 'Deixou um recadinho assinado no mural do diário! 💖',
          hint: '??? — Um segredo ainda não descoberto no diário.',
          secret: true
        },
        {
          id: 'tech_dossier',
          title: 'Leitor Atento',
          icon: '📜',
          desc: 'Abriu a ficha técnica detalhada de um dos projetos reais! 📜',
          hint: '??? — Um segredo ainda não descoberto no diário.',
          secret: true
        }
      ];

      this.initModalEvents();
      this.updateBadges();
    }

    loadUnlocked() {
      try {
        const raw = localStorage.getItem(this.storageKey);
        if (raw) {
          const arr = JSON.parse(raw);
          if (Array.isArray(arr)) {
            return new Set(arr);
          }
        }
      } catch (e) {
        // Fallback gracioso se localStorage estiver desabilitado
      }
      return new Set();
    }

    saveUnlocked() {
      try {
        const arr = Array.from(this.unlocked);
        localStorage.setItem(this.storageKey, JSON.stringify(arr));
      } catch (e) {}
    }

    unlock(id) {
      if (this.unlocked.has(id)) return; // Já conquistada anteriormente
      const ach = this.achievements.find(a => a.id === id);
      if (!ach) return;

      this.unlocked.add(id);
      this.saveUnlocked();
      this.updateBadges();

      // Fila de notificações para nunca sobrepor toasts
      this.queueToast(ach);
    }

    queueToast(ach) {
      this.toastQueue.push(ach);
      this.processQueue();
    }

    processQueue() {
      if (this.isShowingToast || this.toastQueue.length === 0) return;
      this.isShowingToast = true;

      const ach = this.toastQueue.shift();
      const container = document.getElementById('achievements-toast-container');
      if (!container) {
        this.isShowingToast = false;
        return;
      }

      // Toca o arpejo de conquista festivo
      if (this.sound) {
        this.sound.playAchievementChime();
      }

      const toast = document.createElement('div');
      toast.className = 'achievement-toast';
      toast.setAttribute('role', 'alert');
      toast.setAttribute('aria-label', `Conquista desbloqueada: ${ach.title}`);
      toast.innerHTML = `
        <div class="achievement-toast-stamp">NOVA CONQUISTA! 🏆</div>
        <div class="achievement-toast-icon" aria-hidden="true">${ach.icon}</div>
        <div class="achievement-toast-info">
          <h4 class="achievement-toast-title">${escapeHTML(ach.title)}</h4>
          <p class="achievement-toast-desc">${escapeHTML(ach.desc)}</p>
        </div>
      `;

      container.appendChild(toast);

      // Gatilho suave de entrada
      requestAnimationFrame(() => {
        toast.classList.add('show');
      });

      // Permanece visível por 4 segundos e sai suavemente
      setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => {
          if (toast.parentElement) {
            toast.parentElement.removeChild(toast);
          }
          this.isShowingToast = false;
          // Intervalo seguro antes da próxima notificação da fila
          setTimeout(() => this.processQueue(), 300);
        }, 450);
      }, 4200);
    }

    updateBadges() {
      const count = this.unlocked.size;
      const total = this.achievements.length;

      // Badge no cabeçalho
      const badgeCount = document.getElementById('achievements-count-badge');
      if (badgeCount) {
        badgeCount.textContent = `${count}/${total}`;
      }

      // Texto de progresso no modal
      const progressText = document.getElementById('achievements-progress-text');
      if (progressText) {
        progressText.textContent = `${count} de ${total} descobertas`;
      }

      // Barra de progresso animada
      const progressBar = document.getElementById('achievements-progress-bar');
      const progressFill = document.getElementById('achievements-progress-fill');
      const percent = total > 0 ? Math.round((count / total) * 100) : 0;

      if (progressBar) {
        progressBar.setAttribute('aria-valuenow', count);
      }
      if (progressFill) {
        progressFill.style.width = `${percent}%`;
      }

      this.renderList();
    }

    renderList() {
      const listContainer = document.getElementById('achievements-list');
      if (!listContainer) return;

      listContainer.innerHTML = this.achievements.map(ach => {
        const isUnlocked = this.unlocked.has(ach.id);

        if (isUnlocked) {
          return `
            <div class="achievement-item-card unlocked" role="listitem">
              <div class="achievement-item-icon" aria-hidden="true">${ach.icon}</div>
              <div class="achievement-item-text">
                <div class="achievement-item-name">
                  <span>${escapeHTML(ach.title)}</span>
                  <span class="achievement-status-tag tag-unlocked">DESBLOQUEADA ✓</span>
                </div>
                <p class="achievement-item-desc">${escapeHTML(ach.desc)}</p>
              </div>
            </div>
          `;
        } else if (ach.secret) {
          return `
            <div class="achievement-item-card locked secret" role="listitem">
              <div class="achievement-item-icon" aria-hidden="true">🔒</div>
              <div class="achievement-item-text">
                <div class="achievement-item-name">
                  <span>??? — Conquista Secreta</span>
                  <span class="achievement-status-tag tag-locked">BLOQUEADA</span>
                </div>
                <p class="achievement-item-desc">Um segredo ainda não descoberto no diário. Continue explorando e interagindo com os detalhes!</p>
              </div>
            </div>
          `;
        } else {
          return `
            <div class="achievement-item-card locked" role="listitem">
              <div class="achievement-item-icon" aria-hidden="true">🔒</div>
              <div class="achievement-item-text">
                <div class="achievement-item-name">
                  <span>${escapeHTML(ach.title)}</span>
                  <span class="achievement-status-tag tag-locked">BLOQUEADA</span>
                </div>
                <p class="achievement-item-desc">${escapeHTML(ach.hint)}</p>
              </div>
            </div>
          `;
        }
      }).join('');
    }

    trackSectionVisit(sectionId) {
      if (!sectionId) return;
      this.visitedSections.add(sectionId);

      if (sectionId === 'projetos') {
        this.unlock('explore_projects');
      }
      if (sectionId === 'contato') {
        this.unlock('curious_visitor');
      }

      // Se todas as 5 seções do diário foram exploradas
      const mainSections = ['hero', 'sobre-mim', 'projetos', 'processo', 'contato'];
      const allExplored = mainSections.every(id => this.visitedSections.has(id));
      if (allExplored) {
        this.unlock('complete_explorer');
      }
    }

    initModalEvents() {
      const btnOpen = document.getElementById('btn-open-achievements');
      const modal = document.getElementById('modal-achievements');
      const btnCloseHeader = document.getElementById('btn-close-achievements-modal');
      const btnCloseFooter = document.getElementById('btn-achievements-close-footer');

      if (btnOpen && modal) {
        btnOpen.addEventListener('click', () => {
          this.updateBadges();
          openModal(modal);
          soundEngine.playCuteChime();
        });
      }

      if (btnCloseHeader && modal) {
        btnCloseHeader.addEventListener('click', () => closeModal(modal));
      }

      if (btnCloseFooter && modal) {
        btnCloseFooter.addEventListener('click', () => closeModal(modal));
      }
    }
  }

  const achievementsManager = new PinkDiaryAchievements(soundEngine);

  /* ===========================================================================
     12. ANIMAÇÕES DE ENTRADA AO ROLAR (SCROLL-REVEAL COM INTERSECTION OBSERVER)
     Respeita prefers-reduced-motion e não oculta conteúdo se JS falhar
     =========================================================================== */
  function initScrollReveal() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !('IntersectionObserver' in window)) {
      // Deixa tudo visível sem animação caso o usuário prefira redução de movimento
      return;
    }

    // Marca o body com classe para ativar os seletores CSS de opacidade inicial
    document.body.classList.add('js-ready');

    const revealItems = document.querySelectorAll('.reveal-on-scroll');

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Desobserva após aparecer para não ficar sumindo/reaparecendo ao rolar
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.12
    });

    revealItems.forEach(el => revealObserver.observe(el));
  }

  /* ===========================================================================
     13. TRANSIÇÃO DE TELA DE DIÁRIO MÁGICO (PAGE TURN TRANSITION)
     Efeito visual autoral de passagem de página entre seções do Pink Diary
     =========================================================================== */
  class PinkDiaryTransition {
    constructor(sound, achievements) {
      this.sound = sound;
      this.achievements = achievements;
      this.overlay = document.getElementById('diary-transition-overlay');
      this.titleEl = document.getElementById('diary-transition-title');
      this.isTransitioning = false;

      // Nomes amigáveis e temáticos para o selo da página
      this.sectionLabels = {
        'hero': 'Início do Diário ♡',
        'sobre-mim': 'Sobre Mim ♡',
        'sobre': 'Sobre Mim ♡',
        'projetos': 'Galeria de Projetos ♡',
        'processo': 'Processo Criativo ♡',
        'contato': 'Vamos Conversar ♡'
      };

      this.initEvents();
    }

    getFriendlyTitle(id) {
      const cleanId = id.replace(/^#/, '');
      return this.sectionLabels[cleanId] || 'Página do Diário ♡';
    }

    resolveTargetElement(hash) {
      if (!hash || hash === '#') return document.getElementById('hero');
      const cleanId = hash.replace(/^#/, '');
      // Suporte unificado para #sobre e #sobre-mim
      if (cleanId === 'sobre') {
        return document.getElementById('sobre-mim');
      }
      return document.getElementById(cleanId);
    }

    navigate(targetHash, pushState = true) {
      // Previne transições simultâneas caso o visitante clique rápido várias vezes
      if (this.isTransitioning) return;

      const targetEl = this.resolveTargetElement(targetHash);
      if (!targetEl) return;

      const targetId = '#' + targetEl.id;
      const currentScrollY = window.pageYOffset;
      const headerEl = document.querySelector('.site-header');
      const headerH = headerEl ? headerEl.offsetHeight : 72;
      const rect = targetEl.getBoundingClientRect();
      const targetScrollY = Math.max(0, rect.top + currentScrollY - (targetEl.id === 'hero' ? 0 : (headerH - 2)));

      // Fecha o menu mobile se estiver aberto
      const btnMenu = document.getElementById('btn-menu-toggle');
      const mainNavEl = document.getElementById('main-nav');
      if (btnMenu && mainNavEl && mainNavEl.classList.contains('open')) {
        btnMenu.setAttribute('aria-expanded', 'false');
        btnMenu.classList.remove('active');
        mainNavEl.classList.remove('open');
      }

      // Se já estiver posicionado exatamente no topo da seção solicitada
      if (Math.abs(currentScrollY - targetScrollY) < 25 && window.location.hash === targetId) {
        return;
      }

      // Respeita preferência de movimento reduzido (acessibilidade)
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced || !this.overlay) {
        window.scrollTo({ top: targetScrollY, behavior: 'auto' });
        if (pushState) {
          history.pushState(null, '', targetId);
        }
        this.updateActiveNav(targetEl.id);
        if (this.achievements) {
          this.achievements.trackSectionVisit(targetEl.id);
        }
        targetEl.setAttribute('tabindex', '-1');
        targetEl.focus({ preventScroll: true });
        return;
      }

      // Inicia a Transição do Diário Mágico
      this.isTransitioning = true;

      // Injeta o nome temático da seção no selo de scrapbook
      if (this.titleEl) {
        this.titleEl.textContent = this.getFriendlyTitle(targetEl.id);
      }

      // Toca som delicado de virada de página mágica sintetizado via Web Audio API
      if (this.sound) {
        this.sound.playPageTurnChime();
      }

      // Aplica efeito suave de recuo na seção atual
      const currentVisible = this.getCurrentVisibleSection();
      if (currentVisible) {
        currentVisible.classList.add('section-exiting');
      }

      // Ativa overlay e fecha as abas do diário cobrindo a tela
      this.overlay.classList.add('is-active', 'is-closing');
      this.overlay.classList.remove('is-opening');

      // Momento de cobertura total (após 380ms)
      setTimeout(() => {
        // Posiciona instantaneamente o scroll enquanto as abas estão 100% fechadas
        window.scrollTo({ top: targetScrollY, behavior: 'auto' });

        // Atualiza endereço com a hash no histórico do navegador
        if (pushState) {
          history.pushState(null, '', targetId);
        }

        // Limpa classes de saída da tela anterior
        document.querySelectorAll('.section-exiting').forEach(sec => {
          sec.classList.remove('section-exiting');
        });

        // Adiciona efeito de revelação suave na nova seção
        targetEl.classList.add('section-entering');

        // Atualiza destaque no menu superior
        this.updateActiveNav(targetEl.id);

        // Desbloqueia conquista correspondente à seção visitada
        if (this.achievements) {
          this.achievements.trackSectionVisit(targetEl.id);
        }

        // Breve pausa técnica para estabilização de layout antes de abrir
        setTimeout(() => {
          this.overlay.classList.remove('is-closing');
          this.overlay.classList.add('is-opening');

          // Conclusão da transição (após abertura das abas)
          setTimeout(() => {
            this.overlay.classList.remove('is-active', 'is-opening');
            targetEl.classList.remove('section-entering');
            this.isTransitioning = false;

            // Foco acessível para navegação por teclado
            targetEl.setAttribute('tabindex', '-1');
            targetEl.focus({ preventScroll: true });
          }, 420);

        }, 40);

      }, 380);
    }

    getCurrentVisibleSection() {
      const sections = Array.from(document.querySelectorAll('section[id]'));
      const headerH = document.querySelector('.site-header')?.offsetHeight || 72;
      return sections.find(sec => {
        const r = sec.getBoundingClientRect();
        return r.top <= headerH + 120 && r.bottom > headerH + 120;
      }) || sections[0];
    }

    updateActiveNav(activeId) {
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const cleanHref = href ? href.replace(/^#/, '') : '';
        if (cleanHref === activeId || (cleanHref === 'sobre-mim' && activeId === 'sobre') || (cleanHref === 'sobre' && activeId === 'sobre-mim')) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    initEvents() {
      // Intercepta todos os links internos com âncora para seções
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const href = anchor.getAttribute('href');
          if (!href || href === '#') return;

          const targetEl = this.resolveTargetElement(href);
          if (targetEl && (targetEl.tagName === 'SECTION' || targetEl.tagName === 'HEADER' || targetEl.id === 'hero')) {
            e.preventDefault();
            this.navigate(href, true);
          }
        });
      });

      // Botão Voltar ao Topo utiliza a transição mágica para voltar ao início
      const btnTop = document.getElementById('btn-back-to-top');
      if (btnTop) {
        btnTop.addEventListener('click', (e) => {
          e.preventDefault();
          this.navigate('#hero', true);
        });
      }

      // Suporte completo aos botões Voltar e Avançar do navegador (histórico)
      window.addEventListener('popstate', () => {
        const hash = window.location.hash || '#hero';
        this.navigate(hash, false);
      });
    }
  }

  /* ===========================================================================
     14. MENU DINÂMICO (SCROLLSPY COM INTERSECTION OBSERVER)
     Atualiza o item ativo durante a rolagem manual da página
     =========================================================================== */
  function initScrollSpy(diaryTransition) {
    const sections = document.querySelectorAll('section[id]');
    const navLinksList = document.querySelectorAll('.nav-link');

    if ('IntersectionObserver' in window) {
      const spyObserver = new IntersectionObserver((entries) => {
        // Não sobrescreve o destaque se estiver no meio da transição visual
        if (diaryTransition && diaryTransition.isTransitioning) return;

        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');

            navLinksList.forEach(link => {
              const href = link.getAttribute('href');
              const cleanHref = href ? href.replace(/^#/, '') : '';
              if (cleanHref === currentId || (cleanHref === 'sobre-mim' && currentId === 'sobre') || (cleanHref === 'sobre' && currentId === 'sobre-mim')) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });

            // Rastreia seção visitada para o sistema de conquistas
            if (achievementsManager && currentId) {
              achievementsManager.trackSectionVisit(currentId);
            }
          }
        });
      }, {
        rootMargin: '-25% 0px -55% 0px',
        threshold: 0.05
      });

      sections.forEach(sec => spyObserver.observe(sec));
    }
  }

  /* ===========================================================================
     15. EFEITOS VISUAIS E INTERATIVIDADE LIGADOS À ROLAGEM (SCROLL EFFECTS)
     Fita marcadora, parallax sutil de scrapbook, trilha de projetos e Peekaboo Pinky
     =========================================================================== */
  class PinkDiaryScrollEffects {
    constructor(sound) {
      this.sound = sound;
      this.ribbonBar = document.getElementById('diary-scroll-bar');
      this.ribbonCharm = document.getElementById('diary-scroll-charm');
      this.peekabooPinky = document.getElementById('peekaboo-pinky');
      this.peekabooBubble = document.getElementById('peekaboo-bubble');
      this.milestones = document.querySelectorAll('.discovery-milestone');
      this.parallaxElements = Array.from(document.querySelectorAll('.parallax-decor'));
      this.skinThumbs = Array.from(document.querySelectorAll('.parallax-skin'));
      this.philosophyCard = document.querySelector('.scroll-tilt-card');
      this.avatarFrame = document.querySelector('.scroll-float-avatar');
      
      this.isTicking = false;
      this.scrollTimeout = null;
      this.lastScrollY = window.pageYOffset;
      this.prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      this.init();
    }

    init() {
      // Listener de scroll passivo de alta performance
      const onScrollHandler = () => {
        if (!this.isTicking) {
          window.requestAnimationFrame(() => {
            this.update();
            this.isTicking = false;
          });
          this.isTicking = true;
        }

        // Adiciona classe de animação ao lacinho durante a rolagem ativa
        if (this.ribbonCharm && !this.prefersReduced) {
          this.ribbonCharm.classList.add('is-scrolling');
          clearTimeout(this.scrollTimeout);
          this.scrollTimeout = setTimeout(() => {
            this.ribbonCharm.classList.remove('is-scrolling');
          }, 140);
        }
      };

      window.addEventListener('scroll', onScrollHandler, { passive: true });
      document.addEventListener('scroll', onScrollHandler, { passive: true });

      // Cliques na trilha de marcos dos projetos
      this.milestones.forEach(m => {
        m.addEventListener('click', () => {
          const targetId = m.getAttribute('data-target');
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      });

      // Interação surpresa com o Peekaboo Pinky
      if (this.peekabooPinky) {
        this.peekabooPinky.addEventListener('click', () => {
          this.peekabooPinky.classList.add('happy-bounce');
          if (this.sound) {
            this.sound.playCuteChime();
          }
          this.spawnMiniHearts(this.peekabooPinky);
          setTimeout(() => {
            this.peekabooPinky.classList.remove('happy-bounce');
          }, 600);
        });
      }

      // Executa primeira atualização inicial
      this.update();
    }

    update() {
      const scrollY = window.pageYOffset || window.scrollY || document.documentElement.scrollTop || (document.scrollingElement ? document.scrollingElement.scrollTop : 0) || 0;
      const winH = window.innerHeight;
      const docH = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      const maxScroll = Math.max(1, docH - winH);
      const scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));
      const scrollPercent = (scrollProgress * 100).toFixed(1);

      // 1. Atualização da Fita Marcadora de Leitura (CSS variable e fallback direto)
      document.documentElement.style.setProperty('--scroll-progress', `${scrollPercent}%`);
      if (this.ribbonBar) {
        this.ribbonBar.style.width = `${scrollPercent}%`;
      }
      if (this.ribbonCharm) {
        this.ribbonCharm.style.left = `${scrollPercent}%`;
      }

      // Se o usuário prefere movimento reduzido, pula transformações dinâmicas
      if (this.prefersReduced) return;

      const viewportCenter = scrollY + winH / 2;

      // 2. Parallax Delicado nos Elementos de Scrapbook
      this.parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.1;
        const rect = el.getBoundingClientRect();
        if (rect.bottom >= -100 && rect.top <= winH + 100) {
          const elCenter = scrollY + rect.top + rect.height / 2;
          const dist = (elCenter - viewportCenter) * speed;
          el.style.transform = `translate3d(0, ${dist.toFixed(1)}px, 0)`;
        }
      });

      // 3. Micro-movimento do Avatar e Bilhete de Filosofia
      if (this.avatarFrame) {
        const rect = this.avatarFrame.getBoundingClientRect();
        if (rect.bottom >= -50 && rect.top <= winH + 50) {
          const dist = ((scrollY + rect.top) - viewportCenter) * 0.04;
          this.avatarFrame.style.setProperty('--avatar-float', `${dist.toFixed(1)}px`);
        }
      }

      if (this.philosophyCard) {
        const rect = this.philosophyCard.getBoundingClientRect();
        if (rect.bottom >= -50 && rect.top <= winH + 50) {
          const tilt = Math.max(-2, Math.min(2, ((scrollY + rect.top) - viewportCenter) * 0.005));
          this.philosophyCard.style.setProperty('--scroll-tilt', `${tilt.toFixed(2)}deg`);
        }
      }

      // 4. Parallax Staggered das Skins de Chioriya
      if (this.skinThumbs.length > 0) {
        this.skinThumbs.forEach(thumb => {
          const offsetIdx = parseInt(thumb.getAttribute('data-skin-offset'), 10) || 1;
          const rect = thumb.getBoundingClientRect();
          if (rect.bottom >= -50 && rect.top <= winH + 50) {
            const shift = (rect.top - winH / 2) * (offsetIdx * 0.025);
            thumb.style.setProperty('--skin-float', `${shift.toFixed(1)}px`);
          }
        });
      }

      // 5. Atualização da Trilha de Descoberta dos Projetos
      const cardTurno = document.getElementById('card-turno');
      const cardChioriya = document.getElementById('card-chioriya');
      const cardReigen = document.getElementById('card-reigen');

      if (cardTurno && cardChioriya && cardReigen) {
        const rTurno = cardTurno.getBoundingClientRect();
        const rChio = cardChioriya.getBoundingClientRect();
        const rRei = cardReigen.getBoundingClientRect();

        let activeTarget = 'card-turno';
        const triggerLine = winH * 0.65;

        if (rRei.top <= triggerLine) {
          activeTarget = 'card-reigen';
        } else if (rChio.top <= triggerLine) {
          activeTarget = 'card-chioriya';
        } else {
          activeTarget = 'card-turno';
        }

        this.milestones.forEach(m => {
          if (m.getAttribute('data-target') === activeTarget) {
            m.classList.add('active');
          } else {
            m.classList.remove('active');
          }
        });
      }

      // 6. Detalhe Surpresa Secreto da Rolagem: Peekaboo Pinky 🐾
      const sectionProcess = document.getElementById('processo');
      if (sectionProcess && this.peekabooPinky) {
        const rProc = sectionProcess.getBoundingClientRect();
        const inPeekZone = rProc.top <= winH * 0.75 && rProc.bottom >= winH * 0.1;

        if (inPeekZone) {
          this.peekabooPinky.classList.add('is-peeking');
          if (this.peekabooBubble) {
            setTimeout(() => {
              if (this.peekabooPinky.classList.contains('is-peeking')) {
                this.peekabooBubble.classList.add('show-bubble');
              }
            }, 350);
          }
        } else {
          this.peekabooPinky.classList.remove('is-peeking');
          if (this.peekabooBubble) {
            this.peekabooBubble.classList.remove('show-bubble');
          }
        }
      }

      this.lastScrollY = scrollY;
    }

    spawnMiniHearts(targetEl) {
      const container = targetEl.parentElement;
      if (!container) return;

      for (let i = 0; i < 3; i++) {
        const heart = document.createElement('span');
        heart.textContent = ['♡', '✨', '🐾'][i];
        heart.style.position = 'absolute';
        heart.style.right = `${15 + i * 16}px`;
        heart.style.bottom = `${50 + i * 12}px`;
        heart.style.fontSize = '1.1rem';
        heart.style.color = '#741F43';
        heart.style.pointerEvents = 'none';
        heart.style.transition = 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
        heart.style.opacity = '1';
        heart.style.transform = 'translateY(0) scale(0.8)';
        container.appendChild(heart);

        requestAnimationFrame(() => {
          heart.style.transform = `translateY(-${28 + i * 10}px) scale(1.2)`;
          heart.style.opacity = '0';
        });

        setTimeout(() => {
          if (heart.parentElement) heart.parentElement.removeChild(heart);
        }, 700);
      }
    }
  }

  /* ===========================================================================
     16. INICIALIZAÇÃO GERAL E BOAS-VINDAS
     =========================================================================== */
  initScrollReveal();
  const diaryTransition = new PinkDiaryTransition(soundEngine, achievementsManager);
  initScrollSpy(diaryTransition);
  const scrollEffects = new PinkDiaryScrollEffects(soundEngine);
  window.__scrollEffects = scrollEffects;

  // Se houver hash na URL ao carregar, atualiza o item ativo
  if (window.location.hash) {
    const initialTarget = diaryTransition.resolveTargetElement(window.location.hash);
    if (initialTarget) {
      diaryTransition.updateActiveNav(initialTarget.id);
    }
  }

  // Desbloqueia a primeira conquista após a página carregar suavemente
  setTimeout(() => {
    if (achievementsManager) {
      achievementsManager.unlock('first_visit');
    }
  }, 900);

});
