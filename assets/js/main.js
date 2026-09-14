const resources = window.PORTFOLIO_RESOURCES || {};

function applyResources(root = document) {
  Object.entries(resources.images || {}).forEach(([slot, config]) => {
    const target = root.querySelector(`[data-image-slot="${slot}"]`);
    if (!target || !config?.src) return;

    const image = document.createElement("img");
    image.src = config.src.startsWith("http")
      ? config.src
      : `../${config.src.replace(/^\.\//, "")}`;
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

    window.location.href =
      `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
applyResources();
bindContactForm();
