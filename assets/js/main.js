const resources = window.PORTFOLIO_RESOURCES || {};

const projectVideoSlots = {
  projectUvcPurge: "uvcVideo",
  projectAssistiveRobot: "assistiveRobotVideo",
  projectPhoenixRover: "phoenixRoverVideo",
  projectMccAssistant: "mccAssistantVideo",
  projectRemoteCloner: "remoteClonerVideo"
};

function assetUrl(src) {
  return src.startsWith("http")
    ? src
    : `../${src.replace(/^\.\//, "")}`;
}

function youtubeVideoId(value) {
  if (!value) return "";

  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return url.pathname.split("/").filter(Boolean)[0] || "";
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") return url.searchParams.get("v") || "";

      const parts = url.pathname.split("/").filter(Boolean);
      if (["embed", "shorts", "live"].includes(parts[0])) return parts[1] || "";
    }
  } catch {
    return "";
  }

  return "";
}

function renderImage(target, config, videoUrl = "") {
  const videoId = youtubeVideoId(videoUrl);
  const src = config?.src
    ? assetUrl(config.src)
    : videoId
      ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
      : "";

  if (!src) {
    target.replaceChildren();
    return;
  }

  const image = document.createElement("img");
  image.src = src;
  image.alt = config?.alt || "";
  image.loading = target.dataset.imageSlot === "profile" ? "eager" : "lazy";

  if (videoUrl) {
    const link = document.createElement("a");
    link.className = "media-video";
    link.href = videoUrl;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.setAttribute("aria-label", `Play video: ${config?.alt || "project"}`);

    const play = document.createElement("span");
    play.className = "media-play";
    play.setAttribute("aria-hidden", "true");
    play.textContent = "▶";

    link.append(image, play);
    target.replaceChildren(link);
  } else {
    target.replaceChildren(image);
  }

  target.classList.add("has-image");
}

function applyResources(root = document) {
  Object.entries(resources.images || {}).forEach(([slot, config]) => {
    const target = root.querySelector(`[data-image-slot="${slot}"]`);
    if (!target) return;

    const videoSlot = projectVideoSlots[slot];
    const videoUrl = videoSlot ? resources.links?.[videoSlot] || "" : "";
    renderImage(target, config, videoUrl);
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

const goatCounterSite = "https://rf-faisal.goatcounter.com";
const goatCounterPath = "/portfolio";

function loadVisitorAnalytics() {
  const script = document.createElement("script");
  script.src = "https://gc.zgo.at/count.js";
  script.async = true;
  script.dataset.goatcounter = `${goatCounterSite}/count`;
  script.dataset.goatcounterSettings = JSON.stringify({
    path: goatCounterPath,
    title: "M Rayhan Ferdous Faisal | Portfolio"
  });
  document.head.append(script);
}

function currentWeekStart() {
  const today = new Date();
  const daysSinceMonday = today.getDay() === 0 ? 6 : today.getDay() - 1;
  const monday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - daysSinceMonday
  );

  const year = monday.getFullYear();
  const month = String(monday.getMonth() + 1).padStart(2, "0");
  const day = String(monday.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function renderWeeklyVisitorCount() {
  const footer = document.querySelector(".foot");
  if (!footer) return;

  const counter = document.createElement("span");
  counter.className = "visitor-counter";
  counter.setAttribute("aria-live", "polite");

  try {
    const path = encodeURIComponent(goatCounterPath);
    const weekStart = currentWeekStart();
    const response = await fetch(
      `${goatCounterSite}/counter/${path}.json?start=${weekStart}`
    );

    const data = await response.json();
    if ((!response.ok && response.status !== 404) || !data.count) {
      throw new Error("Visitor counter unavailable");
    }

    counter.textContent = `Unique visitors this week: ${data.count}`;
    footer.append(counter);
  } catch {
    // Keep the footer clean if GoatCounter is blocked or temporarily unavailable.
  }
}

document.querySelector(".panel")?.classList.add("active");
document.getElementById("year").textContent = new Date().getFullYear();
applyResources();
bindContactForm();
loadVisitorAnalytics();
renderWeeklyVisitorCount();
