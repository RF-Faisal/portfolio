const resources = window.PORTFOLIO_RESOURCES || {};
const sectionIds = ["about", "resume", "projects", "achievements", "leadership", "contact"];
const buttons = [...document.querySelectorAll("[data-panel]")];
const panelRoot = document.getElementById("panel-root");

function applyResources(root = document) {
  Object.entries(resources.images || {}).forEach(([slot, config]) => {
    const target = root.querySelector(`[data-image-slot="${slot}"]`);
    if (!target || !config?.src) return;

    const image = document.createElement("img");
    image.src = config.src;
    image.alt = config.alt || "";
    image.loading = slot === "profile" ? "eager" : "lazy";
    target.replaceChildren(image);
    target.classList.add("has-image");
  });

  Object.entries(resources.links || {}).forEach(([slot, url]) => {
    if (!url) return;

    const href = slot === "email" ? `mailto:${url}` : url;
    root.querySelectorAll(`[data-link-slot="${slot}"]`).forEach((link) => {
      link.href = href;

      if (/^https?:/.test(url)) {
        link.target = "_blank";
        link.rel = "noreferrer";
      }
    });
  });
}

function bindContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const contactEmail = resources.links?.email || "";
    if (!contactEmail) {
      alert("Add your verified email address in assets/js/resources.js first.");
      return;
    }

    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    const message = document.getElementById("contact-message").value;
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nReply to: ${email}`);

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  });
}

function updateNavigation(id) {
  buttons.forEach((button) => {
    const selected = button.dataset.panel === id;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-selected", String(selected));
  });
}

async function openPanel(requestedId, updateHash = true) {
  const id = sectionIds.includes(requestedId) ? requestedId : "about";
  updateNavigation(id);

  panelRoot.innerHTML =
    '<div class="panel active"><p class="lead">Loading section…</p></div>';

  try {
    const response = await fetch(`sections/${id}.html`);
    if (!response.ok) throw new Error(`Unable to load ${id}`);

    panelRoot.innerHTML = await response.text();
    panelRoot.querySelector(".panel")?.classList.add("active");
    applyResources(panelRoot);
    bindContactForm();

    if (updateHash) {
      history.replaceState(null, "", `#${id}`);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    panelRoot.innerHTML =
      '<section class="panel active"><h2 class="title">Section unavailable</h2><p class="lead">Please refresh the page and try again.</p></section>';
    console.error(error);
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => openPanel(button.dataset.panel));
});

document.addEventListener("keydown", (event) => {
  if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;

  const current = buttons.findIndex((button) =>
    button.classList.contains("active")
  );
  const offset = event.key === "ArrowRight" ? 1 : -1;
  const next = (current + offset + buttons.length) % buttons.length;

  buttons[next].focus();
  openPanel(buttons[next].dataset.panel);
});

window.addEventListener("hashchange", () => {
  openPanel(location.hash.slice(1), false);
});

document.getElementById("year").textContent = new Date().getFullYear();
applyResources(document);
openPanel(location.hash.slice(1) || "about", false);
