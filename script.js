// =====================================================
// INITIALISATION & CONFIGURATION GLOBALE
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeScrollAnimations();
    initializeFormHandling();
    initializeScrollSpyNav();
    initializeScrollToTop();
    initializeMobileMenu();
});

// =====================================================
// GESTION DU MENU MOBILE
// =====================================================

function initializeMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Fermer le menu quand on clique sur un lien
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// =====================================================
// NAVIGATION LISSE (SMOOTH SCROLL)
// =====================================================

function initializeNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =====================================================
// ANIMATIONS AU SCROLL (INTERSECTION OBSERVER)
// =====================================================

function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observer les sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.animation = 'fadeInUp 0.8s ease-out forwards';
        section.style.animationPlayState = 'paused';
        observer.observe(section);
    });

    // Observer les cartes
    document.querySelectorAll('.service-card, .project-card, .testimonial-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s forwards`;
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });

    // Observer les barres de progression
    document.querySelectorAll('.progress-fill').forEach(bar => {
        bar.style.opacity = '0';
        observer.observe(bar);
    });
}

// =====================================================
// GESTION DE LA BARRE DE NAVIGATION ACTIVE
// =====================================================

function initializeScrollSpyNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const highlighting = () => {
        let scrollPosition = window.scrollY + 100;

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

    window.addEventListener('scroll', () => {
        highlighting();
        updateHeaderShadow();
    });

    // Initial call
    highlighting();
}

// =====================================================
// EFFET D'OMBRE SUR LE HEADER AU SCROLL
// =====================================================

function updateHeaderShadow() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(99, 102, 241, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
}

// =====================================================
// GESTION DU FORMULAIRE DE CONTACT
// =====================================================

function initializeFormHandling() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const button = contactForm.querySelector('button');
            const originalText = button.innerHTML;

            // Simulation d'envoi
            button.innerHTML = '<i class="fas fa-spinner"></i> Envoi en cours...';
            button.disabled = true;

            try {
                // Simuler un délai d'envoi
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Vérifier que les données ne sont pas vides
                let hasData = false;
                formData.forEach(value => {
                    if (value.trim()) hasData = true;
                });

                if (hasData) {
                    // Afficher un message de succès
                    button.innerHTML = '<i class="fas fa-check"></i> Message envoyé!';
                    button.style.background = '#00d4b8';

                    // Réinitialiser le formulaire
                    contactForm.reset();

                    // Restaurer après 3 secondes
                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.disabled = false;
                        button.style.background = '';
                    }, 3000);
                } else {
                    throw new Error('Veuillez remplir le formulaire');
                }
            } catch (error) {
                button.innerHTML = '<i class="fas fa-exclamation"></i> Erreur!';
                button.style.background = '#ff6b6b';

                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.style.background = '';
                }, 2000);
            }
        });
    }
}

// =====================================================
// BOUTON RETOUR AU HAUT
// =====================================================

function initializeScrollToTop() {
    // Créer le bouton
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #00f5d4;
        color: #0f172a;
        border: none;
        border-radius: 50%;
        font-size: 18px;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 5px 20px rgba(0, 245, 212, 0.3);
    `;

    document.body.appendChild(scrollTopBtn);

    // Afficher/cacher le bouton
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    // Scroll vers le top
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.background = '#00d4b8';
        scrollTopBtn.style.transform = 'translateY(-5px)';
    });

    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.background = '#00f5d4';
        scrollTopBtn.style.transform = 'translateY(0)';
    });
}

// =====================================================
// ANIMATIONS ADDITIONNELLES
// =====================================================

// Ajouter une animation au nombre de stats au scroll
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observer pour les stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            
            document.querySelectorAll('.stat-value').forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text);
                
                if (!isNaN(number)) {
                    animateCounter(stat, number, 2000);
                }
            });
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// =====================================================
// GESTION DE LA ANNÉE DYNAMIQUE
// =====================================================

function updateYear() {
    const yearElements = document.querySelectorAll('[data-year]');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

updateYear();

// =====================================================
// PARTICULES DE FOND (optionnel, pour plus de style)
// =====================================================

function createParticles() {
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

    // Créer quelques particules
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

// createParticles(); // Décommenter pour ajouter des particules

// =====================================================
// PERFORMANCE & OPTIMISATIONS
// =====================================================

// Lazy loading pour les images
function lazyLoadImages() {
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

lazyLoadImages();

// =====================================================
// CONSOLE MESSAGE
// =====================================================

console.log('%cBienvenue sur mon portfolio!', 'color: #00f5d4; font-size: 20px; font-weight: bold;');
console.log('%cCréé avec passion par Nathan SAGUINTAAH', 'color: #cbd5e1; font-size: 14px;');

// =================== SCROLL ANIMATIONS ===================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section, .card, .project, .skill').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// =================== ACTIVE NAV LINK HIGHLIGHTING ===================
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.style.color = 'white';
        link.style.borderBottomColor = 'transparent';
        
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#00f5d4';
            link.style.borderBottom = '2px solid #00f5d4';
        }
    });
});

// =================== FORM SUBMISSION ===================
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        // Formspree will handle the submission
        // You can add custom validation here if needed
        const button = form.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Envoi en cours...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    });
}

// =================== PROGRESS BAR ANIMATION ===================
const progressBars = document.querySelectorAll('.progress span');

const progressObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.parentElement.parentElement.querySelector('.progress span').style.width;
            entry.target.style.animation = `fillProgress 1.5s ease-out forwards`;
            progressObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// =================== CARDS HOVER EFFECT ===================
document.querySelectorAll('.card, .project').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// =================== DYNAMIC YEAR IN FOOTER ===================
const year = new Date().getFullYear();
const footer = document.querySelector('footer p');
if (footer) {
    footer.textContent = `© ${year} BK Creative - Tous droits réservés`;
}

// =================== MOBILE MENU TOGGLE (if using hamburger menu) ===================
// You can extend this with a hamburger menu for mobile
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 245, 212, 0.1)';
    }
});
