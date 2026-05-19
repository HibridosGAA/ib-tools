// =========================================
//  IB TOOLKIT — js/main.js
// =========================================

// --- Year in footer ---
document.getElementById('year').textContent = new Date().getFullYear();

// --- Subtle parallax on background orbs ---
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  const orb3 = document.querySelector('.orb-3');

  if (orb1) orb1.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
  if (orb2) orb2.style.transform = `translate(${-x * 0.4}px, ${-y * 0.4}px)`;
  if (orb3) orb3.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
});

// --- Card ripple on click ---
document.querySelectorAll('.tool-card').forEach(card => {
  card.addEventListener('click', function (e) {
    // Create ripple
    const ripple = document.createElement('span');
    const rect   = this.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height) * 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${e.clientX - rect.left - size / 2}px;
      top: ${e.clientY - rect.top - size / 2}px;
      background: rgba(255,255,255,0.06);
      border-radius: 50%;
      transform: scale(0);
      animation: rippleAnim 0.6s ease-out forwards;
      pointer-events: none;
      z-index: 1;
    `;

    this.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

// --- Inject ripple keyframes once ---
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleAnim {
    to { transform: scale(1); opacity: 0; }
  }
`;
document.head.appendChild(style);

// --- Intersection Observer: re-trigger fade on scroll (if user scrolls back) ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.tool-card').forEach(card => {
  observer.observe(card);
});