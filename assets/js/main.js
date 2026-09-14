const resources = window.PORTFOLIO_RESOURCES || {};

function applyImage(slot, config) {
  const target = document.querySelector(`[data-image-slot="${slot}"]`);
  if (!target || !config?.src) return;
  const image = document.createElement("img");
  image.src = config.src;
  image.alt = config.alt || "";
  image.loading = slot === "profile" ? "eager" : "lazy";
  target.replaceChildren(image);
  target.classList.add("has-image");
}

Object.entries(resources.images || {}).forEach(([slot, config]) => applyImage(slot, config));

Object.entries(resources.links || {}).forEach(([slot, url]) => {
  if (!url) return;
  const href = slot === "email" ? `mailto:${url}` : url;
  document.querySelectorAll(`[data-link-slot="${slot}"]`).forEach(link => {
    link.href = href;
    if (/^https?:/.test(url)) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }
  });
});

const bs=[...document.querySelectorAll("[data-panel]")],ps=[...document.querySelectorAll(".panel")];function openPanel(id,hash=true){id=document.getElementById(id)?id:"about";bs.forEach(b=>{let on=b.dataset.panel===id;b.classList.toggle("active",on);b.setAttribute("aria-selected",on)});ps.forEach(p=>p.classList.toggle("active",p.id===id));if(hash)history.replaceState(null,"","#"+id);scrollTo({top:0,behavior:"smooth"})}bs.forEach(b=>b.onclick=()=>openPanel(b.dataset.panel));document.addEventListener("keydown",e=>{if(!["ArrowLeft","ArrowRight"].includes(e.key))return;let i=bs.findIndex(b=>b.classList.contains("active")),n=e.key==="ArrowRight"?(i+1)%bs.length:(i-1+bs.length)%bs.length;bs[n].focus();openPanel(bs[n].dataset.panel)});document.getElementById("year").textContent=new Date().getFullYear();const CONTACT_EMAIL=resources.links?.email || "";document.getElementById("contact-form").addEventListener("submit",e=>{e.preventDefault();if(!CONTACT_EMAIL){alert("Add your verified email address to CONTACT_EMAIL in index.html first.");return}const n=document.getElementById("contact-name").value,m=document.getElementById("contact-message").value,from=document.getElementById("contact-email").value;location.href=`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Portfolio enquiry from "+n)}&body=${encodeURIComponent(m+"\n\nReply to: "+from)}`});openPanel(location.hash.slice(1)||"about",false);
