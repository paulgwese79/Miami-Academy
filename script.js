/* ==========================================
   MIAMI ACADEMY - SCRIPT.JS
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       MOBILE NAVIGATION
    ========================== */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (navLinks.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-times");
            } else {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }
        });

        // Close menu when link clicked
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");

                const icon = menuBtn.querySelector("i");
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            });
        });
    }

    /* ==========================
       HERO SLIDER
    ========================== */

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    let currentSlide = 0;
    let sliderInterval;

    function showSlide(index) {

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        dots.forEach(dot => {
            dot.classList.remove("active-dot");
        });

        slides[index].classList.add("active");
        dots[index].classList.add("active-dot");

        currentSlide = index;
    }

    function nextSlide() {
        let next = currentSlide + 1;

        if (next >= slides.length) {
            next = 0;
        }

        showSlide(next);
    }

    function startSlider() {
        sliderInterval = setInterval(nextSlide, 5000);
    }

    function resetSlider() {
        clearInterval(sliderInterval);
        startSlider();
    }

    if (slides.length > 0) {

        showSlide(0);
        startSlider();

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                showSlide(index);
                resetSlider();
            });
        });
    }

    /* ==========================
       SCROLL REVEAL ANIMATIONS
    ========================== */

    const revealElements = document.querySelectorAll(
        ".section, .academic-card, .feature-card, .gallery-grid img"
    );

    revealElements.forEach(el => {
        el.classList.add("reveal");
    });

    function revealOnScroll() {

        revealElements.forEach(element => {

            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;

            const revealPoint = 120;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);

    revealOnScroll();

    /* ==========================
       STICKY NAVBAR EFFECT
    ========================== */

    const header = document.querySelector(".header");

    function stickyHeader() {

        if (window.scrollY > 50) {

            header.style.background =
                "rgba(10,35,66,0.98)";

            header.style.boxShadow =
                "0 5px 20px rgba(0,0,0,0.15)";

        } else {

            header.style.background =
                "rgba(10,35,66,0.95)";

            header.style.boxShadow =
                "none";
        }
    }

    window.addEventListener("scroll", stickyHeader);

    /* ==========================
       ACTIVE NAV LINK ON SCROLL
    ========================== */

    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    function highlightNavLink() {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach(link => {

            link.classList.remove("active-link");

            if (
                link.getAttribute("href") ===
                `#${current}`
            ) {
                link.classList.add("active-link");
            }
        });
    }

    window.addEventListener("scroll", highlightNavLink);

    /* ==========================
       GALLERY LIGHTBOX
    ========================== */

    const galleryImages =
        document.querySelectorAll(".gallery-grid img");

    if (galleryImages.length > 0) {

        const lightbox =
            document.createElement("div");

        lightbox.id = "lightbox";

        lightbox.innerHTML = `
            <span class="close-lightbox">&times;</span>
            <img id="lightbox-img" src="">
        `;

        document.body.appendChild(lightbox);

        const lightboxImg =
            document.getElementById("lightbox-img");

        const closeBtn =
            document.querySelector(".close-lightbox");

        galleryImages.forEach(image => {

            image.addEventListener("click", () => {

                lightbox.classList.add("show");
                lightboxImg.src = image.src;
            });
        });

        closeBtn.addEventListener("click", () => {
            lightbox.classList.remove("show");
        });

        lightbox.addEventListener("click", e => {

            if (e.target === lightbox) {
                lightbox.classList.remove("show");
            }
        });
    }

    /* ==========================
       CONTACT FORM
    ========================== */

    const contactForm =
        document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();

                alert(
                    "Thank you for contacting Miami Academy. We will get back to you soon."
                );

                contactForm.reset();
            }
        );
    }

    /* ==========================
       BACK TO TOP BUTTON
    ========================== */

    const backToTop =
        document.createElement("button");

    backToTop.innerHTML =
        '<i class="fas fa-arrow-up"></i>';

    backToTop.id = "backToTop";

    document.body.appendChild(backToTop);

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    function toggleBackToTop() {

        if (window.scrollY > 400) {

            backToTop.style.opacity = "1";
            backToTop.style.visibility = "visible";

        } else {

            backToTop.style.opacity = "0";
            backToTop.style.visibility = "hidden";
        }
    }

    window.addEventListener(
        "scroll",
        toggleBackToTop
    );

    toggleBackToTop();

});

/* ==========================================
   EXTRA CSS REQUIRED
   ADD THIS TO style.css
   ==========================================

.active-link{
    color: var(--yellow) !important;
}

#lightbox{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.95);
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:9999;
    opacity:0;
    visibility:hidden;
    transition:.4s;
}

#lightbox.show{
    opacity:1;
    visibility:visible;
}

#lightbox img{
    max-width:90%;
    max-height:85%;
    border-radius:10px;
}

.close-lightbox{
    position:absolute;
    top:20px;
    right:30px;
    color:white;
    font-size:40px;
    cursor:pointer;
}

#backToTop{
    position:fixed;
    right:25px;
    bottom:25px;
    width:55px;
    height:55px;
    border:none;
    border-radius:50%;
    background:var(--red);
    color:white;
    cursor:pointer;
    z-index:999;
    opacity:0;
    visibility:hidden;
    transition:.3s;
    box-shadow:0 10px 20px rgba(0,0,0,.2);
}

#backToTop:hover{
    transform:translateY(-4px);
}

========================================== */