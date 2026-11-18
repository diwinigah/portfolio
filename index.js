// Traduction : t('clé') renvoie le message dans la langue active (voir i18n.js / translations.js)
const t = (key, params) => (window.i18n ? window.i18n.t(key, params) : key);

document.querySelectorAll('.skill-progress').forEach(progress => {
    const percentage = Math.round((progress.value / progress.max) * 100);
    const percentageLabel = progress.closest('.skill-proficiency').querySelector('.skill-proficiency-heading span:last-child');

    percentageLabel.textContent = `${percentage}%`;
});

// Libellé accessible des barres de compétences, dans la langue active
function updateSkillAriaLabels() {
    document.querySelectorAll('.skill-progress').forEach(progress => {
        const raw = progress.dataset.target !== undefined ? progress.dataset.target : progress.value;
        const percentage = Math.round((Number(raw) / progress.max) * 100);
        progress.setAttribute('aria-label', t('skill.aria', { value: percentage }));
    });
}
updateSkillAriaLabels();

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

        function tween(duration, update) {
            const start = performance.now();
            function frame(now) {
                const progress = Math.min((now - start) / duration, 1);
                update(1 - Math.pow(1 - progress, 3)); // ease-out
                if (progress < 1) requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
        }

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

            document.querySelectorAll('.section-title, .section-subtitle, .about-text, .stat, .service-card, .skill-item, .project-card, .contact-item, .contact-form').forEach(el => {
                const index = Array.prototype.indexOf.call(el.parentElement.children, el);
                el.classList.remove('fade-in');
                el.classList.add('reveal');
                if (el.matches('.about-text')) el.classList.add('reveal-left');
                if (el.matches('.contact-form')) el.classList.add('reveal-right');
                el.style.setProperty('--reveal-delay', `${(index % 4) * 0.08}s`);
                revealObserver.observe(el);
            });

            // Compteurs (statistiques) et barres de compétences qui se remplissent
            const countObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    const el = entry.target;
                    obs.unobserve(el);

                    if (el.classList.contains('stat-number')) {
                        const target = parseInt(el.dataset.target, 10);
                        const suffix = el.dataset.suffix || '';
                        tween(1200, p => { el.textContent = Math.round(target * p) + suffix; });
                    } else {
                        const target = Number(el.dataset.target);
                        const label = el.closest('.skill-proficiency').querySelector('.skill-proficiency-heading span:last-child');
                        tween(1100, p => {
                            const value = Math.round(target * p);
                            el.value = value;
                            label.textContent = `${value}%`;
                        });
                    }
                });
            }, { threshold: 0.5 });

            document.querySelectorAll('.stat-number').forEach(el => {
                const match = el.textContent.trim().match(/^(\d+)(.*)$/);
                if (!match) return;
                el.dataset.target = match[1];
                el.dataset.suffix = match[2];
                el.textContent = `0${match[2]}`;
                countObserver.observe(el);
            });

            document.querySelectorAll('.skill-progress').forEach(el => {
                el.dataset.target = el.value;
                el.value = 0;
                el.closest('.skill-proficiency').querySelector('.skill-proficiency-heading span:last-child').textContent = '0%';
                countObserver.observe(el);
            });
        }

        // ---------- Changement de langue : met à jour les libellés générés par le JavaScript ----------
        document.addEventListener('i18n:change', () => {
            updateMenuLabel();
            updateSkillAriaLabels();
            applyTheme(root.getAttribute('data-theme') || 'light');

            const statusKey = contactFormStatus.dataset.i18nKey;
            if (statusKey) contactFormStatus.textContent = t(statusKey);
        });

        // Make the full project card open the same link as its image
        document.querySelectorAll('.project-card').forEach(card => {
            const projectLink = card.querySelector('.project-image a[href]');
            if (!projectLink) return;

            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'link');

            card.addEventListener('click', event => {
                if (event.target.closest('a')) return;
                window.open(projectLink.href, projectLink.target || '_self');
            });

            card.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    window.open(projectLink.href, projectLink.target || '_self');
                }
            });
        });
