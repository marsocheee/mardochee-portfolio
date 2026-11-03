// Ajoute chaque projet sur une seule ligne avec ses infos vérifiées.
// Exemple de structure : { title: "...", description: "...", technologies: ["..."], github: "...", demo: "..." }
const projects = [];


// TODO: Ajouter compétences, langues, objectif, URL LinkedIn,
// numéro WhatsApp international et chemin du CV quand ils seront fournis.
const profileContent = {
  skills: [],
  languages: [],
  objective: "",
  linkedinUrl: "",
  whatsappNumber: "",
  cvUrl: ""
};


const projectGrid = document.getElementById("projectGrid");
const safeWebUrl = (value) => {
  if (!value) return "";
  try {
    const url = new URL(value, window.location.href);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
  } catch {
    return "";
  }
};


function addProjectLink(container, label, url, accessibleLabel) {
  const safeUrl = safeWebUrl(url);
  if (!safeUrl) return;
  const link = document.createElement("a");
  link.className = "project-link";
  link.href = safeUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", accessibleLabel);
  link.textContent = label;

(function () {
  const THEME_KEY = 'portfolio-theme';

  function getStoredTheme() {
    try {
      const storedTheme = localStorage.getItem(THEME_KEY);
      if (storedTheme === 'dark' || storedTheme === 'light') return storedTheme;
    } catch (error) {
      console.warn('Theme storage unavailable:', error);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    const normalizedTheme = theme === 'dark' ? 'dark' : 'light';
    document.body.dataset.theme = normalizedTheme;
    document.documentElement.dataset.theme = normalizedTheme;

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', normalizedTheme === 'dark' ? '#0d1522' : '#f6f7fb');
    }

    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    const isDark = normalizedTheme === 'dark';
    toggle.setAttribute('aria-label', isDark ? 'Activer le mode clair' : 'Activer le mode sombre');
    toggle.setAttribute('aria-pressed', String(isDark));
    const icon = toggle.querySelector('.theme-toggle__icon');
    const label = toggle.querySelector('.theme-toggle__label');
    if (icon) icon.textContent = isDark ? '☀' : '☾';
    if (label) label.textContent = isDark ? 'Clair' : 'Sombre';
  }

  function createThemeToggle() {
    const topbar = document.querySelector('.topbar');
    if (!topbar) return;
    if (topbar.querySelector('.theme-toggle')) return;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'theme-toggle';
    toggle.setAttribute('aria-label', 'Activer le mode sombre');
    toggle.setAttribute('aria-pressed', 'false');
    toggle.innerHTML = '<span class="theme-toggle__icon" aria-hidden="true">☾</span><span class="theme-toggle__label">Sombre</span>';

    toggle.addEventListener('click', () => {
      const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_KEY, nextTheme);
      } catch (error) {
        console.warn('Unable to save theme:', error);
      }
      applyTheme(nextTheme);
    });

    topbar.appendChild(toggle);
  }

  function initializeTheme() {
    createThemeToggle();
    const savedTheme = getStoredTheme();
    applyTheme(savedTheme);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTheme, { once: true });
  } else {
    initializeTheme();
  }
})();
