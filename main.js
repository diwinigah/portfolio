// =====================================================
// PORTFOLIO MAIN JAVASCRIPT
// Consolidated and improved version
// =====================================================

// Utility functions
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

// Constants
const HEADER_SHADOW_OFFSET = 50;
const SCROLL_TO_TOP_OFFSET = 500;
const NAV_LINK_OFFSET = 200;
const ANIMATION_THRESHOLD = 0.1;
const ANIMATION_ROOT_MARGIN = '0px 0px -100px 0px';
const STATS_ANIMATION_THRESHOLD = 0.5;

// Debounce utility
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNavigation();
    initScrollAnimations();
    initScrollSpyNav();
    initHeaderShadow();
    initFormHandling();
    initScrollToTop();
    initYear();
    // initParticles(); // Uncomment to add particles
});

// =====================================================
// MOBILE MENU
// =====================================================

function initMobileMenu() {
    const menuToggle = $('.menu-toggle');
    const nav = $('nav');

    if (menuToggle && nav) {
        // Set ARIA attributes for accessibility
        menuToggle.setAttribute('aria-controls', 'primary-navigation');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Ouvrir le menu principal');

        menuToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen);

            // Manage focus when menu opens/closes
            if (isOpen) {
                // Focus first link in menu when opening
                const firstLink = nav.querySelector('.nav-link');
                if (firstLink) firstLink.focus();
            } else {
                // Return focus to menu toggle when closing
                menuToggle.focus();
            }
        });

        // Close menu when clicking a link
        $$('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.focus();
            });
        });

        // Close menu when pressing Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.focus();
            }
        });
    }
}

// =====================================================
// SMOOTH SCROLL NAVIGATION
// =====================================================

function initNavigation() {
    $$('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && $(href)) {
                e.preventDefault();
                const target = $(href);
                const offsetTop = target.offsetTop - HEADER_SHADOW_OFFSET;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =====================================================
// SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// =====================================================

function initScrollAnimations() {
    // Single observer for all animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Uncomment if you want to animate only once
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: ANIMATION_THRESHOLD,
        rootMargin: ANIMATION_ROOT_MARGIN
    });

    // Observe sections
    $$('section').forEach(section => {
        observer.observe(section);
    });

    // Observe cards with staggered animation
    $$('.service-card, .project-card, .testimonial-card, .skill-item').forEach((card, index) => {
        card.style.setProperty('--delay', `${index * 0.1}s`);
        observer.observe(card);
    });

    // Observe stats for counter animation
    const statsSection = $('.about-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// =====================================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// =====================================================

function initScrollSpyNav() {
    const sections = $$('section[id]');
    const navLinks = $$('.nav-link');

    const highlighting = () => {
        const scrollPosition = window.scrollY + NAV_LINK_OFFSET;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        link.classList.add('active');
                    }
                }
            });
        });
    };

    // Use debounced scroll listener for performance
    window.addEventListener('scroll', debounce(highlighting, 16));

    // Initial call
    highlighting();
}

// =====================================================
// HEADER SHADOW EFFECT
// =====================================================

function initHeaderShadow() {
    const header = $('header');
    if (!header) return;

    const updateShadow = debounce(() => {
        if (window.scrollY > HEADER_SHADOW_OFFSET) {
            header.style.boxShadow = '0 5px 20px rgba(99, 102, 241, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    }, 16);

    window.addEventListener('scroll', updateShadow);
    // Initial call
    updateShadow();
}

// =====================================================
// FORM HANDLING WITH EMAILJS
// =====================================================

function initFormHandling() {
    const contactForm = $('#contactForm');
    if (!contactForm) return;

    // Initialize EmailJS (ensure email-handler.js is loaded and initialized)
    // The actual EmailJS handling is in email-handler.js to avoid conflicts
    // We'll just prevent other form handlers from interfering

    contactForm.addEventListener('submit', (e) => {
        // Prevent other form handlers from processing
        e.stopImmediatePropagation();
        // Let email-handler.js handle the submission
        // If email-handler.js fails to load or initialize, we fall back to mailto
        setTimeout(() => {
            // Check if EmailJS processing occurred (by checking if form was reset or success message shown)
            // If not, fall back to mailto after a short delay
            const formReset = contactForm.checkValidity() && contactForm.querySelector(':focus') === null;
            if (!formReset) {
                // Fallback to mailto if EmailJS didn't process
                const formData = new FormData(contactForm);
                const name = formData.get('name').trim();
                const email = formData.get('email').trim();
                const subject = formData.get('subject').trim();
                const message = formData.get('message').trim();

                if (name && email && subject && message) {
                    const mailtoLink = `mailto:winidorc1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                    window.location.href = mailtoLink;
                    contactForm.reset();
                }
            }
        }, 100);
    });
}

// =====================================================
// SCROLL-TO-TOP BUTTON
// =====================================================

function initScrollToTop() {
    // Create button if it doesn't exist
    let scrollTopBtn = $('.scroll-to-top');
    if (!scrollTopBtn) {
        scrollTopBtn = document.createElement('button');
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollTopBtn.className = 'scroll-to-top';
        scrollTopBtn.setAttribute('aria-label', 'Retourner en haut de la page');
        scrollTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: var(--bg-dark);
            border: none;
            border-radius: 50%;
            font-size: 18px;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 999;
            transition: all 0.3s ease;
            box-shadow: 0 5px 20px rgba(99, 102, 241, 0.3);
        `;
        document.body.appendChild(scrollTopBtn);
    }

    // Show/hide button based on scroll position
    const toggleButton = debounce(() => {
        if (window.scrollY > SCROLL_TO_TOP_OFFSET) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    }, 16);

    window.addEventListener('scroll', toggleButton);

    // Scroll to top when clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effects
    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.background = 'var(--primary-dark)';
        scrollTopBtn.style.transform = 'translateY(-3px)';
    });

    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.background = 'var(--primary-color)';
        scrollTopBtn.style.transform = 'translateY(0)';
    });
}

// =====================================================
// DYNAMIC YEAR UPDATE
// =====================================================

function initYear() {
    const yearElements = $$('[data-year]');
    const currentYear = new Date().getFullYear();

    yearElements.forEach(element => {
        element.textContent = currentYear;
    });

    // Also update footer if it exists
    const footerYear = $('footer p');
    if (footerYear) {
        footerYear.textContent = `© ${currentYear} SAGUINTAAH B D Nathanael. Tous les droits réservés.`;
    }
}

// =====================================================
// PARTICLES (OPTIONAL)
// =====================================================

function initParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    document.body.insertBefore(particlesContainer, document.body.firstChild);

    // Create particles
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(0, 245, 212, 0.1) 0%, transparent 70%);
            border-radius: 50%;
            animation: float ${5 + Math.random() * 5}s ease-in-out infinite;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
        `;
        particlesContainer.appendChild(particle);
    }
}

// =====================================================
// LAZY LOADING FOR IMAGES
// =====================================================

// Note: Using native lazy loading is preferred, but keeping this for compatibility
function initLazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Only change src if we have a data-src attribute
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        $$('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add native lazy loading to all images
    $$('img').forEach(img => {
        img.loading = 'lazy';
    });
}

// Initialize lazy loading
initLazyLoadImages();