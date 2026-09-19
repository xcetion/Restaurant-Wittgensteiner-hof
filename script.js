// Zentrale Elemente der Seite. data-Attribute halten das JavaScript vom Design getrennt.
const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");
const form = document.querySelector("[data-reservation-form]");
const formStatus = document.querySelector("[data-form-status]");

// Gibt der Kopfzeile beim Scrollen einen sichtbaren Hintergrund und Schatten.
const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

// Schliesst die mobile Navigation nach einem Klick oder bei Escape.
const closeNav = () => {
  nav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Navigation \u00f6ffnen");
};

// Oeffnet und schliesst die mobile Navigation.
navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Navigation schlie\u00dfen" : "Navigation \u00f6ffnen");
});

nav.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    closeNav();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNav();
  }
});

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

// Das Copyright-Jahr wird ohne manuelle Pflege aktuell gehalten.
if (year) {
  year.textContent = new Date().getFullYear();
}

// Formulardaten werden als vorbereitete E-Mail im Standard-Mailprogramm geoeffnet.
form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.reportValidity()) {
    return;
  }

  const email = form.dataset.email;
  const data = new FormData(form);
  const lines = Array.from(data.entries())
    .filter(([, value]) => String(value).trim() !== "")
    .map(([label, value]) => `${label}: ${value}`);

  const subject = encodeURIComponent("Reservierungsanfrage Wittgensteiner Hof");
  const body = encodeURIComponent(lines.join("\n"));

  formStatus.textContent = "Die E-Mail-Anfrage wird vorbereitet.";
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
});
