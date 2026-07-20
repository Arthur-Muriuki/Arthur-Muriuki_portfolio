// =======================
// SCROLL REVEAL
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

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();



// =======================
// MOBILE HAMBURGER MENU
// =======================

function toggleMenu() {
    const nav = document.querySelector(".nav-links");
    const burger = document.querySelector(".hamburger");

    nav.classList.toggle("active");
    burger.classList.toggle("active");
}



// =======================
// AUTO CLOSE MENU
// =======================

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {

        const nav = document.querySelector(".nav-links");
        const burger = document.querySelector(".hamburger");

        nav.classList.remove("active");
        burger.classList.remove("active");

    });
});



// =======================
// CLOSE MENU IF CLICKING OUTSIDE
// =======================

document.addEventListener("click", (e) => {

    const nav = document.querySelector(".nav-links");
    const burger = document.querySelector(".hamburger");

    if (
        nav &&
        burger &&
        !nav.contains(e.target) &&
        !burger.contains(e.target)
    ) {
        nav.classList.remove("active");
        burger.classList.remove("active");
    }

});



// =======================
// TYPING EFFECT
// =======================

const typingElement = document.querySelector(".typing");

if (typingElement) {

    const textArray = [
        "Software Engineer",
        "Project Coordinator",
        "Full-Stack Developer",
        "Android Engineer",  
    ];

    let i = 0;
    let j = 0;
    let current = "";
    let isDeleting = false;

    function type() {

        if (!isDeleting && j <= textArray[i].length) {
            current = textArray[i].substring(0, j++);
        }

        else if (isDeleting && j >= 0) {
            current = textArray[i].substring(0, j--);
        }

        typingElement.textContent = current;

        if (j === textArray[i].length) {
            isDeleting = true;
        }

        if (j === 0) {
            isDeleting = false;
            i = (i + 1) % textArray.length;
        }

        setTimeout(type, isDeleting ? 50 : 100);
    }

    type();
}



// =======================
// CONTACT FORM
// =======================

const form = document.getElementById("contact-form");

if (form) {

    form.addEventListener("submit", function(e) {

        e.preventDefault();

        const data = new FormData(form);

        fetch(
            "https://formsubmit.co/ajax/b7dd2c89223cf8bfa7b60de9b9e15caa",
            {
                method: "POST",
                body: data
            }
        )

        .then(response => response.json())

        .then(data => {

            showPopup();

            form.reset();

        })

        .catch(error => {

            console.error(error);

            alert("Something went wrong. Please try again.");

        });

    });

}



// =======================
// SUCCESS POPUP
// =======================

function showPopup() {

    const popup =
    document.getElementById("success-popup");

    if (popup) {

        popup.classList.add("show");

        setTimeout(() => {

            popup.classList.remove("show");

        }, 3000);

    }

}



function closePopup() {

    const popup =
    document.getElementById("success-popup");

    if (popup) {

        popup.classList.remove("show");

    }

}