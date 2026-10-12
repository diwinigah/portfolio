document.querySelectorAll('.skill-progress').forEach(progress => {
    const percentage = Math.round((progress.value / progress.max) * 100);
    const percentageLabel = progress.closest('.skill-proficiency').querySelector('.skill-proficiency-heading span:last-child');

    percentageLabel.textContent = `${percentage}%`;
    progress.setAttribute('aria-label', `Niveau de maîtrise : ${percentage} %`);
});

// Navigation js
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');
        const navLinks = document.querySelectorAll('.nav-link');

        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            nav.classList.toggle('active', !isExpanded);
            menuToggle.setAttribute('aria-expanded', String(!isExpanded));
            menuToggle.setAttribute('aria-label', !isExpanded ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');
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
        const contactSubmitLabel = contactSubmitButton.textContent;
        const formspreeEndpoint = 'https://formspree.io/f/mqavwnqz';

        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Reset the visible status before each submission attempt.
            contactFormStatus.textContent = '';
            contactFormStatus.className = 'form-status';

            contactSubmitButton.disabled = true;
            contactSubmitButton.textContent = 'Envoi en cours...';

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
                contactFormStatus.textContent = 'Merci, votre message a bien été envoyé.';
                contactFormStatus.classList.add('form-status--success');
            } catch (error) {
                // Keep technical details in the console and show a helpful user-facing message.
                console.error('Erreur lors de l\'envoi du formulaire:', error);
                contactFormStatus.textContent = 'Une erreur est survenue. Veuillez réessayer dans quelques instants.';
                contactFormStatus.classList.add('form-status--error');
            } finally {
                contactSubmitButton.disabled = false;
                contactSubmitButton.textContent = contactSubmitLabel;
            }
        });

        // Fade in elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.service-card, .skill-item, .project-card, .testimonial-card').forEach(el => {
            observer.observe(el);
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
