document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor
    const customCursor = document.getElementById('custom-cursor');
    const interactiveElements = 'a, button, input, textarea, .project-card, .skill-badge';

    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;
    });

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveElements)) {
            customCursor.classList.add('hovered');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (!e.target.closest(interactiveElements) || (e.relatedTarget && !e.relatedTarget.closest(interactiveElements))) {
            customCursor.classList.remove('hovered');
        }
    });

    // 2. Hero Section Animations
    const heroName = document.querySelector('.hero-section h1');
    const tagline = document.querySelector('.hero-section .tagline');
    const originalTagline = tagline.textContent;
    tagline.textContent = ''; // Clear tagline for typing effect

    // Glitch effect on name
    const activateGlitch = () => {
        heroName.classList.add('glitch-active');
        setTimeout(() => {
            heroName.classList.remove('glitch-active');
        }, 3000); // Glitch for 3 seconds
    };

    // Typing effect on tagline
    const typeText = (element, text, i = 0) => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            setTimeout(() => typeText(element, text, i + 1), 70); // Typing speed
        } else {
            activateGlitch(); // Activate glitch after typing finishes
        }
    };

    // Start animations on page load
    setTimeout(() => {
        typeText(tagline, originalTagline);
    }, 1000); // Delay before typing starts

    // 3. Scroll-Triggered Animations (Intersection Observer)
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of element visible to trigger
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    scrollRevealElements.forEach(el => observer.observe(el));

    // 4. Contact Form CTA Button Animation (Active state via CSS, but JS for click feedback)
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            // Prevent default form submission for demonstration
            e.preventDefault();
            console.log('Form submission simulated!');
            // Add a temporary class for visual feedback if needed, beyond :active
            // For a real form, this would trigger an actual submission or validation
        });
    }

    // 5. Input focus visual feedback (handled by CSS :focus pseudo-class)
});
