// ====== Helpers ======
const $ = (q, el=document) => el.querySelector(q);
const $$ = (q, el=document) => [...el.querySelectorAll(q)];

// ====== Mobile Nav ======
(function nav(){
  const toggle = $("#navToggle");
  const nav = $("#nav");
  if(!toggle || !nav) return;

  const closeNav = () => nav.classList.remove("open");

  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  // Close on link click (mobile)
  $$("#nav a").forEach(a => a.addEventListener("click", closeNav));

  // Close on outside click
  document.addEventListener("click", (e) => {
    const isClickInside = nav.contains(e.target) || toggle.contains(e.target);
    if(!isClickInside) closeNav();
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") closeNav();
  });
})();

// ====== Reveal on scroll ======
(function reveal(){
  const items = $$(".reveal");
  if(!items.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if(en.isIntersecting){
        en.target.classList.add("show");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => io.observe(el));
})();

// ====== WhatsApp Form ======
(function waForm(){
  const form = $("#waForm");
  if(!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = $("#name").value.trim();
    const phone = $("#phone").value.trim();
    const service = $("#service").value.trim();
    const msg = $("#message").value.trim();

    const lines = [
      "السلام عليكم،",
      `أنا: ${name || "بدون اسم"}`,
      `رقمي: ${phone || "غير مذكور"}`,
      `الخدمة المطلوبة: ${service || "غير محددة"}`,
      "",
      "التفاصيل:",
      msg || "—"
    ];

    const text = encodeURIComponent(lines.join("\n"));
    const waNumber = "966581761318"; // WhatsApp: 0581761318 -> KSA format
    const url = `https://wa.me/${waNumber}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });
})();
