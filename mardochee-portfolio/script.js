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
  container.append(link);
}

function renderProjects() {
  if (!projectGrid || projects.length === 0) return;
  projectGrid.replaceChildren();
  projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";
    const heading = document.createElement("h3");
    heading.textContent = project.title || "Projet";
    card.append(heading);
    const description = document.createElement("p");
    description.className = "project-description";
    description.textContent = project.description || "";
    card.append(description);

    if (Array.isArray(project.technologies) && project.technologies.length) {
      const technologies = document.createElement("ul");
      technologies.className = "tag-list project-tags";
      project.technologies.forEach((technology) => {
        const tag = document.createElement("li");
        tag.textContent = technology;
        technologies.append(tag);
      });
      card.append(technologies);
    }

    const links = document.createElement("div");
    links.className = "project-links";
    addProjectLink(links, "Code GitHub", project.github, "Voir le code de " + (project.title || "ce projet") + " sur GitHub");
    addProjectLink(links, "Démo", project.demo, "Voir la démonstration de " + (project.title || "ce projet"));
    if (links.childElementCount) card.append(links);
    projectGrid.append(card);
  });
}

function fillTags(listId, values) {
  const list = document.getElementById(listId);
  if (!list || !Array.isArray(values) || values.length === 0) return false;
  values.filter(Boolean).forEach((value) => {
    const tag = document.createElement("li");
    tag.textContent = value;
    list.append(tag);
  });
  return list.childElementCount > 0;
}

function renderProfileDetails() {
  const skillsVisible = fillTags("skillTags", profileContent.skills);
  const languagesVisible = fillTags("languageTags", profileContent.languages);
  const objective = document.getElementById("objectiveText");
  if (objective && profileContent.objective.trim()) objective.textContent = profileContent.objective;
  const blocks = [
    ["skillsBlock", skillsVisible],
    ["languagesBlock", languagesVisible],
    ["objectiveBlock", Boolean(profileContent.objective.trim())]
  ];
  blocks.forEach(([id, visible]) => {
    const block = document.getElementById(id);
    if (block) block.hidden = !visible;
  });
  const details = document.getElementById("aboutDetails");
  if (details) details.hidden = !blocks.some(([, visible]) => visible);
}

function renderContactExtras() {
  const extras = document.getElementById("contactExtras");
  if (!extras) return;
  const whatsappNumber = String(profileContent.whatsappNumber ?? "");
  const digits = whatsappNumber.replace(/\D/g, "");
  if (digits) {
    const whatsapp = document.createElement("a");
    whatsapp.className = "button button-outline";
    whatsapp.href = "https://wa.me/" + digits;
    whatsapp.target = "_blank";
    whatsapp.rel = "noopener noreferrer";
    whatsapp.setAttribute("aria-label", "Contacter Mardochée Matete sur WhatsApp");
    whatsapp.textContent = "WhatsApp";
    extras.append(whatsapp);
  }
  const cvUrl = safeWebUrl(String(profileContent.cvUrl ?? ""));
  if (cvUrl) {
    const cv = document.createElement("a");
    cv.className = "button button-outline";
    cv.href = cvUrl;
    cv.setAttribute("aria-label", "Télécharger le CV de Mardochée Matete");
    cv.setAttribute("download", "CV_Mardochee_Matete.pdf");
    cv.textContent = "Télécharger mon CV";
    extras.append(cv);
  }
}

function renderLinkedIn() {
  const safeUrl = safeWebUrl(String(profileContent.linkedinUrl ?? ""));
  const placeholder = document.getElementById("linkedinCard");
  if (!safeUrl || !placeholder) return;
  const link = document.createElement("a");
  link.className = "social-card";
  link.href = safeUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", "LinkedIn — profil de Mardochée Matete");
  link.innerHTML = placeholder.innerHTML;
  link.querySelector("small").textContent = "Profil de Mardochée";
  placeholder.replaceWith(link);
}

const translations = {
  fr: {
    navHome: "Accueil",
    navAbout: "À propos",
    navSkills: "Compétences",
    navProjects: "Projets",
    navSocials: "Réseaux sociaux",
    navContact: "Contact",
    navUniversity: "Université",
    themeLabel: "Thème",
    languageLabel: "Langue",
    currentTheme: "Mode actuel",
    pageTitle: "Mardochée Matete — Étudiant en génie logiciel",
    heroIntro: "ÉTUDIANT · LUBUMBASHI, RDC",
    heroButtonProjects: "Voir mes projets",
    heroButtonContact: "Me contacter",
    heroLead: "Étudiant en génie logiciel à l’Université Protestante de Lubumbashi, je construis mes bases en développement pour créer des solutions numériques utiles.",
    footerCopy: "© 2026 Mardochée Matete",
    topBack: "Retour en haut"
  },
  en: {
    navHome: "Home",
    navAbout: "About",
    navSkills: "Skills",
    navProjects: "Projects",
    navSocials: "Socials",
    navContact: "Contact",
    navUniversity: "University",
    themeLabel: "Theme",
    languageLabel: "Language",
    currentTheme: "Current mode",
    pageTitle: "Mardochée Matete — Software Engineering Student",
    heroIntro: "STUDENT · LUBUMBASHI, DRC",
    heroButtonProjects: "View my projects",
    heroButtonContact: "Contact me",
    heroLead: "A software engineering student at the Université Protestante de Lubumbashi, I am building the foundations of my development skills to create useful digital solutions.",
    footerCopy: "© 2026 Mardochée Matete",
    topBack: "Back to top"
  }
};

function getStoredValue(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

const storedLanguage = getStoredValue("portfolio-lang", "fr");
const initialLanguage = storedLanguage === "en" ? "en" : "fr";
const storedTheme = getStoredValue("portfolio-theme", "");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const initialTheme = storedTheme || systemTheme;

document.documentElement.lang = initialLanguage;
document.documentElement.dataset.theme = initialTheme;
document.body.dataset.theme = initialTheme;

function applyTheme(theme) {
  const safeTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = safeTheme;
  document.body.dataset.theme = safeTheme;
  try {
    localStorage.setItem("portfolio-theme", safeTheme);
  } catch {
    // Ignore storage issues in restricted browser contexts.
  }

  const themeButton = document.querySelector(".theme-toggle");
  const themeText = document.querySelector(".theme-toggle .theme-text");
  if (themeButton) {
    const isDark = safeTheme === "dark";
    themeButton.setAttribute("aria-pressed", String(isDark));
    themeButton.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
  }
  if (themeText) {
    themeText.textContent = safeTheme === "dark" ? "Dark" : "Light";
  }
}

function applyTranslations(lang) {
  const language = translations[lang] ? lang : "fr";
  const current = translations[language];
  document.documentElement.lang = language;
  document.documentElement.dataset.lang = language;
  try {
    localStorage.setItem("portfolio-lang", language);
  } catch {
    // Ignore storage issues in restricted browser contexts.
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const text = current[element.dataset.i18n];
    if (text) {
      element.textContent = text;
    }
  });

  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    const text = current[element.dataset.i18nTitle];
    if (text) {
      element.title = text;
    }
  });

  document.querySelectorAll(".lang-switcher button[data-lang]").forEach((button) => {
    const isActive = button.dataset.lang === language;
    button.setAttribute("aria-pressed", String(isActive));
    button.classList.toggle("is-active", isActive);
  });

  document.title = document.body.dataset.pageTitle || document.title;
}

function initThemeControls() {
  const themeButton = document.querySelector(".theme-toggle");
  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  }

  const languageButtons = document.querySelectorAll(".lang-switcher button[data-lang]");
  languageButtons.forEach((button) => {
    button.addEventListener("click", () => applyTranslations(button.dataset.lang));
  });

  const navToggle = document.querySelector(".nav-toggle");
  const topbar = document.querySelector(".topbar");
  if (navToggle && topbar) {
    navToggle.addEventListener("click", () => {
      const nextState = !topbar.classList.contains("nav-open");
      topbar.classList.toggle("nav-open", nextState);
      navToggle.setAttribute("aria-expanded", String(nextState));
    });
  }

  const navLinks = document.querySelectorAll(".topbar nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        topbar.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

renderProjects();
renderProfileDetails();
renderContactExtras();
renderLinkedIn();
applyTheme(initialTheme);
applyTranslations(initialLanguage);
initThemeControls();
