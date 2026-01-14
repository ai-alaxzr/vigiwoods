// =============================================
// VIGIWOODS INTERIOR DESIGN - JAVASCRIPT (Version 2.0)
// =============================================

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initial Page Load Activation
    const animateEntrance = () => {
        const hero = document.querySelector('.hero');
        if (hero) hero.classList.add('visible');
    };
    setTimeout(animateEntrance, 200);

    // 2. Navbar Scroll Logic
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Show/Hide Back to Top
        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 800) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    };
    window.addEventListener('scroll', handleScroll);

    // 3. Stats Counter Animation
    const counterItems = document.querySelectorAll('.stat-number');
    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                let count = 0;
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // ~60fps

                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        entry.target.innerText = Math.floor(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    };

    const counterObserver = new IntersectionObserver(animateCounters, { threshold: 0.5 });
    counterItems.forEach(item => counterObserver.observe(item));

    // 4. Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', navLinks.classList.contains('active'));

            // Animation for Hamburger
            const spans = hamburger.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(8px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(8px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // 5. Gallery Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('caption');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src;
            captionText.innerHTML = img.alt;
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    if (closeLightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // 6. Contact Form WhatsApp Integration
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing...';

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            const whatsappText = `*New Inquiry from VigiWoods Website*%0A%0A` +
                `*Name:* ${name}%0A` +
                `*Phone:* ${phone}%0A` +
                `*Service:* ${service}%0A` +
                `*Project:* ${message}`;

            const whatsappUrl = `https://wa.me/971527886905?text=${whatsappText}`;

            // Professional delay for feedback
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Redirecting to WhatsApp...';

                setTimeout(() => {
                    window.open(whatsappUrl, '_blank');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    contactForm.reset();
                }, 1000);
            }, 1000);
        });
    }

    // 7. Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const spans = hamburger.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    });

    // 8. Back to Top Smooth Scroll
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 9. Floating Label Interaction (Select fixes)
    const selectElement = document.getElementById('service');
    if (selectElement) {
        selectElement.addEventListener('change', () => {
            if (selectElement.value !== "") {
                selectElement.classList.add('has-value');
            }
        });
    }
});

// Branding Console Log - Interior Design Focus
console.log('%c VigiWoods Interior Design - Timeless Luxury %c', 'color: #C9A961; font-weight: bold; font-size: 14px;', '');
console.log('Crafting excellence in Abu Dhabi since 2010.');
