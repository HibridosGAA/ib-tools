// =========================================
//  IB TOOLKIT — js/captcha.js
//  CAPTCHA con Los Backyardigans 🎉
// =========================================

const CHARACTERS = [
  { name: 'Uniqua',  file: 'assets/b1.png' },
  { name: 'Pablo',   file: 'assets/b2.jpg' },
  { name: 'Tyrone',  file: 'assets/b3.png' },
  { name: 'Austin',  file: 'assets/b4.jpg' },
  { name: 'Tasha',   file: 'assets/b5.jpg' },
];

const TOTAL_ROUNDS = 3;
let currentRound  = 0;
let usedTargets   = [];
let currentTarget = null;

// ── Leer cookie ──────────────────────────────────────────
function getCookie(name) {
  return document.cookie.split('; ').reduce((acc, part) => {
    const [k, v] = part.split('=');
    return k === name ? decodeURIComponent(v) : acc;
  }, null);
}

// ── Utilidades ──────────────────────────────────────────
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function updateDots() {
  for (let i = 0; i < TOTAL_ROUNDS; i++) {
    const dot = document.getElementById(`dot-${i}`);
    if (!dot) continue;
    dot.classList.toggle('active',    i <= currentRound);
    dot.classList.toggle('completed', i < currentRound);
  }
}

// ── Renderizar una ronda ────────────────────────────────
function renderRound() {
  const grid     = document.getElementById('captcha-grid');
  const question = document.getElementById('captcha-question');
  const feedback = document.getElementById('captcha-feedback');

  feedback.textContent = '';
  feedback.className   = 'captcha-feedback';

  const available = CHARACTERS.filter(c => !usedTargets.includes(c.name));
  currentTarget   = available[Math.floor(Math.random() * available.length)];
  usedTargets.push(currentTarget.name);

  question.textContent = `¿Cuál es ${currentTarget.name}?`;

  const shuffled = shuffle(CHARACTERS);
  grid.innerHTML = '';

  shuffled.forEach(char => {
    const btn = document.createElement('button');
    btn.className = 'captcha-char';
    btn.innerHTML = `<img src="${char.file}" alt="${char.name}" draggable="false" />`;
    btn.addEventListener('click', () => handleAnswer(char.name));
    grid.appendChild(btn);
  });

  updateDots();
}

// ── Manejar respuesta ────────────────────────────────────
function handleAnswer(chosen) {
  const feedback = document.getElementById('captcha-feedback');
  const grid     = document.getElementById('captcha-grid');

  if (chosen === currentTarget.name) {
    feedback.textContent = 'Puede serrr';
    feedback.className   = 'captcha-feedback success';

    [...grid.querySelectorAll('.captcha-char')].forEach(btn => {
      if (btn.querySelector('img').alt === chosen) {
        btn.classList.add('correct');
      }
      btn.disabled = true;
    });

    currentRound++;
    updateDots();

    if (currentRound >= TOTAL_ROUNDS) {
      setTimeout(openPage, 900);
    } else {
      setTimeout(renderRound, 800);
    }

  } else {
    feedback.innerHTML = `Eso es ${chosen}, creo que eres therian, preocúpate on
      <br/><img 
        src="assets/therian1.jpg"
        alt="creo que eres therian"
        width="150" height="100"
        onerror="this.style.display='none';"
      />`;
    feedback.className = 'captcha-feedback error';

    const box = document.querySelector('.captcha-box');
    box.classList.add('shake');
    box.addEventListener('animationend', () => box.classList.remove('shake'), { once: true });

    [...grid.querySelectorAll('.captcha-char')].forEach(btn => {
      if (btn.querySelector('img').alt === chosen) {
        btn.classList.add('wrong');
        setTimeout(() => btn.classList.remove('wrong'), 600);
      }
    });
  }
}

// ── Abrir página tras pasar el CAPTCHA ──────────────────
function openPage() {
  // Guardar cookie 30 días → la próxima vez salta el CAPTCHA
  const expires = new Date(Date.now() + 30 * 864e5).toUTCString();
  document.cookie = `ib_passed=1; expires=${expires}; path=/; SameSite=Lax`;

  const overlay = document.getElementById('captcha-overlay');
  overlay.classList.add('captcha-exit');

  if (typeof registerVisit === 'function') registerVisit();

  overlay.addEventListener('animationend', () => {
    overlay.style.display = 'none';
    document.body.classList.remove('locked');
  }, { once: true });
}

// ── Inicializar ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // ✅ ¿Ya pasó el CAPTCHA antes? → entrar directo
  if (getCookie('ib_passed') === '1') {
    document.getElementById('captcha-overlay').style.display = 'none';
    document.body.classList.remove('locked');
    if (typeof registerVisit === 'function') registerVisit();
    return;
  }

  // Primera vez → mostrar CAPTCHA
  document.body.classList.add('locked');
  renderRound();
});