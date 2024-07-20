//FAQ js
let bod = document.getElementById("FAQ");

let clickables = document.querySelectorAll(".clickable");
let extContents = document.querySelectorAll(".question_extended");

clickables.forEach((elem, index) => {
  let ext = extContents[index];

  elem.addEventListener("click", function () {
    if (elem.textContent === "▼") {
      elem.textContent = "▲";
      ext.classList.add("expanded");
      ext.style.display = "block";
      setTimeout(() => {
        ext.style.maxHeight = ext.scrollHeight + "px";
        ext.style.opacity = 1;
      }, 10);
    } else {
      elem.textContent = "▼";
      ext.style.maxHeight = 0;
      ext.style.opacity = 0;
      setTimeout(() => {
        ext.classList.remove("expanded");
        ext.style.display = "none";
      }, 500);
    }
  });
});
//Line and arrow js
const maxHeight = document.getElementsByTagName("body");
let currentHeight = 420;
document.addEventListener("scroll", function () {
  const line = document.getElementById("line");
  const arrow = document.getElementById("arrow");
  let scrollY = window.scrollY || window.pageYOffset;
  if (scrollY > maxHeight) {
    scrollY = maxHeight;
  }
  line.style.height = currentHeight + scrollY + "px";
  arrow.style.top = currentHeight + scrollY + 270 + "px";
});
const cookie_button = document.querySelector(".cookie-popup__button");
const cookie_popup = document.querySelector("#cookie-popup");

cookie_button.addEventListener("click", function () {
  cookie_popup.style.display = "None";
});
//SLIDER
document.addEventListener("DOMContentLoaded", () => {
  function createSlider() {
    let slideIndex = 0;
    let slideInterval;
    const slidesContainer = document.querySelector(".slides");
    const slides = document.querySelectorAll(".slides .slide");

    async function showSlides(index) {
      slideIndex = index;

      if (slideIndex >= slides.length) {
        slideIndex = 0;
      } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
      }

      slidesContainer.style.transition = "transform 0.5s ease-in-out";
      slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;

      await resetInterval();
    }

    function plusSlides(n) {
      showSlides(slideIndex + n);
    }

    function currentSlide(n) {
      showSlides(n);
    }

    function resetInterval() {
      return new Promise((resolve, reject) => {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
          plusSlides(1);
        }, 5000);
        resolve();
      });
    }

    document.querySelector(".prev-slide").addEventListener("click", () => {
      plusSlides(-1);
    });

    document.querySelector(".next-slide").addEventListener("click", () => {
      plusSlides(1);
    });

    resetInterval();
    showSlides(slideIndex);
  }
  createSlider();
});

document.querySelector(".burger").addEventListener("click", function () {
  this.classList.toggle("active");
  document.querySelector(".header__nav").classList.toggle("open");
});
