

// Respect reduced-motion and smaller screens
const reduceMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
  window.innerWidth < 768;

document.addEventListener("DOMContentLoaded", () => {
  // Accessible dropdown behavior
  const toggle = document.getElementById("servicesToggle");
  const menu = document.getElementById("services-menu");

  function closeMenu() {
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("open");
    menu.hidden = true;
  }
  function openMenu() {
    toggle.setAttribute("aria-expanded", "true");
    menu.classList.add("open");
    menu.hidden = false;
  }
  function toggleMenuA11y() {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  }

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenuA11y();
  });

  // Close on outside click / Escape
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && e.target !== toggle) closeMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Keyboard support for div-buttons (mode-toggle + hamburger)
  document.querySelectorAll('[role="button"][tabindex="0"]').forEach((el) => {
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        el.click();
      }
    });
  });

  // AOS init
  AOS.init({
    duration: 500,
    easing: "ease-out-cubic",
    offset: 80,
    once: true,
    anchorPlacement: "top-bottom",
    disable: reduceMotion,
  });
});

window.addEventListener("load", () =>
  setTimeout(() => AOS.refresh(), 300)
);

function toggleMenu() {
  const navLinks = document.getElementById('nav-links');

  navLinks.classList.toggle('active');
}

function modeToggle() {
  document.documentElement.classList.toggle('darkmode');
}

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slide");
  const prevBtn = document.querySelector(".card-btn.prev");
  const nextBtn = document.querySelector(".card-btn.next");
  const dotsContainer = document.querySelector(".dots");

  let currentIndex = 0;
  const totalSlides = slides.length;

  console.log(totalSlides);

  // Generate dots dynamically
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");

    console.log(dot);

    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = i;
      showSlide(currentIndex);
    });

    dotsContainer.appendChild(dot);
  });
  const dots = document.querySelectorAll(".dot");

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      dots[i].classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
        dots[i].classList.add("active");
      }
    });
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
  };

  nextBtn.addEventListener("click", () => nextSlide());
  prevBtn.addEventListener("click", () => prevSlide());

  // Auto play every 5 seconds
  setInterval(() => nextSlide(), 5000);

  // Show first slide initially
  showSlide(currentIndex);
});
