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
  const digits = profileContent.whatsappNumber.replace(/\D/g, "");
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
  const cvUrl = safeWebUrl(profileContent.cvUrl);
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
  const safeUrl = safeWebUrl(profileContent.linkedinUrl);
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

renderProjects();
renderProfileDetails();
renderContactExtras();
renderLinkedIn();
