// Traduction : t('clé') renvoie le message dans la langue active (voir i18n.js / translations.js)
const t = (key, params) => (window.i18n ? window.i18n.t(key, params) : key);

// Navigation js
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');
        const navLinks = document.querySelectorAll('.nav-link');

        function updateMenuLabel() {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-label', t(expanded ? 'menu.close' : 'menu.open'));
        }
        updateMenuLabel();

        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            nav.classList.toggle('active', !isExpanded);
            menuToggle.setAttribute('aria-expanded', String(!isExpanded));
            updateMenuLabel();
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                updateMenuLabel();
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Smooth scroll update active link
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Contact Form - AJAX Formspree submission
        const contactForm = document.getElementById('contactForm');
        const contactFormStatus = document.getElementById('contactFormStatus');
        const contactSubmitButton = contactForm.querySelector('button[type="submit"]');
        const formspreeEndpoint = 'https://formspree.io/f/mqavwnqz';

        // Affiche un message d'état et mémorise sa clé pour le retraduire si la langue change
        function setFormStatus(key, modifier) {
            if (!key) {
                delete contactFormStatus.dataset.i18nKey;
                contactFormStatus.textContent = '';
                contactFormStatus.className = 'form-status';
                return;
            }
            contactFormStatus.dataset.i18nKey = key;
            contactFormStatus.textContent = t(key);
            contactFormStatus.className = 'form-status' + (modifier ? ` ${modifier}` : '');
        }

        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Reset the visible status before each submission attempt.
            setFormStatus(null);

            contactSubmitButton.disabled = true;
            contactSubmitButton.textContent = t('contact.form.sending');

            try {
                // FormData preserves the existing input names expected by Formspree.
                const formData = new FormData(contactForm);

                const response = await fetch(formspreeEndpoint, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Accept: 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Formspree returned an unsuccessful response.');
                }

                contactForm.reset();
                setFormStatus('contact.form.success', 'form-status--success');
            } catch (error) {
                // Keep technical details in the console and show a helpful user-facing message.
                console.error('Erreur lors de l\'envoi du formulaire:', error);
                setFormStatus('contact.form.error', 'form-status--error');
            } finally {
                contactSubmitButton.disabled = false;
                // Restaure le libellé d'origine du bouton dans la langue active
                if (window.i18n) window.i18n.retranslate(contactSubmitButton);
            }
        });

        // ---------- Menu mobile : fermeture avec Echap ou clic en dehors ----------
        function closeMenu() {
            nav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            updateMenuLabel();
        }

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && nav.classList.contains('active')) {
                closeMenu();
                menuToggle.focus();
            }
        });

        document.addEventListener('click', event => {
            if (nav.classList.contains('active') && !event.target.closest('header')) {
                closeMenu();
            }
        });

        // ---------- Mode sombre ----------
        const root = document.documentElement;
        const themeToggle = document.querySelector('.theme-toggle');
        const themeStorageKey = 'portfolio-theme';

        function getStoredTheme() {
            try { return localStorage.getItem(themeStorageKey); } catch (e) { return null; }
        }

        function applyTheme(theme) {
            root.setAttribute('data-theme', theme);
            themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
            themeToggle.setAttribute('aria-label', t(theme === 'dark' ? 'theme.toLight' : 'theme.toDark'));
        }

        applyTheme(root.getAttribute('data-theme') || 'light');

        themeToggle.addEventListener('click', () => {
            const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.classList.add('theme-switching');
            applyTheme(next);
            try { localStorage.setItem(themeStorageKey, next); } catch (e) { /* stockage indisponible */ }
            setTimeout(() => root.classList.remove('theme-switching'), 400);
        });

        // Suit le réglage du système tant que le visiteur n'a pas choisi lui-même
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (!getStoredTheme()) applyTheme(event.matches ? 'dark' : 'light');
        });

        // ---------- Barre de progression de lecture ----------
        const progressBar = document.querySelector('.scroll-progress');
        let progressTicking = false;

        function updateScrollProgress() {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const ratio = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
            progressBar.style.transform = `scaleX(${ratio})`;
            progressTicking = false;
        }

        window.addEventListener('scroll', () => {
            if (!progressTicking) {
                progressTicking = true;
                requestAnimationFrame(updateScrollProgress);
            }
        }, { passive: true });
        updateScrollProgress();

        // ---------- Animations au scroll ----------
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const canObserve = 'IntersectionObserver' in window;

        if (!reduceMotion && canObserve) {
            // Apparition en fondu + glissement, avec un léger décalage entre éléments voisins
            const revealObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    const el = entry.target;
                    obs.unobserve(el);
                    el.classList.add('is-visible');
                    const delay = parseFloat(el.style.getPropertyValue('--reveal-delay')) || 0;
                    // Une fois l'animation finie, on retire les classes pour retrouver les effets au survol
                    setTimeout(() => {
                        el.classList.remove('reveal', 'reveal-left', 'reveal-right', 'is-visible');
                        el.style.removeProperty('--reveal-delay');
                    }, (delay + 0.9) * 1000);
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

            document.querySelectorAll('.section-title, .section-subtitle, .about-text, .proof-card, .service-card, .skills-legend, .skill-card, .project-card, .contact-item, .contact-form').forEach(el => {
                const index = Array.prototype.indexOf.call(el.parentElement.children, el);
                el.classList.remove('fade-in');
                el.classList.add('reveal');
                if (el.matches('.about-text')) el.classList.add('reveal-left');
                if (el.matches('.contact-form')) el.classList.add('reveal-right');
                el.style.setProperty('--reveal-delay', `${(index % 4) * 0.08}s`);
                revealObserver.observe(el);
            });
        }

        // ---------- Changement de langue : met à jour les libellés générés par le JavaScript ----------
        document.addEventListener('i18n:change', () => {
            updateMenuLabel();
            applyTheme(root.getAttribute('data-theme') || 'light');

            const statusKey = contactFormStatus.dataset.i18nKey;
            if (statusKey) contactFormStatus.textContent = t(statusKey);
        });

        // Toute la carte reste cliquable à la souris ; au clavier, on utilise les boutons de la carte
        // (liens natifs focalisables), donc la carte n'a plus besoin d'être un faux lien.
        document.querySelectorAll('.project-card').forEach(card => {
            const projectLink = card.querySelector('.project-links a[href]');
            if (!projectLink) return;

            card.addEventListener('click', event => {
                if (event.target.closest('a')) return;
                window.open(projectLink.href, projectLink.target || '_self', 'noopener,noreferrer');
            });
        });
