// =======================
// SCROLL REVEAL (Optimized)
// =======================
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}
function toggleMenu() {
  const nav = document.querySelector(".nav-links");
  const burger = document.querySelector(".hamburger");

  nav.classList.toggle("active");
  burger.classList.toggle("active");
}
// =======================
// AUTO-CLOSE MOBILE MENU
// =======================
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const nav = document.querySelector(".nav-links");
    const burger = document.querySelector(".hamburger");

    // Close menu
    nav.classList.remove("active");
    burger.classList.remove("active");
  });
});
document.addEventListener("click", (e) => {
  const nav = document.querySelector(".nav-links");
  const burger = document.querySelector(".hamburger");

  if (!nav.contains(e.target) && !burger.contains(e.target)) {
    nav.classList.remove("active");
    burger.classList.remove("active");
  }
});

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // run once on load



// =======================
// TYPING EFFECT (Safe)
// =======================
const typingElement = document.querySelector(".typing");

if (typingElement) {
  const textArray = ["Full-Stack Developer", "Android Engineer", "AI Builder"];
  let i = 0, j = 0;
  let current = "";
  let isDeleting = false;

  function type() {
    if (!isDeleting && j <= textArray[i].length) {
      current = textArray[i].substring(0, j++);
    } else if (isDeleting && j >= 0) {
      current = textArray[i].substring(0, j--);
    }

    typingElement.textContent = current;

    if (j === textArray[i].length) isDeleting = true;
    if (j === 0) {
      isDeleting = false;
      i = (i + 1) % textArray.length;
    }

    setTimeout(type, isDeleting ? 50 : 100);
  }

  type();
}



// =======================
// CONTACT FORM (FormSubmit AJAX)
// =======================
const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const data = new FormData(form);

    fetch("https://formsubmit.co/ajax/b7dd2c89223cf8bfa7b60de9b9e15caa", {
      method: "POST",
      body: data
    })
    .then(response => response.json())
    .then(data => {
      showPopup();
      form.reset();
    })
    .catch(error => {
      alert("Something went wrong. Try again.");
    });
  });
}



// =======================
// POPUP CONTROL
// =======================
function showPopup() {
  const popup = document.getElementById("success-popup");
  if (popup) {
    popup.classList.add("show");

    setTimeout(() => {
      popup.classList.remove("show");
    }, 3000);
  }

function closePopup() {
  const popup = document.getElementById("success-popup");
  if (popup) {
    popup.classList.remove("show");
  }
  
}
}