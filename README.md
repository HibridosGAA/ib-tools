# 📚 IB Toolkit

Una página web con acceso rápido a todas las herramientas para la preparación del Bachillerato Internacional.

## 🗂 Estructura del proyecto

```
ib-tools/
├── index.html        ← Página principal
├── css/
│   └── style.css     ← Estilos (diseño completo)
├── js/
│   └── main.js       ← Interactividad y animaciones
├── assets/           ← (para imágenes futuras)
├── robots.txt        ← SEO: instrucciones para bots
├── sitemap.xml       ← SEO: mapa del sitio
├── .gitignore        ← Archivos ignorados por Git
└── README.md         ← Este archivo
```

## 🛠 Herramientas incluidas

| Herramienta | Descripción | Enlace |
|---|---|---|
| IBO Resource Library | Recursos oficiales del IBO | [ibo.org](https://www.ibo.org/become-an-ib-school/useful-resources/resource-library/) |
| Classpad Math | Calculadora CAS online | [classpad.net](https://classpad.net/note/#/tools/math) |
| Clastify IA | Ejemplos de IAs calificadas | [clastify.com](https://www.clastify.com/ia) |
| ELT NGL Practice | Práctica de inglés | [eltngl.com](https://learn.eltngl.com/dashboard/practice) |
| Blockly Games | Programación visual | [blockly.games](https://blockly.games/?lang=en) |
| Biology for Life | Recursos de biología IB | [biologyforlife.com](https://www.biologyforlife.com/) |
| Wayground | Comunidad de estudiantes IB | [wayground.com](https://wayground.com/join) |

---

## 🚀 Despliegue paso a paso

### 1. VS Code — Abrir el proyecto
```bash
# Abre la carpeta en VS Code
code ib-tools/
```
Instala la extensión **Live Server** para previsualizar en tiempo real.

---

### 2. Git — Inicializar y subir a GitHub

```bash
# Dentro de la carpeta ib-tools/
git init
git add .
git commit -m "🚀 Initial commit — IB Toolkit"

# Crea un repo en github.com y luego conecta:
git remote add origin https://github.com/TU_USUARIO/ib-tools.git
git branch -M main
git push -u origin main
```

---

### 3. Render — Publicar gratis

1. Ve a [render.com](https://render.com) y crea una cuenta.
2. Haz clic en **New → Static Site**.
3. Conecta tu repositorio de GitHub (`ib-tools`).
4. Configura:
   - **Branch:** `main`
   - **Build Command:** *(dejar vacío — es solo HTML)*
   - **Publish Directory:** `.` *(punto — raíz del proyecto)*
5. Haz clic en **Create Static Site**.
6. Tu URL será: `https://ib-toolkit.onrender.com` (o el nombre que elijas).

Cada vez que hagas `git push`, Render actualiza la página automáticamente.

---

### 4. Optime Robot — SEO

1. Ve a [optimeRobot.com](https://www.optimerobot.com) o herramienta similar.
2. Ingresa tu URL de Render.
3. El archivo `robots.txt` ya está configurado.
4. Actualiza `sitemap.xml` con tu URL real de Render.

---

## ✏️ Cómo agregar más herramientas

En `index.html`, dentro de `<div class="tools-grid">`, copia y pega un bloque como este:

```html
<a class="tool-card" href="URL_DEL_SITIO" target="_blank" rel="noopener noreferrer">
  <div class="card-glow"></div>
  <div class="card-icon">🔗</div>
  <div class="card-body">
    <span class="card-tag">Categoría</span>
    <h2 class="card-title">Nombre del Sitio</h2>
    <p class="card-desc">Breve descripción de para qué sirve.</p>
  </div>
  <span class="card-arrow">→</span>
</a>
```

---

*Hecho para estudiantes IB 💛*