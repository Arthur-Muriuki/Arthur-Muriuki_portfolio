(() => {
    // 1. Mobile Navigation Menu Toggle
    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector("#primary-nav");

    if (menuButton && nav) {
        menuButton.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("is-open");
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
        });

        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                nav.classList.remove("is-open");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Open navigation");
            });
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                nav.classList.remove("is-open");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Open navigation");
                menuButton.focus();
            }
        });
    }

    // 2. Hero Typing Effect Animation
    const phrases = [
        "Turning ideas into useful software.",
        "Building for web and mobile.",
        "Making websites easier to discover."
    ];
    const typingElement = document.querySelector("#typing-text");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (typingElement && !reduceMotion) {
        let phraseIndex = 0;
        let characterIndex = phrases[0].length;
        let deleting = true;

        const typeLoop = () => {
            const phrase = phrases[phraseIndex];
            if (deleting) {
                characterIndex--;
                typingElement.textContent = phrase.slice(0, Math.max(0, characterIndex));
                if (characterIndex <= 0) {
                    deleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    window.setTimeout(typeLoop, 350);
                    return;
                }
                window.setTimeout(typeLoop, 28);
            } else {
                const nextPhrase = phrases[phraseIndex];
                characterIndex++;
                typingElement.textContent = nextPhrase.slice(0, characterIndex);
                if (characterIndex >= nextPhrase.length) {
                    deleting = true;
                    window.setTimeout(typeLoop, 1900);
                    return;
                }
                window.setTimeout(typeLoop, 42);
            }
        };
        window.setTimeout(typeLoop, 1900);
    }

    // 3. Scroll Reveal Observer
    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && !reduceMotion) {
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    // 4. Dynamic Copyright Year
    const year = document.querySelector("#year");
    if (year) year.textContent = new Date().getFullYear();

    // 5. Popup & Toast Handling
    const popup = document.querySelector("#success-popup");
    const closePopup = document.querySelector("#close-popup");
    const params = new URLSearchParams(window.location.search);

    // Check for standard URL redirects (e.g., fallback redirects)
    if (popup && params.get("sent") === "true") {
        popup.hidden = false;
        params.delete("sent");
        const cleanUrl = window.location.pathname + (params.toString() ? `?${params}` : "") + window.location.hash;
        window.history.replaceState({}, document.title, cleanUrl);
    }

    if (popup && closePopup) {
        closePopup.addEventListener("click", () => { 
            popup.hidden = true; 
        });
    }

    // 6. Contact Form AJAX Submission (FormSubmit)
    const contactForm = document.querySelector("#contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const submitBtn = contactForm.querySelector(".form-submit");
            const originalBtnText = submitBtn ? submitBtn.innerHTML : "";

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `Sending... <span aria-hidden="true">⏳</span>`;
            }

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if (response.ok) {
                    contactForm.reset();
                    if (popup) {
                        popup.hidden = false;
                    }
                } else {
                    const data = await response.json();
                    alert(data.message || "There was an issue sending your message. Please try again.");
                }
            } catch (error) {
                alert("Network error. Please check your internet connection and try again.");
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            }
        });
    }
})();