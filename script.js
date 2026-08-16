// ============== Footer Year ==============
document.getElementById("year").textContent = new Date().getFullYear();

// ============== Dark Mode Toggle ==============
const themeToggle = document.getElementById("themeToggle");
const htmlEl = document.documentElement;
const themeIcon = themeToggle.querySelector("i");

function applyTheme(theme) {
  if (theme === "dark") {
    htmlEl.classList.add("dark");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    htmlEl.classList.remove("dark");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
}

const savedTheme = localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const isDark = htmlEl.classList.contains("dark");
  const newTheme = isDark ? "light" : "dark";
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});

// ============== Mobile Nav Toggle ==============
const navBurger = document.getElementById("navBurger");
const navLinksMobile = document.getElementById("navLinksMobile");

navBurger.addEventListener("click", () => {
  navLinksMobile.classList.toggle("open");
  const icon = navBurger.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

navLinksMobile.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinksMobile.classList.remove("open");
    const icon = navBurger.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");
  });
});

// ============== Reveal sections on scroll ==============
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

sections.forEach((section) => observer.observe(section));

// ============== Poems Lightbox ==============
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || "Poem full view";
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
  lightboxImg.src = "";
}

document.querySelectorAll(".poem-thumb, .poem-link").forEach((el) => {
  el.addEventListener("click", () => {
    const fullSrc = el.getAttribute("data-full");
    openLightbox(fullSrc);
  });
});

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("active")) {
    closeLightbox();
  }
});

// ============== Contact Form -> Gmail Compose ==============
const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields before sending.");
    return;
  }

  const body =
    `Hello Susant,\n\n` +
    `My name is ${name}.\n` +
    `Email: ${email}\n\n` +
    `Subject: ${subject}\n\n` +
    `Message:\n${message}\n\n` +
    `**Thank you** 😊`;

  const gmailUrl =
    "https://mail.google.com/mail/?view=cm&fs=1" +
    "&to=" + encodeURIComponent("ssntkhanal@gmail.com") +
    "&su=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);

  window.open(gmailUrl, "_blank");
  form.reset();
});

// ============== Back to Top ==============
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
