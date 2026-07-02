/* ============================================================
   COLOMBIA 5.0 — main.js
   Funciones: Toggle de idioma, pestañas bilingües,
              búsqueda en glosario, menú móvil, scroll-reveal,
              active nav link.
   ============================================================ */

/* ──────────────────────────────────────────────────────────
   1. TOGGLE DE IDIOMA
   Alterna la clase .lang-es / .lang-en en <body>.
   El CSS oculta automáticamente .es o .en según la clase activa.
   ────────────────────────────────────────────────────────── */
function toggleLang() {
  const body  = document.body;
  const flag  = document.getElementById('langFlag');
  const label = document.getElementById('langLabel');

  if (body.classList.contains('lang-es')) {
    /* Cambiar a inglés */
    body.classList.replace('lang-es', 'lang-en');
    flag.textContent  = '🇨🇴';
    label.textContent = 'ES';
    document.documentElement.lang = 'en';
  } else {
    /* Volver a español */
    body.classList.replace('lang-en', 'lang-es');
    flag.textContent  = '🇬🇧';
    label.textContent = 'EN';
    document.documentElement.lang = 'es';
  }
}

/* ──────────────────────────────────────────────────────────
   2. PESTAÑAS BILINGÜES dentro de cada conferencia
   prefixId: 'c1' o 'c2'  |  lang: 'es' o 'en'
   ────────────────────────────────────────────────────────── */
function switchTab(prefixId, lang) {
  /* Ocultar todos los contenidos de este grupo */
  document.querySelectorAll(`[id^="${prefixId}-"]`).forEach(el => {
    el.classList.remove('active');
  });

  /* Mostrar el seleccionado */
  const target = document.getElementById(`${prefixId}-${lang}`);
  if (target) target.classList.add('active');

  /* Actualizar estilos de los botones del grupo */
  const tabIndex = prefixId.slice(-1); /* '1' o '2' */
  const tabs = document.querySelectorAll(`#tabs${tabIndex} .b-tab`);
  tabs.forEach((btn, i) => {
    const isActive = (lang === 'es' && i === 0) || (lang === 'en' && i === 1);
    btn.classList.toggle('active', isActive);
  });
}

/* ──────────────────────────────────────────────────────────
   3. BÚSQUEDA EN EL GLOSARIO
   Filtra las tarjetas en tiempo real comparando el texto
   con el término EN, la traducción ES y la definición.
   ────────────────────────────────────────────────────────── */
function filterGlos() {
  const query = document.getElementById('glosSearch').value.toLowerCase().trim();
  const items = document.querySelectorAll('.glos-item');

  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(query) ? '' : 'none';
  });
}

/* ──────────────────────────────────────────────────────────
   4. MENÚ MÓVIL (hamburguesa)
   ────────────────────────────────────────────────────────── */
function toggleMenu() {
  document.getElementById('navMenu').classList.toggle('open');
}

/* Cerrar menú al hacer clic en cualquier enlace de la nav */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('navMenu').classList.remove('open');
    });
  });
});

/* ──────────────────────────────────────────────────────────
   5. SCROLL-REVEAL
   Usa IntersectionObserver para animar los elementos .reveal.
   Una vez visible, no vuelve a animarse (unobserve).
   ────────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});

/* ──────────────────────────────────────────────────────────
   6. ACTIVE NAV LINK al hacer scroll
   Resalta el enlace de nav correspondiente a la sección visible.
   ────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${entry.target.id}`;
            link.style.color = isActive ? 'var(--c10)' : '';
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(s => activeObserver.observe(s));
});
