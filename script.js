document.addEventListener("DOMContentLoaded", () => {
  const c = SITE_CONFIG;
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("introPhoto").src = c.profileImage;

  const phoneLink = document.getElementById("phoneLink");
  phoneLink.textContent = c.phone; phoneLink.href = `tel:${c.phone.replace(/[^0-9+]/g,"")}`;
  const emailLink = document.getElementById("emailLink");
  emailLink.textContent = c.email; emailLink.href = `mailto:${c.email}`;
  document.getElementById("whatsappFloat").href = `https://wa.me/${c.whatsapp}`;

  document.getElementById("socialLinks").innerHTML = Object.entries(c.socials)
    .map(([name,url]) => `<a href="${url}" target="_blank" rel="noopener">${name}</a>`).join("");

  document.getElementById("servicesGrid").innerHTML = SERVICES.map((s,i) => `
    <article class="service-card reveal" style="--delay:${i*40}ms">
      <div class="service-icon">${s[0]}</div><h3>${s[1]}</h3><p>${s[2]}</p>
      <a class="mini-btn" href="#contact">Hire Now ↗</a>
    </article>`).join("");

  document.getElementById("portfolioGrid").innerHTML = PORTFOLIO.map((p,i) => {
    const id = getYoutubeId(p[1]);
    return `<a class="work-card reveal" href="${p[1]}" target="_blank" rel="noopener">
      <div class="work-thumb">${id ? `<img loading="lazy" src="https://img.youtube.com/vi/${id}/hqdefault.jpg" alt="${p[0]}">` : `<div class="short-placeholder">▶</div>`}
      <span class="work-play">▶</span></div><div class="work-meta"><strong>${p[0]}</strong><span>Watch ↗</span></div></a>`;
  }).join("");

  document.getElementById("pricingGrid").innerHTML = PRICING.map((p,i) => `
    <article class="price-card ${i===2 ? "featured":""} reveal">
      ${i===2 ? '<div class="popular">MOST POPULAR</div>' : ""}
      <h3>${p[0]}</h3><div class="price">${p[1]}</div><ul>${p[2].map(x=>`<li>${x}</li>`).join("")}</ul>
      <a class="btn ${i===2 ? "btn-primary":"btn-glass"}" href="#contact">Hire Now</a>
    </article>`).join("");

  const menuBtn = document.querySelector(".menu-btn"), nav = document.querySelector(".nav-links");
  menuBtn.addEventListener("click",()=>nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

  document.getElementById("themeToggle").addEventListener("click",()=>{
    document.body.classList.toggle("light");
    document.getElementById("themeToggle").textContent = document.body.classList.contains("light") ? "☀" : "☾";
  });

  const range = document.getElementById("compareRange"), before = document.querySelector(".compare-before"), handle = document.querySelector(".compare-handle");
  function updateCompare(){ before.style.width = range.value+"%"; handle.style.left = range.value+"%"; }
  range.addEventListener("input", updateCompare); updateCompare();

  const topBtn = document.getElementById("topBtn");
  window.addEventListener("scroll",()=>topBtn.classList.toggle("show",scrollY>600));
  topBtn.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));

  const observer = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

  setTimeout(()=>document.getElementById("preloader").classList.add("hide"), 2000);
});

function getYoutubeId(url){
  const m=url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/))([^?&/]+)/);
  return m ? m[1] : null;
}

function sendMessage(e){
  e.preventDefault();
  const c=SITE_CONFIG;
  const subject=encodeURIComponent(`New Project Inquiry — ${document.getElementById("formService").value}`);
  const body=encodeURIComponent(
    `Name: ${document.getElementById("formName").value}\n`+
    `Email: ${document.getElementById("formEmail").value}\n`+
    `Service: ${document.getElementById("formService").value}\n\n`+
    `${document.getElementById("formMessage").value}`
  );
  window.location.href=`mailto:${c.email}?subject=${subject}&body=${body}`;
}
