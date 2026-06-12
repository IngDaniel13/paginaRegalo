/* ═══════════════════════════════════════════════════════════
   CONFIGURACIÓN
   ═══════════════════════════════════════════════════════════ */
const CONFIG = {
    mensaje: `Yarel, en este día tan especial quiero que sepas lo importante que eres para mí.\n\nCada sonrisa tuya ilumina mi mundo, cada abrazo tuyo es mi lugar favorito, y cada momento a tu lado se convierte en un recuerdo inolvidable.\n\nHoy celebramos tu vida, tu luz, tu esencia única. Que este nuevo año te traiga todo lo que mereces: aventuras, aprendizajes, amor y mucha felicidad.\n\nGracias por existir y por permitirme ser parte de tu historia.`,
    canciones: [
        { nombre: "Married Life", artista: "UP", archivo: "assets/music/Married_Life.mp3" },
        { nombre: "For Youth (방탄소년단)", artista: "BTS", archivo: "assets/music/for youth.mpeg" },
        // { nombre: "Modelito", artista: "Jay Wheeler ft Luister la voz", archivo: "assets/music/Modelito.mpeg" }
    ],
    deseos: [
        "Que sonrías cada día como hoy",
        "Que cumplas todos tus sueños",
        "Que la vida te sorprenda siempre",
        "Que nunca te falte el amor",
        "Que tengas aventuras increíbles",
        "Que seas muy feliz siempre 💜"
    ],
    razones: [
        "Por tu sonrisa contagiosa",
        "Por cómo iluminas todo a tu paso",
        "Por tu corazón gigante",
        "Por ser tú, auténtica y única",
        "Por los momentos que hemos compartido",
        "Por cómo me haces sentir",
        "Por tu fuerza y valentía",
        "Por tu forma de ver la vida",
        "Por cada abrazo tuyo",
        "Por simplemente existir 💜"
    ],
    preguntas: [
        {
            titulo: "🎨 Contrato de abrazos",
            enunciado: "Daniel propone un contrato donde Yarel se compromete a dar un beso cada vez que él tenga un día difícil o lo necesite. ¿Qué elemento básico necesita cualquier acuerdo para existir?",
            opciones: ["Que ambas partes estén de acuerdo", "Que tenga emojis", "Que esté escrito en papel rosado", "Que incluya chocolates"],
            correcta: 0,
            respuestaSecreta: "¡Sabía que lo recordarías! 💜"
        },
        {
            titulo: "🍫 El Misterio Del Chocolate Perdido",
            enunciado: "Daniel dejó una barra de chocolate en la nevera. Horas después, desapareció misteriosamente y todas las pruebas apuntan a Yarel. Antes de emitir sentencia, ¿qué debería hacer una buena jurista?",
            opciones: ["Condenar a Yarel por presunción de antojo", "Analizar las pruebas y garantizar el derecho de defensa", "Declarar que el chocolate pasó a dominio público", "Cerrar el caso por falta de chocolate"],
            correcta: 1,
            respuestaSecreta: "¡Exactamente! Todo de ti me fascina ✨"
        },
        {
            titulo: "🍦 Incumplimiento Grave del Noviazgo",
            enunciado: "Daniel prometió compartir el helado de maracuyá con Yarel y posteriormente consumió el 100% del producto. ¿Cuál podría ser la consecuencia jurídica más apropiada?",
            opciones: ["Pérdida definitiva del derecho a pedir un bocado", "Prisión preventiva por delito gastronómico", "Intervención inmediata de la Corte Suprema", "Una indemnización equivalente a un tarro de helado"],
            correcta: 3,
            respuestaSecreta: "¡Las pastas son lo mejor! Como tú ❤️"
        }
    ]
};

/* ═══════════════════════════════════════════════════════════
   ESTADO GLOBAL
   ═══════════════════════════════════════════════════════════ */
const STATE = {
    selectedSong: null,
    currentSong: 0,
    isPlaying: false,
    envelopeOpened: false,
    currentQuestion: 0,
    score: 0,
    typewriterInterval: null,
    wishesVisible: false,
    currentTypewriterTimeout: null
};

/* ═══════════════════════════════════════════════════════════
   REFERENCIAS DOM
   ═══════════════════════════════════════════════════════════ */
const $ = id => document.getElementById(id);
const screens = { welcome: $("screenWelcome"), envelope: $("screenEnvelope"), main: $("screenMain") };
const songsGrid = $("songsGrid");
const btnContinue = $("btnContinue");
const envelopeWrapper = $("envelopeWrapper");
const envFrontFlap = $("envFrontFlap");
const envSeal = $("envSeal");
const envLetter = $("envLetter");
const envelopeSparkles = $("envelopeSparkles");
const confettiCont = $("confettiContainer");
const floatingPlayer = $("floatingPlayer");
const playerSongName = $("playerSongName");
const playerArtistName = $("playerArtistName");
const playerPlayPause = $("playerPlayPause");
const playerPrev = $("playerPrev");
const playerNext = $("playerNext");
const playerVolume = $("playerVolume");
const playerProgressFill = $("playerProgressFill");
const audioEl = $("audioPlayer");
const messageTextEl = $("messageText");
const wishesGrid = $("wishesGrid");
const reasonsList = $("reasonsList");
const starsContainer = $("starsContainer");
const floatingCircles = $("floatingCircles");
const verdictCard = $("verdictCard");
const wishesCard = $("wishesCard");
const verdictModal = $("verdictModal");
const hamburgerIcon = $("hamburgerIcon");
const tabsContainer = $("tabsContainer");
const menuOverlay = $("menuOverlay");

/* ═══════════════════════════════════════════════════════════
   MENÚ HAMBURGUESA
   ═══════════════════════════════════════════════════════════ */
function toggleMenu() {
    const isOpen = tabsContainer.classList.contains("open");
    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

function openMenu() {
    tabsContainer.classList.add("open");
    hamburgerIcon.classList.add("active");
    menuOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeMenu() {
    tabsContainer.classList.remove("open");
    hamburgerIcon.classList.remove("active");
    menuOverlay.classList.remove("open");
    document.body.style.overflow = "";
}

function setupHamburgerMenu() {
    if (hamburgerIcon) {
        // Remover event listener anterior para evitar duplicados
        const newIcon = hamburgerIcon.cloneNode(true);
        hamburgerIcon.parentNode.replaceChild(newIcon, hamburgerIcon);
        window.hamburgerIcon = newIcon;
        newIcon.addEventListener("click", toggleMenu);
    }
    if (menuOverlay) {
        const newOverlay = menuOverlay.cloneNode(true);
        menuOverlay.parentNode.replaceChild(newOverlay, menuOverlay);
        window.menuOverlay = newOverlay;
        newOverlay.addEventListener("click", closeMenu);
    }
    
    // Re-asignar referencias actualizadas
    window.hamburgerIcon = document.getElementById("hamburgerIcon");
    window.menuOverlay = document.getElementById("menuOverlay");
}

/* ═══════════════════════════════════════════════════════════
   FONDO DINÁMICO
   ═══════════════════════════════════════════════════════════ */
function initBackground() {
    for (let i = 0; i < 100; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.cssText = `
            width: ${2 + Math.random() * 4}px;
            height: ${2 + Math.random() * 4}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 3}s;
            animation-duration: ${2 + Math.random() * 2}s;
        `;
        starsContainer.appendChild(star);
    }
    
    for (let i = 0; i < 15; i++) {
        const circle = document.createElement("div");
        circle.className = "circle";
        const size = 50 + Math.random() * 200;
        circle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
            animation-duration: ${15 + Math.random() * 15}s;
        `;
        floatingCircles.appendChild(circle);
    }
}

/* ═══════════════════════════════════════════════════════════
   SELECTOR DE CANCIONES
   ═══════════════════════════════════════════════════════════ */
function buildSongCards() {
    CONFIG.canciones.forEach((song, idx) => {
        const card = document.createElement("div");
        card.className = "song-card";
        card.dataset.idx = idx;
        card.innerHTML = `
            <div class="song-icon">🎵</div>
            <div class="song-name">${song.nombre}</div>
            <div class="song-artist">${song.artista}</div>
        `;
        card.addEventListener("click", () => selectSong(idx));
        songsGrid.appendChild(card);
    });
}

function selectSong(idx) {
    STATE.selectedSong = idx;
    document.querySelectorAll(".song-card").forEach((c, i) => {
        c.classList.toggle("selected", i === idx);
    });
    btnContinue.disabled = false;
}

/* ═══════════════════════════════════════════════════════════
   TRANSICIONES
   ═══════════════════════════════════════════════════════════ */
btnContinue.addEventListener("click", () => {
    if (STATE.selectedSong === null) return;
    STATE.currentSong = STATE.selectedSong;
    loadAndPlayMainAudio(STATE.currentSong);
    goToScreen("envelope");
});

function setupEnvelope() {
    envelopeWrapper.addEventListener("click", openEnvelope);
}

function openEnvelope() {
    if (STATE.envelopeOpened) return;
    STATE.envelopeOpened = true;
    
    envSeal.classList.add("break");
    setTimeout(() => envFrontFlap.classList.add("open"), 400);
    setTimeout(() => envLetter.classList.add("rising"), 800);
    setTimeout(() => spawnEnvelopeSparkles(), 600);
    setTimeout(() => {
        goToScreen("main");
        initMainScreen();
    }, 2500);
}

function spawnEnvelopeSparkles() {
    const emojis = ["✨", "💜", "🎂", "🎈", "💕", "⭐"];
    for (let i = 0; i < 20; i++) {
        const s = document.createElement("span");
        s.className = "sparkle";
        s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        s.style.cssText = `
            left: ${30 + Math.random() * 40}%;
            top: ${20 + Math.random() * 60}%;
            font-size: ${1 + Math.random()}rem;
        `;
        envelopeSparkles.appendChild(s);
        setTimeout(() => s.remove(), 800);
    }
}

/* ═══════════════════════════════════════════════════════════
   PANTALLA PRINCIPAL
   ═══════════════════════════════════════════════════════════ */
function initMainScreen() {
    launchConfetti();
    
    if (window.innerWidth > 768) {
        floatingPlayer.classList.add("visible");
    }
    
    setupHamburgerMenu();
    initQuiz();
    setupVerdictButton();
    setupTabs();
    setupGoToQuizButton();
    
    if (window.innerWidth <= 768 && !playerCollapsed) {
        createMobilePlayer();
    }
    
    resetVerdictState();
}

function resetVerdictState() {
    if (verdictCard) {
        verdictCard.classList.add("hidden-verdict");
    }
    if (wishesCard) {
        wishesCard.classList.add("hidden-wishes");
        STATE.wishesVisible = false;
    }
}

function launchConfetti() {
    const emojis = ["🎉", "🎊", "🎈", "🎂", "✨", "💜"];
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const conf = document.createElement("div");
            conf.className = "confetti-piece";
            conf.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            conf.style.cssText = `
                left: ${Math.random() * 100}%;
                font-size: ${1 + Math.random() * 1.5}rem;
                animation-duration: ${2 + Math.random() * 3}s;
                animation-delay: ${Math.random()}s;
            `;
            confettiCont.appendChild(conf);
            setTimeout(() => conf.remove(), 4000);
        }, i * 50);
    }
}

/* ═══════════════════════════════════════════════════════════
   CARTA CON EFECTO MÁQUINA DE ESCRIBIR (SE REINICIA CADA VEZ)
   ═══════════════════════════════════════════════════════════ */
function startTypewriter() {
    // Detener cualquier timeout anterior
    if (STATE.currentTypewriterTimeout) {
        clearTimeout(STATE.currentTypewriterTimeout);
        STATE.currentTypewriterTimeout = null;
    }
    
    const text = CONFIG.mensaje;
    let i = 0;
    messageTextEl.innerHTML = "";
    
    if (wishesCard && !STATE.wishesVisible) {
        wishesCard.classList.add("hidden-wishes");
    }
    
    function type() {
        if (i < text.length) {
            const ch = text[i++];
            if (ch === "\n") {
                messageTextEl.appendChild(document.createElement("br"));
            } else {
                messageTextEl.insertAdjacentText("beforeend", ch);
            }
            STATE.currentTypewriterTimeout = setTimeout(type, 30 + Math.random() * 30);
        } else {
            if (wishesCard) {
                wishesCard.classList.remove("hidden-wishes");
                STATE.wishesVisible = true;
            }
            STATE.currentTypewriterTimeout = null;
        }
    }
    type();
}

function loadWishes() {
    wishesGrid.innerHTML = "";
    CONFIG.deseos.forEach((deseo, i) => {
        const item = document.createElement("div");
        item.className = "wish-item";
        item.style.animationDelay = `${i * 0.1}s`;
        item.innerHTML = `✨ ${deseo} ✨`;
        wishesGrid.appendChild(item);
    });
}

/* ═══════════════════════════════════════════════════════════
   JUEGO DE PREGUNTAS
   ═══════════════════════════════════════════════════════════ */
let quizAnswered = false;

function initQuiz() {
    if (STATE.currentQuestion >= CONFIG.preguntas.length) {
        showQuizComplete();
        return;
    }
    quizAnswered = false;
    const q = CONFIG.preguntas[STATE.currentQuestion];
    const questionEl = $("quizQuestion");
    const optionsEl = $("quizOptions");
    const feedbackEl = $("quizFeedback");
    
    questionEl.innerHTML = `
        <div class="quiz-title">${q.titulo}</div>
        <div class="quiz-statement">${q.enunciado}</div>
    `;
    optionsEl.innerHTML = "";
    feedbackEl.innerHTML = "";
    
    q.opciones.forEach((opt, idx) => {
        const btn = document.createElement("div");
        btn.className = "quiz-option";
        btn.innerHTML = `<span class="quiz-option-letter">${String.fromCharCode(65 + idx)}.</span> ${opt}`;
        btn.addEventListener("click", () => checkAnswer(idx, btn));
        optionsEl.appendChild(btn);
    });
}

function checkAnswer(selected, btnElement) {
    if (quizAnswered) return;
    quizAnswered = true;
    
    const q = CONFIG.preguntas[STATE.currentQuestion];
    const feedbackEl = $("quizFeedback");
    const allOptions = document.querySelectorAll(".quiz-option");
    
    if (selected === q.correcta) {
        STATE.score++;
        btnElement.classList.add("correct");
        feedbackEl.innerHTML = "✅ ¡Correcta! ✅";
        feedbackEl.style.color = "#4CAF50";
    } else {
        btnElement.classList.add("wrong");
        if (allOptions[q.correcta]) {
            allOptions[q.correcta].classList.add("correct");
        }
        feedbackEl.innerHTML = "❌ Ups... ¡Sigue intentando! ❌";
        feedbackEl.style.color = "#f44336";
    }
    
    setTimeout(() => {
        STATE.currentQuestion++;
        if (STATE.currentQuestion < CONFIG.preguntas.length) {
            initQuiz();
        } else {
            showQuizComplete();
        }
    }, 2000);
}

function showQuizComplete() {
    launchMiniConfetti();
    if (verdictCard) {
        verdictCard.classList.remove("hidden-verdict");
    }
}

function launchMiniConfetti() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const conf = document.createElement("div");
            conf.className = "confetti-piece";
            conf.textContent = "💜";
            conf.style.cssText = `
                left: ${Math.random() * 100}%;
                font-size: 1rem;
                animation-duration: 1.5s;
            `;
            confettiCont.appendChild(conf);
            setTimeout(() => conf.remove(), 1500);
        }, i * 50);
    }
}

/* ═══════════════════════════════════════════════════════════
   VEREDICTO DEL TRIBUNAL (VENTANA EMERGENTE)
   ═══════════════════════════════════════════════════════════ */
function getVerdictMessage(score, totalQuestions) {
    if (score === totalQuestions) {
        return {
            message: "👩‍⚖️ Dra. Yarel queda oficialmente habilitada para ejercer ante el Tribunal Supremo de Nuestra Relación. 🎉⚖️",
            icon: "🏆"
        };
    } else if (score >= totalQuestions - 1) {
        return {
            message: "⚖️ Aprobada con honores. El tribunal reconoce su excelente criterio jurídico y su impecable gusto. 📜✨",
            icon: "📜"
        };
    } else if (score >= Math.ceil(totalQuestions / 2)) {
        return {
            message: "📚 La acusada demuestra conocimientos suficientes, aunque se recomienda reforzar la jurisprudencia sobre chocolates, pizzas y momentos especiales. 🍕🍫",
            icon: "📚"
        };
    } else {
        return {
            message: "😂 Se ordena una sanción pedagógica consistente en recibir abrazos, pastel de cumpleaños y mucho amor hasta nuevo aviso. ¡Felicidades! 🎂💜",
            icon: "🎈"
        };
    }
}

function setupVerdictButton() {
    const verdictBtn = document.getElementById("verdictBtn");
    
    if (!verdictBtn) return;
    
    // Remover event listener anterior
    const newBtn = verdictBtn.cloneNode(true);
    verdictBtn.parentNode.replaceChild(newBtn, verdictBtn);
    const freshVerdictBtn = document.getElementById("verdictBtn");
    
    freshVerdictBtn.addEventListener("click", () => {
        if (STATE.currentQuestion < CONFIG.preguntas.length) {
            const feedbackEl = $("quizFeedback");
            if (feedbackEl) {
                feedbackEl.innerHTML = "⚠️ Primero completa todas las preguntas del reto para conocer tu veredicto ⚠️";
                feedbackEl.style.color = "#f44336";
                setTimeout(() => {
                    if (feedbackEl.innerHTML.includes("completa todas")) {
                        feedbackEl.innerHTML = "";
                    }
                }, 3000);
            }
            return;
        }
        
        const verdict = getVerdictMessage(STATE.score, CONFIG.preguntas.length);
        showVerdictModal(verdict.message, verdict.icon);
        
        if (STATE.score === CONFIG.preguntas.length) {
            launchMiniConfetti();
            setTimeout(() => launchMiniConfetti(), 500);
        }
    });
}

function showVerdictModal(message, icon) {
    const modalIcon = document.getElementById("verdictModalIcon");
    const modalText = document.getElementById("verdictModalText");
    const modal = verdictModal;
    
    if (modalIcon) modalIcon.textContent = icon;
    if (modalText) modalText.textContent = message;
    
    if (modal) {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }
}

function closeVerdictModal() {
    if (verdictModal) {
        verdictModal.style.display = "none";
        document.body.style.overflow = "";
    }
}

function goToMensajeEspecial() {
    closeVerdictModal();
    const tabToActivate = document.querySelector('.tab-btn[data-tab="tab1"]');
    if (tabToActivate) {
        tabToActivate.click();
    }
    closeMenu();
}

/* ═══════════════════════════════════════════════════════════
   BOTÓN PARA IR AL TRIBUNAL
   ═══════════════════════════════════════════════════════════ */
function setupGoToQuizButton() {
    const goToQuizBtn = document.getElementById("goToQuizBtn");
    if (goToQuizBtn) {
        const newBtn = goToQuizBtn.cloneNode(true);
        goToQuizBtn.parentNode.replaceChild(newBtn, goToQuizBtn);
        const freshBtn = document.getElementById("goToQuizBtn");
        freshBtn.addEventListener("click", () => {
            const tabToActivate = document.querySelector('.tab-btn[data-tab="tab2"]');
            if (tabToActivate) {
                tabToActivate.click();
            }
            closeMenu();
        });
    }
}

/* ═══════════════════════════════════════════════════════════
   PESTAÑAS
   ═══════════════════════════════════════════════════════════ */
function setupTabs() {
    const tabs = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");
    
    tabs.forEach(tab => {
        // Remover event listeners anteriores
        const newTab = tab.cloneNode(true);
        tab.parentNode.replaceChild(newTab, tab);
        const freshTab = document.querySelector(`.tab-btn[data-tab="${newTab.dataset.tab}"]`);
        
        freshTab.addEventListener("click", () => {
            const tabId = freshTab.dataset.tab;
            document.querySelectorAll(".tab-btn").forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
            freshTab.classList.add("active");
            $(tabId).classList.add("active");
            closeMenu();
            
            if (tabId === "tab1") {
                startTypewriter();
                if (wishesCard && STATE.wishesVisible) {
                    wishesCard.classList.add("hidden-wishes");
                    STATE.wishesVisible = false;
                }
            }
        });
    });
}

/* ═══════════════════════════════════════════════════════════
   MOSAICO DE FOTOS
   ═══════════════════════════════════════════════════════════ */
const FOTOS = [
    "foto1.jpeg",
    "foto2.jpeg",
    "foto3.jpeg",
    "foto4.jpeg",
    "foto5.jpeg",
    "foto6.jpeg",
    "foto7.jpeg",
    "foto8.jpeg",
    "foto9.jpeg"
];

function abrirMosaico() {
    const mosaicContainer = document.getElementById("mosaicContainer");
    const mosaicGrid = document.getElementById("mosaicGrid");
    
    if (!mosaicContainer || !mosaicGrid) return;
    
    mosaicGrid.innerHTML = "";
    
    FOTOS.forEach((foto, index) => {
        const item = document.createElement("div");
        item.className = "mosaic-item";
        item.innerHTML = `<img src="assets/images/${foto}" alt="Momento especial ${index + 1}">`;
        item.addEventListener("click", () => abrirImagenAmpliada(`assets/images/${foto}`));
        mosaicGrid.appendChild(item);
    });
    
    mosaicContainer.style.display = "block";
    document.body.style.overflow = "hidden";
}

function cerrarMosaico() {
    const mosaicContainer = document.getElementById("mosaicContainer");
    if (mosaicContainer) {
        mosaicContainer.style.display = "none";
        document.body.style.overflow = "";
    }
}

function abrirImagenAmpliada(src) {
    const modal = document.createElement("div");
    modal.className = "image-modal";
    modal.innerHTML = `
        <img src="${src}" alt="Momento especial">
        <button class="image-modal-close">✖</button>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = "hidden";
    
    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.classList.contains("image-modal-close")) {
            modal.remove();
            document.body.style.overflow = "";
        }
    });
}

// Configurar el botón del mosaico
const shareBtn = document.getElementById("shareBtn");
if (shareBtn) {
    const newShareBtn = shareBtn.cloneNode(true);
    shareBtn.parentNode.replaceChild(newShareBtn, shareBtn);
    const freshShareBtn = document.getElementById("shareBtn");
    freshShareBtn.addEventListener("click", () => {
        abrirMosaico();
        launchMiniConfetti();
    });
}

// Cerrar mosaico con tecla ESC
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        cerrarMosaico();
        const imageModal = document.querySelector(".image-modal");
        if (imageModal) {
            imageModal.remove();
            document.body.style.overflow = "";
        }
        closeVerdictModal();
    }
});

// Botón de cerrar del mosaico
const closeBtn = document.getElementById("mosaicCloseBtn");
if (closeBtn) {
    const newCloseBtn = closeBtn.cloneNode(true);
    closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
    const freshCloseBtn = document.getElementById("mosaicCloseBtn");
    freshCloseBtn.addEventListener("click", cerrarMosaico);
}

// Configurar botón del modal de veredicto
const verdictModalBtn = document.getElementById("verdictModalBtn");
if (verdictModalBtn) {
    const newModalBtn = verdictModalBtn.cloneNode(true);
    verdictModalBtn.parentNode.replaceChild(newModalBtn, verdictModalBtn);
    const freshModalBtn = document.getElementById("verdictModalBtn");
    freshModalBtn.addEventListener("click", goToMensajeEspecial);
}

const verdictModalClose = document.getElementById("verdictModalClose");
if (verdictModalClose) {
    const newModalClose = verdictModalClose.cloneNode(true);
    verdictModalClose.parentNode.replaceChild(newModalClose, verdictModalClose);
    const freshModalClose = document.getElementById("verdictModalClose");
    freshModalClose.addEventListener("click", closeVerdictModal);
}

if (verdictModal) {
    verdictModal.addEventListener("click", (e) => {
        if (e.target === verdictModal) {
            closeVerdictModal();
        }
    });
}

/* ═══════════════════════════════════════════════════════════
   REPRODUCTOR DE AUDIO
   ═══════════════════════════════════════════════════════════ */
let playerCollapsed = null;
let playerExpanded = null;
let isMobilePlayerExpanded = false;

function createMobilePlayer() {
    if (playerCollapsed) playerCollapsed.remove();
    if (playerExpanded) playerExpanded.remove();
    
    playerCollapsed = document.createElement('div');
    playerCollapsed.className = 'player-collapsed';
    playerCollapsed.innerHTML = '<span class="player-collapsed-icon">🎵</span>';
    document.body.appendChild(playerCollapsed);
    
    playerExpanded = document.createElement('div');
    playerExpanded.className = 'player-expanded';
    playerExpanded.innerHTML = `
        <div class="player-expanded-header">
            <button class="player-expanded-close">✖</button>
        </div>
        <div class="player-inner">
            <div class="player-info">
                <span class="player-note">🎵</span>
                <div>
                    <div class="player-song-name" id="mobilePlayerSongName">---</div>
                    <div class="player-artist-name" id="mobilePlayerArtistName">---</div>
                </div>
            </div>
            <div class="player-controls">
                <button class="player-btn" id="mobilePlayerPrev">⏮</button>
                <button class="player-btn player-play-pause" id="mobilePlayerPlayPause">⏸</button>
                <button class="player-btn" id="mobilePlayerNext">⏭</button>
            </div>
            <div class="player-progress-wrap">
                <div class="player-progress-bar" id="mobilePlayerProgressBar">
                    <div class="player-progress-fill" id="mobilePlayerProgressFill"></div>
                </div>
            </div>
            <div class="player-volume-wrap">
                <span>🔊</span>
                <input type="range" class="player-volume" id="mobilePlayerVolume" min="0" max="1" step="0.01" value="1">
            </div>
        </div>
    `;
    document.body.appendChild(playerExpanded);
    
    playerCollapsed.addEventListener('click', () => {
        playerExpanded.classList.add('visible');
        isMobilePlayerExpanded = true;
        updateMobilePlayerInfo();
    });
    
    const closeBtnExpanded = playerExpanded.querySelector('.player-expanded-close');
    closeBtnExpanded.addEventListener('click', () => {
        playerExpanded.classList.remove('visible');
        isMobilePlayerExpanded = false;
    });
    
    const mobilePrev = document.getElementById('mobilePlayerPrev');
    const mobilePlayPause = document.getElementById('mobilePlayerPlayPause');
    const mobileNext = document.getElementById('mobilePlayerNext');
    const mobileVolume = document.getElementById('mobilePlayerVolume');
    const mobileProgressBar = document.getElementById('mobilePlayerProgressBar');
    
    if (mobilePrev) mobilePrev.addEventListener('click', prevSong);
    if (mobileNext) mobileNext.addEventListener('click', nextSong);
    if (mobilePlayPause) {
        mobilePlayPause.addEventListener('click', () => {
            if (audioEl.paused) {
                audioEl.play().catch(() => {});
                STATE.isPlaying = true;
            } else {
                audioEl.pause();
                STATE.isPlaying = false;
            }
            updateMobilePlayerInfo();
            updatePlayer();
        });
    }
    
    if (mobileVolume) {
        mobileVolume.addEventListener('input', (e) => {
            const v = parseFloat(e.target.value);
            audioEl.volume = v;
            mobileVolume.style.setProperty('--vol', (v * 100) + '%');
            if (playerVolume) playerVolume.value = v;
        });
    }
    
    if (mobileProgressBar) {
        mobileProgressBar.addEventListener('click', (e) => {
            if (!audioEl.duration) return;
            const rect = mobileProgressBar.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            audioEl.currentTime = pct * audioEl.duration;
        });
    }
}

function updateMobilePlayerInfo() {
    const song = CONFIG.canciones[STATE.currentSong];
    if (!song) return;
    
    const mobileSongName = document.getElementById('mobilePlayerSongName');
    const mobileArtistName = document.getElementById('mobilePlayerArtistName');
    const mobilePlayPause = document.getElementById('mobilePlayerPlayPause');
    
    if (mobileSongName) mobileSongName.textContent = song.nombre;
    if (mobileArtistName) mobileArtistName.textContent = song.artista;
    if (mobilePlayPause) mobilePlayPause.textContent = STATE.isPlaying ? '⏸' : '▶';
}

function updateMobileProgress() {
    if (!audioEl.duration) return;
    const pct = (audioEl.currentTime / audioEl.duration) * 100;
    const mobileFill = document.getElementById('mobilePlayerProgressFill');
    if (mobileFill) mobileFill.style.width = pct + '%';
}

function loadAndPlayMainAudio(idx) {
    const song = CONFIG.canciones[idx];
    audioEl.src = song.archivo;
    audioEl.volume = parseFloat(playerVolume.value);
    audioEl.load();
    audioEl.play().catch(() => {});
    STATE.isPlaying = true;
    updatePlayer();
    updateMobilePlayerInfo();
}

function updatePlayer() {
    const song = CONFIG.canciones[STATE.currentSong];
    if (song) {
        playerSongName.textContent = song.nombre;
        playerArtistName.textContent = song.artista;
        playerPlayPause.textContent = STATE.isPlaying ? "⏸" : "▶";
    }
}

audioEl.addEventListener("timeupdate", () => {
    if (!audioEl.duration) return;
    const pct = (audioEl.currentTime / audioEl.duration) * 100;
    if (playerProgressFill) playerProgressFill.style.width = pct + "%";
    updateMobileProgress();
});

audioEl.addEventListener("ended", () => nextSong());

if (playerPlayPause) {
    const newPlayPause = playerPlayPause.cloneNode(true);
    playerPlayPause.parentNode.replaceChild(newPlayPause, playerPlayPause);
    window.playerPlayPause = document.getElementById("playerPlayPause");
    window.playerPlayPause.addEventListener("click", () => {
        if (audioEl.paused) {
            audioEl.play().catch(() => {});
            STATE.isPlaying = true;
        } else {
            audioEl.pause();
            STATE.isPlaying = false;
        }
        updatePlayer();
        updateMobilePlayerInfo();
    });
}

if (playerPrev) {
    const newPrev = playerPrev.cloneNode(true);
    playerPrev.parentNode.replaceChild(newPrev, playerPrev);
    window.playerPrev = document.getElementById("playerPrev");
    window.playerPrev.addEventListener("click", () => prevSong());
}

if (playerNext) {
    const newNext = playerNext.cloneNode(true);
    playerNext.parentNode.replaceChild(newNext, playerNext);
    window.playerNext = document.getElementById("playerNext");
    window.playerNext.addEventListener("click", () => nextSong());
}

function nextSong() {
    STATE.currentSong = (STATE.currentSong + 1) % CONFIG.canciones.length;
    loadAndPlayMainAudio(STATE.currentSong);
}

function prevSong() {
    STATE.currentSong = (STATE.currentSong - 1 + CONFIG.canciones.length) % CONFIG.canciones.length;
    loadAndPlayMainAudio(STATE.currentSong);
}

if (playerVolume) {
    const newVolume = playerVolume.cloneNode(true);
    playerVolume.parentNode.replaceChild(newVolume, playerVolume);
    window.playerVolume = document.getElementById("playerVolume");
    window.playerVolume.addEventListener("input", () => {
        const v = parseFloat(window.playerVolume.value);
        audioEl.volume = v;
        window.playerVolume.style.setProperty("--vol", (v * 100) + "%");
    });
}

const progressBar = document.querySelector(".player-progress-bar");
if (progressBar) {
    const newProgressBar = progressBar.cloneNode(true);
    progressBar.parentNode.replaceChild(newProgressBar, progressBar);
    const freshProgressBar = document.querySelector(".player-progress-bar");
    freshProgressBar.addEventListener("click", (e) => {
        if (!audioEl.duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        audioEl.currentTime = pct * audioEl.duration;
    });
}

/* ═══════════════════════════════════════════════════════════
   NAVEGACIÓN
   ═══════════════════════════════════════════════════════════ */
function goToScreen(name) {
    Object.entries(screens).forEach(([key, el]) => {
        if (el) el.classList.toggle('active', key === name);
    });
    
    if (name !== 'main') {
        if (playerCollapsed) {
            playerCollapsed.remove();
            playerCollapsed = null;
        }
        if (playerExpanded) {
            playerExpanded.remove();
            playerExpanded = null;
        }
        if (floatingPlayer) floatingPlayer.classList.remove('visible');
    }
}

/* ═══════════════════════════════════════════════════════════
   MANEJO DE RESIZE
   ═══════════════════════════════════════════════════════════ */
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        if (floatingPlayer) floatingPlayer.classList.remove('visible');
        if (!playerCollapsed && document.getElementById('screenMain').classList.contains('active')) {
            createMobilePlayer();
        }
    } else {
        if (playerCollapsed) {
            playerCollapsed.remove();
            playerCollapsed = null;
        }
        if (playerExpanded) {
            playerExpanded.remove();
            playerExpanded = null;
        }
        if (floatingPlayer) floatingPlayer.classList.add('visible');
    }
});

/* ═══════════════════════════════════════════════════════════
   ARRANQUE
   ═══════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
    initBackground();
    buildSongCards();
    setupEnvelope();
    goToScreen("welcome");
    if (playerVolume) playerVolume.style.setProperty("--vol", "100%");
    
    startTypewriter();
    loadWishes();
    
    if (window.innerWidth <= 768) {
        if (floatingPlayer) floatingPlayer.classList.remove('visible');
    }
});

/* ═══════════════════════════════════════════════════════════
   NUEVAS FUNCIONALIDADES - SECUENCIA MOSAICO, ACERTIJO Y REVELACIÓN FINAL
   ═══════════════════════════════════════════════════════════ */

// Variables para el control de la secuencia automática
let secuenciaActiva = false;
let indiceSecuencia = 0;
let temporizadorSecuencia = null;
let tiempoEntreFotos = 3000; // 3 segundos por foto
let overlayMensajes = null;
let acertijoModal = null;
let videoRevelado = null;
let videoPolaroid = null;

/**
 * SECCIÓN 1: SECUENCIA AUTOMÁTICA DEL MOSAICO
 * Override de la función abrirMosaico original para agregar la secuencia automática
 */
function abrirMosaicoConSecuencia() {
    const mosaicContainer = document.getElementById("mosaicContainer");
    const mosaicGrid = document.getElementById("mosaicGrid");
    
    if (!mosaicContainer || !mosaicGrid) return;
    
    mosaicGrid.innerHTML = "";
    
    FOTOS.forEach((foto, index) => {
        const item = document.createElement("div");
        item.className = "mosaic-item";
        item.innerHTML = `<img src="assets/images/${foto}" alt="Momento especial ${index + 1}">`;
        item.addEventListener("click", () => abrirImagenAmpliada(`assets/images/${foto}`));
        mosaicGrid.appendChild(item);
    });
    
    mosaicContainer.style.display = "block";
    document.body.style.overflow = "hidden";
    
    // Esperar a que termine el confeti antes de iniciar la secuencia
    setTimeout(() => {
        iniciarSecuenciaAutomatica();
    }, 1500);
}

/**
 * Inicia el recorrido automático de fotografías
 */
function iniciarSecuenciaAutomatica() {
    if (secuenciaActiva) return;
    secuenciaActiva = true;
    indiceSecuencia = 0;
    mostrarSiguienteFotoSecuencia();
}

/**
 * Muestra la siguiente foto en la secuencia automática
 */
function mostrarSiguienteFotoSecuencia() {
    if (indiceSecuencia >= FOTOS.length) {
        // Terminó la secuencia
        secuenciaActiva = false;
        return;
    }
    
    const fotoSrc = `assets/images/${FOTOS[indiceSecuencia]}`;
    abrirImagenAmpliadaSecuencia(fotoSrc, () => {
        indiceSecuencia++;
        if (indiceSecuencia < FOTOS.length) {
            temporizadorSecuencia = setTimeout(() => {
                mostrarSiguienteFotoSecuencia();
            }, 800); // Pequeña pausa entre fotos
        } else {
            secuenciaActiva = false;
            // La secuencia terminó, no hacer nada más automáticamente
        }
    });
}

/**
 * Abre una imagen ampliada para la secuencia automática
 * @param {string} src - Ruta de la imagen
 * @param {function} onClose - Callback cuando se cierra la imagen
 */
function abrirImagenAmpliadaSecuencia(src, onClose) {
    const modal = document.createElement("div");
    modal.className = "image-modal image-modal-secuencia";
    modal.innerHTML = `
        <img src="${src}" alt="Momento especial">
        <button class="image-modal-close">✖</button>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = "hidden";
    
    // Cerrar automáticamente después del tiempo establecido
    const timeoutId = setTimeout(() => {
        if (modal && modal.parentNode) {
            modal.remove();
            if (onClose) onClose();
        }
    }, tiempoEntreFotos);
    
    // Permitir cierre manual también
    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.classList.contains("image-modal-close")) {
            clearTimeout(timeoutId);
            modal.remove();
            document.body.style.overflow = "";
            if (onClose) onClose();
        }
    });
}

/**
 * Cierra el mosaico y verifica si debe mostrar la ventana de mensajes
 */
function cerrarMosaicoConVerificacion() {
    const mosaicContainer = document.getElementById("mosaicContainer");
    if (mosaicContainer) {
        mosaicContainer.style.display = "none";
        document.body.style.overflow = "";
    }
    
    // Detener cualquier secuencia activa
    if (temporizadorSecuencia) {
        clearTimeout(temporizadorSecuencia);
        temporizadorSecuencia = null;
    }
    secuenciaActiva = false;
    
    // Si la secuencia terminó completamente, mostrar la ventana de mensajes
    if (indiceSecuencia >= FOTOS.length) {
        mostrarVentanaMensajesPostMosaico();
    }
}

/**
 * SECCIÓN 2: VENTANA FLOTANTE POSTERIOR AL CIERRE DEL MOSAICO
 */
function mostrarVentanaMensajesPostMosaico() {
    // Crear overlay de mensajes
    overlayMensajes = document.createElement("div");
    overlayMensajes.className = "mensajes-overlay";
    overlayMensajes.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(12px);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeInBackdrop 0.5s ease;
    `;
    
    const mensajeContainer = document.createElement("div");
    mensajeContainer.className = "mensajes-container";
    mensajeContainer.style.cssText = `
        text-align: center;
        color: white;
        font-family: 'Cormorant Garamond', serif;
        padding: 2rem;
    `;
    
    overlayMensajes.appendChild(mensajeContainer);
    document.body.appendChild(overlayMensajes);
    
    // Mostrar mensajes en secuencia
    const mensajes = [
        { texto: "Espera....", tiempo: 2000 },
        { texto: "¿Creíste que eso era todo?", tiempo: 2500 },
        { texto: "Antes de irte, completa esto y descubre el contenido secreto", tiempo: 4000 }
    ];
    
    let idxMensaje = 0;
    
    function mostrarSiguienteMensaje() {
        if (idxMensaje >= mensajes.length) {
            // Terminaron los mensajes, mostrar el acertijo
            overlayMensajes.remove();
            mostrarAcertijo();
            return;
        }
        
        const msg = mensajes[idxMensaje];
        mensajeContainer.innerHTML = `<h2 style="font-size: clamp(1.8rem, 6vw, 3rem); margin: 0; animation: zoomIn 0.5s ease;">${msg.texto}</h2>`;
        
        setTimeout(() => {
            idxMensaje++;
            mostrarSiguienteMensaje();
        }, msg.tiempo);
    }
    
    mostrarSiguienteMensaje();
}

/**
 * SECCIÓN 3 y 4: ACERTIJO Y VALIDACIÓN DE RESPUESTA
 */
function mostrarAcertijo() {
    // Crear modal del acertijo
    acertijoModal = document.createElement("div");
    acertijoModal.className = "acertijo-modal";
    acertijoModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(8px);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeInBackdrop 0.5s ease;
    `;
    
    acertijoModal.innerHTML = `
        <div class="acertijo-content" style="
            background: linear-gradient(135deg, #fff, #f5eaff);
            border-radius: 28px;
            max-width: 550px;
            width: 90%;
            padding: 2rem;
            position: relative;
            animation: zoomIn 0.4s ease;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            border: 2px solid #c9a9e6;
        ">
            <button class="acertijo-close" style="
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: #c9a9e6;
                border: none;
                border-radius: 50%;
                width: 36px;
                height: 36px;
                font-size: 1.2rem;
                cursor: pointer;
                transition: all 0.3s;
            ">✖</button>
            
            <div style="text-align: center;">
                <span style="font-size: 3rem;">💜</span>
                <h2 style="
                    font-family: 'Cormorant Garamond', serif;
                    color: #6c3483;
                    margin: 0.5rem 0 1rem 0;
                    font-size: 1.8rem;
                ">Mensaje Oculto</h2>
            </div>
            
            <div class="acertijo-texto" style="
                font-family: 'Nunito', sans-serif;
                line-height: 1.8;
                color: #4a235a;
                margin-bottom: 1.5rem;
                text-align: center;
                font-size: 1rem;
            ">
                <p>Cuando el sol de febrero aparece de una forma especial,<br>
                hay alguien que llega inmediatamente a tu mente.</p>
                
                <p>Algunas identidades pueden esconderse <strong>BeinTiun (21)</strong> veces tras una máscara,<br>
                y aun así resultan imposibles de confundir.</p>
                
                <p>Por cierto...</p>
                
                <p>No, eso no está mal escrito.</p>
                
                <p>Existe un pequeño detalle que merece ser descubierto.</p>
                
                <p>Y también un <strong>apodo</strong> de cuatro letras<br>
                que dice más de lo que parece.</p>
                
                <p>La respuesta está más cerca de lo que crees.</p>
                
                <p>Está escondida entre lo que <strong>"cambias"</strong><br>
                y lo que decides mantener.</p>
                
                <p>Ahora dime...</p>
                
                <p><strong>¿qué nombre escribirías aquí?</strong></p>
            </div>
            
            <div class="acertijo-input-area" style="margin-bottom: 1rem;">
                <input type="text" id="acertijoRespuesta" placeholder="__________" style="
                    width: 100%;
                    padding: 1rem;
                    font-size: 1.1rem;
                    border: 2px solid #d7bde2;
                    border-radius: 50px;
                    outline: none;
                    text-align: center;
                    font-family: 'Nunito', sans-serif;
                    background: white;
                ">
            </div>
            
            <div class="acertijo-botones" style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button id="btnPistas" style="
                    background: #d7bde2;
                    border: none;
                    border-radius: 50px;
                    padding: 0.8rem 1.5rem;
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                    color: #4a235a;
                    transition: all 0.3s;
                ">🔍 Ver Pistas</button>
                
                <button id="btnEnviarRespuesta" style="
                    background: linear-gradient(135deg, #9b59b6, #6c3483);
                    border: none;
                    border-radius: 50px;
                    padding: 0.8rem 2rem;
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                    color: white;
                    transition: all 0.3s;
                ">✨ Enviar ✨</button>
            </div>
            
            <div id="pistasContainer" style="
                margin-top: 1.5rem;
                padding: 1rem;
                background: rgba(157, 78, 221, 0.1);
                border-radius: 16px;
                display: none;
            "></div>
            
            <div id="acertijoFeedback" style="
                margin-top: 1rem;
                text-align: center;
                font-size: 0.9rem;
                min-height: 60px;
            "></div>
        </div>
    `;
    
    document.body.appendChild(acertijoModal);
    document.body.style.overflow = "hidden";
    
    // Configurar eventos
    const closeBtn = acertijoModal.querySelector(".acertijo-close");
    const btnPistas = acertijoModal.querySelector("#btnPistas");
    const btnEnviar = acertijoModal.querySelector("#btnEnviarRespuesta");
    const inputRespuesta = acertijoModal.querySelector("#acertijoRespuesta");
    const pistasContainer = acertijoModal.querySelector("#pistasContainer");
    
    closeBtn.addEventListener("click", () => {
        acertijoModal.remove();
        document.body.style.overflow = "";
    });
    
    // Pistas
    let pistasMostradas = false;
    btnPistas.addEventListener("click", () => {
        if (!pistasMostradas) {
            pistasContainer.style.display = "block";
            pistasContainer.innerHTML = `
                <div style="font-size: 0.9rem; color: #6c3483; line-height: 1.6;">
                    <p><strong>🔎 Pista 1:</strong> "BeinTiun (21)" → Algunas letras quieren llamar tu atención.</p>
                    <p><strong>🎭 Pista 2:</strong> "Apodo" → Quienes lo conocen bien lo reconocen por su hobbie o pasatiempos.</p>
                    <p><strong>✂️ Pista 3:</strong> "Cambias" → Separa y descubre.</p>
                </div>
            `;
            pistasMostradas = true;
        } else {
            pistasContainer.style.display = pistasContainer.style.display === "none" ? "block" : "none";
        }
    });
    
    function validarRespuesta(respuesta) {
        const respuestasCorrectas = [
            "HOBI", "hobi", "Hobi",
            "JHOPE", "jhope", "Jhope", "JHOPE", "J-Hope", "j-hope", "J-HOPE",
            "j hope", "J Hope", "J hope",
            "j-hope", "J-HOPE", "jhope", "Jhope"
        ];
        
        const limpia = respuesta.trim().toLowerCase();
        
        return respuestasCorrectas.some(correcta => correcta.toLowerCase() === limpia);
    }
    
    btnEnviar.addEventListener("click", () => {
        const respuesta = inputRespuesta.value;
        const feedbackDiv = acertijoModal.querySelector("#acertijoFeedback");
        
        if (validarRespuesta(respuesta)) {
            // Respuesta correcta - Cerrar el acertijo y mostrar modal de éxito
            acertijoModal.remove();
            mostrarModalExito();
        } else {
            feedbackDiv.innerHTML = `
                <div style="color: #f44336; background: rgba(244, 67, 54, 0.1); padding: 0.8rem; border-radius: 12px;">
                    ❌ No es correcto. Intenta de nuevo o usa las pistas. ❌
                </div>
            `;
            inputRespuesta.value = "";
            inputRespuesta.focus();
            
            setTimeout(() => {
                feedbackDiv.innerHTML = "";
            }, 3000);
        }
    });
    
    inputRespuesta.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            btnEnviar.click();
        }
    });
}

/**
 * SECCIÓN 6: MODAL DE ÉXITO (antes del video)
 */
function mostrarModalExito() {
    const modalExito = document.createElement("div");
    modalExito.className = "modal-exito";
    modalExito.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(8px);
        z-index: 2100;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeInBackdrop 0.4s ease;
    `;
    
    modalExito.innerHTML = `
        <div class="modal-exito-content" style="
            background: linear-gradient(135deg, #fff, #f5eaff);
            border-radius: 28px;
            max-width: 450px;
            width: 90%;
            padding: 2rem;
            text-align: center;
            animation: zoomIn 0.4s ease;
            border: 2px solid #9b59b6;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        ">
            <span style="font-size: 3rem; display: block; margin-bottom: 0.5rem;">💜</span>
            <h3 style="
                font-family: 'Cormorant Garamond', serif;
                color: #6c3483;
                font-size: 1.6rem;
                margin-bottom: 1rem;
            ">¡Correcto!</h3>
            <p style="
                font-family: 'Nunito', sans-serif;
                color: #4a235a;
                line-height: 1.7;
                margin-bottom: 1.5rem;
            ">
                Sabía que podrías resolverlo.<br>
                No porque fuera fácil,<br>
                sino porque nadie habría entendido cada pista mejor que tú.<br><br>
                Ahora es momento de abrir la última sorpresa.<br>
                Te espera un mensaje muy especial.<br><br>
                <strong>De tu más grande amor.</strong>
            </p>
            <button id="btnVerSorpresa" style="
                background: linear-gradient(135deg, #9b59b6, #6c3483);
                border: none;
                border-radius: 50px;
                padding: 0.8rem 2rem;
                font-size: 1rem;
                font-weight: 600;
                color: white;
                cursor: pointer;
                transition: all 0.3s;
            ">✨ Ver sorpresa final ✨</button>
        </div>
    `;
    
    document.body.appendChild(modalExito);
    document.body.style.overflow = "hidden";
    
    const btnVer = modalExito.querySelector("#btnVerSorpresa");
    btnVer.addEventListener("click", () => {
        modalExito.remove();
        mostrarRevelacionFinal();
    });
    
    // También permitir cerrar el modal haciendo clic fuera
    modalExito.addEventListener("click", (e) => {
        if (e.target === modalExito) {
            modalExito.remove();
            document.body.style.overflow = "";
        }
    });
}

/**
 * SECCIÓN 7: REVELACIÓN FINAL (Opción A - Polaroid)
 */
/**
 * SECCIÓN 7: REVELACIÓN FINAL (Opción A - Polaroid con cierre)
 */
function mostrarRevelacionFinal() {
    const esMovil = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Crear contenedor
    const revelacionContainer = document.createElement("div");
    revelacionContainer.className = "revelacion-container";
    revelacionContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(8px);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeInBackdrop 0.3s ease;
    `;
    
    // Botón de cierre
    const closeRevelacionBtn = document.createElement("button");
    closeRevelacionBtn.innerHTML = "✖";
    closeRevelacionBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255,255,255,0.9);
        border: none;
        border-radius: 50%;
        width: 44px;
        height: 44px;
        font-size: 1.3rem;
        cursor: pointer;
        z-index: 2150;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #6c3483;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    // Polaroid frame
    const polaroid = document.createElement("div");
    polaroid.className = "polaroid-frame";
    polaroid.style.cssText = `
        background: white;
        padding: 20px 20px 30px 20px;
        border-radius: 12px;
        box-shadow: 0 25px 50px rgba(0,0,0,0.3);
        transform: rotate(2deg);
        transition: transform 0.3s ease;
        max-width: 90%;
        width: 400px;
    `;
    
    // Contenedor del contenido (imagen o video)
    const contenidoContainer = document.createElement("div");
    contenidoContainer.style.cssText = `
        position: relative;
        width: 100%;
        aspect-ratio: 1 / 1;
        overflow: hidden;
        border-radius: 8px;
        background: #2d2d2d;
        cursor: pointer;
    `;
    
    // ===== POSTER (imagen estática durante la animación) =====
    const posterImg = document.createElement("img");
    posterImg.src = "assets/images/poster-video.jpg";
    posterImg.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
    `;
    
    // ===== VIDEO (se crea pero no se reproduce hasta después de la animación) =====
    const videoFinal = document.createElement("video");
    videoFinal.className = "video-revelacion";
    videoFinal.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transition: opacity 0.5s ease;
        z-index: 2;
    `;
    
    // Configuración del video
    videoFinal.controls = true;
    videoFinal.playsInline = true;
    videoFinal.preload = "metadata"; // Solo carga metadatos, no el video completo
    videoFinal.src = "assets/video/video1.mp4";
    
    // ===== CAPA DE REVELADO (animación) =====
    const capaRevelado = document.createElement("div");
    capaRevelado.className = "capa-revelado";
    capaRevelado.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #9b59b6, #6c3483);
        z-index: 3;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: clip-path 2.5s ease-in-out;
        clip-path: inset(0 0 0 0);
    `;
    
    const textoRevelado = document.createElement("div");
    textoRevelado.style.cssText = `
        color: white;
        font-family: 'Dancing Script', cursive;
        font-size: 1.2rem;
        text-align: center;
        opacity: 0.9;
    `;
    textoRevelado.innerHTML = "✨ Revelando momento especial... ✨";
    capaRevelado.appendChild(textoRevelado);
    
    // Agregar todo al contenedor
    contenidoContainer.appendChild(posterImg);
    contenidoContainer.appendChild(videoFinal);
    contenidoContainer.appendChild(capaRevelado);
    
    // Botón de play personalizado (aparece después de la animación)
    const playBtn = document.createElement("div");
    playBtn.innerHTML = "▶";
    playBtn.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 70px;
        height: 70px;
        background: linear-gradient(135deg, #9b59b6, #6c3483);
        border-radius: 50%;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        cursor: pointer;
        z-index: 10;
        color: white;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    `;
    playBtn.style.display = "none";
    contenidoContainer.appendChild(playBtn);
    
    // Pie de la polaroid
    const piePolaroid = document.createElement("div");
    piePolaroid.style.cssText = `
        text-align: center;
        margin-top: 15px;
        font-family: 'Dancing Script', cursive;
        color: #6c3483;
        font-size: 0.9rem;
    `;
    piePolaroid.innerHTML = "TE AMO FLACA 💜";
    
    polaroid.appendChild(contenidoContainer);
    polaroid.appendChild(piePolaroid);
    revelacionContainer.appendChild(closeRevelacionBtn);
    revelacionContainer.appendChild(polaroid);
    document.body.appendChild(revelacionContainer);
    document.body.style.overflow = "hidden";
    
    // ===== INICIAR ANIMACIÓN =====
    setTimeout(() => {
        capaRevelado.style.transition = "all 2s ease-in-out";
        capaRevelado.style.clipPath = "inset(100% 0 0 0)";
        
        setTimeout(() => {
            textoRevelado.style.opacity = "0";
        }, 500);
        
        // Cuando la animación termina, mostrar el poster y el botón de play
        setTimeout(() => {
            capaRevelado.style.opacity = "0";
            setTimeout(() => {
                if (capaRevelado && capaRevelado.parentNode) {
                    capaRevelado.remove(); // Eliminar la capa de revelado
                }
                // Mostrar el botón de play
                playBtn.style.display = "flex";
                
                // Hacer un pequeño efecto de pulso en el botón
                playBtn.style.animation = "pulse 1.5s ease-in-out 3";
                
                // Agregar mensaje de instrucción
                const instruccion = document.createElement("div");
                instruccion.innerHTML = "🎬 Toca para reproducir el video";
                instruccion.style.cssText = `
                    position: absolute;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0,0,0,0.6);
                    color: white;
                    padding: 5px 12px;
                    border-radius: 20px;
                    font-size: 11px;
                    z-index: 15;
                    white-space: nowrap;
                    pointer-events: none;
                `;
                contenidoContainer.appendChild(instruccion);
                setTimeout(() => instruccion.remove(), 4000);
            }, 300);
        }, 2000);
    }, 500);
    
    // ===== FUNCIÓN PARA REPRODUCIR EL VIDEO =====
    function reproducirVideo() {
        // Ocultar el poster y el botón
        posterImg.style.opacity = "0";
        playBtn.style.display = "none";
        
        // Mostrar el video
        videoFinal.style.opacity = "1";
        
        // Cargar y reproducir
        videoFinal.preload = "auto";
        videoFinal.load();
        
        setTimeout(() => {
            videoFinal.play().catch(error => {
                console.log("Error al reproducir:", error);
                // Si falla, mostrar mensaje
                const errorMsg = document.createElement("div");
                errorMsg.innerHTML = "Toca el video para reproducir";
                errorMsg.style.cssText = `
                    position: absolute;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0,0,0,0.7);
                    color: white;
                    padding: 5px 12px;
                    border-radius: 20px;
                    font-size: 11px;
                    z-index: 20;
                `;
                contenidoContainer.appendChild(errorMsg);
                setTimeout(() => errorMsg.remove(), 3000);
            });
        }, 100);
    }
    
    // Evento para reproducir al tocar el botón
    playBtn.onclick = (e) => {
        e.stopPropagation();
        reproducirVideo();
    };
    
    // También permitir tocar el contenedor para reproducir (si no hay video reproduciéndose)
    contenidoContainer.onclick = (e) => {
        if (e.target === playBtn || playBtn.contains(e.target)) return;
        if (videoFinal.style.opacity !== "1") {
            reproducirVideo();
        } else if (videoFinal.paused) {
            videoFinal.play();
        } else {
            videoFinal.pause();
            // Mostrar botón de play temporal
            const tempPlay = document.createElement("div");
            tempPlay.innerHTML = "▶";
            tempPlay.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 50px;
                height: 50px;
                background: rgba(155, 89, 182, 0.8);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                color: white;
                z-index: 20;
                pointer-events: none;
                animation: fadeOut 0.8s ease forwards;
            `;
            contenidoContainer.appendChild(tempPlay);
            setTimeout(() => tempPlay.remove(), 800);
        }
    };
    
    // Agregar la animación de fadeOut al CSS
    if (!document.querySelector('#fadeOutAnimation')) {
        const style = document.createElement('style');
        style.id = 'fadeOutAnimation';
        style.textContent = `
            @keyframes fadeOut {
                0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Cerrar la ventana
    function cerrarRevelacion() {
        if (videoFinal) {
            videoFinal.pause();
            videoFinal.src = "";
        }
        revelacionContainer.remove();
        document.body.style.overflow = "";
    }
    
    closeRevelacionBtn.addEventListener("click", cerrarRevelacion);
    
    revelacionContainer.addEventListener("click", (e) => {
        if (e.target === revelacionContainer) {
            cerrarRevelacion();
        }
    });
    
    // Efecto hover en polaroid (solo PC, no afecta móviles)
    if (!esMovil) {
        polaroid.addEventListener("mouseenter", () => {
            polaroid.style.transform = "rotate(0deg) scale(1.02)";
        });
        polaroid.addEventListener("mouseleave", () => {
            polaroid.style.transform = "rotate(2deg) scale(1)";
        });
    }
}

/**
 * SOBRESCRIBIR FUNCIONES ORIGINALES PARA INTEGRAR NUEVA FUNCIONALIDAD
 * Sin modificar el código original, reemplazamos las referencias de los botones
 */
document.addEventListener("DOMContentLoaded", () => {
    // Reemplazar la función del botón del mosaico con la versión mejorada
    const shareBtnOriginal = document.getElementById("shareBtn");
    if (shareBtnOriginal) {
        const nuevoShareBtn = shareBtnOriginal.cloneNode(true);
        shareBtnOriginal.parentNode.replaceChild(nuevoShareBtn, shareBtnOriginal);
        nuevoShareBtn.addEventListener("click", () => {
            // Lanzar confeti existente
            if (typeof launchMiniConfetti === 'function') {
                launchMiniConfetti();
            }
            // Abrir mosaico con secuencia automática
            abrirMosaicoConSecuencia();
        });
    }
    
    // Reemplazar el cierre del mosaico original
    const closeMosaicBtn = document.getElementById("mosaicCloseBtn");
    if (closeMosaicBtn) {
        const nuevoCloseBtn = closeMosaicBtn.cloneNode(true);
        closeMosaicBtn.parentNode.replaceChild(nuevoCloseBtn, closeMosaicBtn);
        nuevoCloseBtn.addEventListener("click", cerrarMosaicoConVerificacion);
    }
    
    // También modificar el overlay del mosaico para el cierre
    const mosaicContainer = document.getElementById("mosaicContainer");
    if (mosaicContainer) {
        // Observar cambios en el estilo display para detectar cierre
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "style") {
                    const style = mosaicContainer.style.display;
                    if (style === "none" && !secuenciaActiva && indiceSecuencia >= FOTOS.length) {
                        mostrarVentanaMensajesPostMosaico();
                    }
                }
            });
        });
        observer.observe(mosaicContainer, { attributes: true });
    }
});

/* ═══════════════════════════════════════════════════════════
   HOTFIX: ARREGLAR CIERRE DEL ACERTIJO
   ═══════════════════════════════════════════════════════════ */

// Función global para cerrar el acertijo y volver a la página principal
window.cerrarAcertijoForzosamente = function() {
    console.log("Cerrando acertijo...");
    
    // Buscar y eliminar el modal del acertijo
    const acertijoModal = document.querySelector('.acertijo-modal');
    if (acertijoModal) {
        acertijoModal.remove();
    }
    
    // Buscar y eliminar cualquier overlay de mensajes
    const mensajesOverlay = document.querySelector('.mensajes-overlay');
    if (mensajesOverlay) {
        mensajesOverlay.remove();
    }
    
    // Restaurar el scroll
    document.body.style.overflow = "";
    document.body.style.position = "";
    
    // Forzar que la pantalla principal sea visible
    const screenMain = document.getElementById("screenMain");
    if (screenMain) {
        screenMain.style.display = "flex";
        screenMain.style.visibility = "visible";
        screenMain.style.opacity = "1";
        screenMain.style.pointerEvents = "auto";
    }
    
    // Asegurar que el contenido principal sea interactuable
    const mainContainer = document.querySelector(".main-container");
    if (mainContainer) {
        mainContainer.style.pointerEvents = "auto";
    }
    
    // Cerrar el menú hamburguesa si está abierto
    const tabsContainer = document.getElementById("tabsContainer");
    const hamburgerIcon = document.getElementById("hamburgerIcon");
    const menuOverlay = document.getElementById("menuOverlay");
    if (tabsContainer) tabsContainer.classList.remove("open");
    if (hamburgerIcon) hamburgerIcon.classList.remove("active");
    if (menuOverlay) menuOverlay.classList.remove("open");
};

// También arreglar el wishesGrid que causa error
document.addEventListener("DOMContentLoaded", function() {
    // Arreglar wishesGrid
    const wishesGridElement = document.getElementById("wishesGrid");
    if (!wishesGridElement) {
        console.warn("Elemento wishesGrid no encontrado, creándolo...");
        // Crear el elemento si no existe
        const wishesCard = document.querySelector(".wishes-card");
        if (wishesCard) {
            const newGrid = document.createElement("div");
            newGrid.id = "wishesGrid";
            newGrid.className = "wishes-grid";
            wishesCard.insertBefore(newGrid, wishesCard.querySelector("button"));
            window.wishesGrid = newGrid;
        }
    }
});

// Sobrescribir la función mostrarAcertijo para agregar un botón de cierre que SÍ funcione
const mostrarAcertijoOriginal = mostrarAcertijo;
window.mostrarAcertijo = function() {
    mostrarAcertijoOriginal();
    
    // Esperar a que el modal se cree y agregar un botón de cierre adicional
    setTimeout(() => {
        const acertijoModal = document.querySelector('.acertijo-modal');
        if (acertijoModal) {
            // Verificar si ya existe el botón de cierre adicional
            if (!document.getElementById('btnCerrarForzoso')) {
                const btnCerrarForzoso = document.createElement("button");
                btnCerrarForzoso.id = "btnCerrarForzoso";
                btnCerrarForzoso.innerHTML = "❌ Volver a la página principal";
                btnCerrarForzoso.style.cssText = `
                    background: linear-gradient(135deg, #9b59b6, #6c3483);
                    border: none;
                    border-radius: 50px;
                    padding: 0.8rem 1.5rem;
                    font-size: 0.9rem;
                    font-weight: 600;
                    cursor: pointer;
                    color: white;
                    margin-top: 1rem;
                    width: 100%;
                    transition: all 0.3s;
                `;
                btnCerrarForzoso.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    window.cerrarAcertijoForzosamente();
                };
                
                const botonesContainer = acertijoModal.querySelector('.acertijo-botones');
                if (botonesContainer) {
                    botonesContainer.appendChild(btnCerrarForzoso);
                } else {
                    acertijoModal.querySelector('.acertijo-content').appendChild(btnCerrarForzoso);
                }
            }
        }
    }, 100);
};

// Reemplazar la función original
mostrarAcertijo = window.mostrarAcertijo;

// Agregar un botón flotante de emergencia (visible solo cuando el acertijo está abierto)
const emergencyBtn = document.createElement("button");
emergencyBtn.id = "emergencyCloseAcertijoBtn";
emergencyBtn.innerHTML = "🔙 Salir del acertijo";
emergencyBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 10001;
    background: #ff4444;
    color: white;
    border: none;
    border-radius: 50px;
    padding: 12px 20px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    display: none;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    transition: all 0.3s;
`;
emergencyBtn.onclick = function() {
    window.cerrarAcertijoForzosamente();
};
emergencyBtn.onmouseenter = function() {
    emergencyBtn.style.transform = "scale(1.05)";
    emergencyBtn.style.background = "#cc0000";
};
emergencyBtn.onmouseleave = function() {
    emergencyBtn.style.transform = "scale(1)";
    emergencyBtn.style.background = "#ff4444";
};
document.body.appendChild(emergencyBtn);

// Observar cuándo aparece el acertijo para mostrar el botón de emergencia
const observerAcertijo = new MutationObserver(function() {
    const acertijoModal = document.querySelector('.acertijo-modal');
    if (acertijoModal && acertijoModal.style.display !== "none") {
        emergencyBtn.style.display = "block";
    } else {
        emergencyBtn.style.display = "none";
    }
});
observerAcertijo.observe(document.body, { childList: true, subtree: true });

// Arreglar el error de wishesGrid
const originalLoadWishes = loadWishes;
window.loadWishes = function() {
    const wishesGridElement = document.getElementById("wishesGrid");
    if (!wishesGridElement) {
        console.log("wishesGrid no existe, omitiendo loadWishes");
        return;
    }
    originalLoadWishes();
};
loadWishes = window.loadWishes;

// También arreglar la referencia global de wishesGrid
if (!document.getElementById("wishesGrid")) {
    window.wishesGrid = null;
    console.log("Advertencia: El elemento 'wishesGrid' no existe en el HTML");
}