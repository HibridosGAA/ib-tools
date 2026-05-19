// =========================================
//  IB TOOLKIT — js/tracker.js
//  Registra visitas con cookies + localStorage
// =========================================

// ── Cookie helpers ───────────────────────────────────────
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name) {
  return document.cookie.split('; ').reduce((acc, part) => {
    const [k, v] = part.split('=');
    return k === name ? decodeURIComponent(v) : acc;
  }, null);
}

// ── Generar ID único de dispositivo ─────────────────────
function getOrCreateDeviceId() {
  let id = getCookie('ib_device_id');
  if (!id) {
    id = 'dev_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
    setCookie('ib_device_id', id, 365);
  }
  return id;
}

// ── Detectar info del visitante ──────────────────────────
function getVisitorInfo() {
  const ua  = navigator.userAgent;
  const now = new Date();

  // OS simple
  let os = 'Desconocido';
  if (/Windows/.test(ua))      os = 'Windows';
  else if (/Mac/.test(ua))     os = 'macOS';
  else if (/Linux/.test(ua))   os = 'Linux';
  else if (/Android/.test(ua)) os = 'Android';
  else if (/iPhone|iPad/.test(ua)) os = 'iOS';

  // Navegador simple
  let browser = 'Desconocido';
  if (/Edg\//.test(ua))          browser = 'Edge';
  else if (/OPR\//.test(ua))     browser = 'Opera';
  else if (/Chrome/.test(ua))    browser = 'Chrome';
  else if (/Firefox/.test(ua))   browser = 'Firefox';
  else if (/Safari/.test(ua))    browser = 'Safari';

  return {
    id:       getOrCreateDeviceId(),
    fecha:    now.toLocaleDateString('es-PE', { day:'2-digit', month:'2-digit', year:'numeric' }),
    hora:     now.toLocaleTimeString('es-PE', { hour:'2-digit', minute:'2-digit', second:'2-digit' }),
    iso:      now.toISOString(),
    os,
    browser,
    pantalla: `${screen.width}×${screen.height}`,
    idioma:   navigator.language || '—',
    zona:     Intl.DateTimeFormat().resolvedOptions().timeZone || '—',
  };
}

// ── Registrar visita (llamada desde captcha.js) ──────────
function registerVisit() {
  const info     = getVisitorInfo();
  const STORE_KEY = 'ib_visits';

  // Leer historial previo
  let visits = [];
  try {
    visits = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
  } catch { visits = []; }

  // Agregar nueva visita
  visits.push(info);

  // Guardar (máximo 500 registros)
  if (visits.length > 500) visits = visits.slice(-500);
  localStorage.setItem(STORE_KEY, JSON.stringify(visits));

  // Actualizar cookie de "última visita"
  setCookie('ib_last_visit', info.iso, 365);
  setCookie('ib_visit_count', visits.length, 365);
}