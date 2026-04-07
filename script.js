document.addEventListener("DOMContentLoaded", () => {
    // 1. Smooth scrolling for nav anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Intersection Observer for Scroll Animations
    // Selects elements with 'fade-in-up' class and adds 'visible' when scrolled into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve if you only want the animation to happen once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(element => {
        sectionObserver.observe(element);
    });

    // 3. Subtle Parallax for the Background Glow on the Hero Section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            // Adjust the glow element's pseudo-element via CSS variables or a targeted div.
            // A simple implementation without changing HTML could move CSS custom properties natively.
            hero.style.setProperty('--mouse-x', `${x * 100}%`);
            hero.style.setProperty('--mouse-y', `${y * 100}%`);
        });
    }
});
