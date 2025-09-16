function toggleMenu(){
  const navLinks = document.getElementById('nav-links');

navLinks.classList.toggle('active');
}

function modeToggle(){
  document.documentElement.classList.toggle('darkmode');
}

function toggleDropdown(event){
  const dropdowns = event.target.closest('.dropdown');

  if (dropdowns){
    const dropdownContent = document.querySelector('.dropdown-content');
    const chevronDown = document.querySelector('.fa-chevron-down');

    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none"
      chevronDown.style.transform = "rotate(0deg)"
    }

    else{
      dropdownContent.style.display = "block"
      chevronDown.style.transform = "rotate(180deg)"
    }
  }
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
