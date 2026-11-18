/* =========================================================
   translations.js — textes du site en anglais
   ---------------------------------------------------------
   Fonctionnement :
   - Le FRANÇAIS reste écrit directement dans index.html
     (c'est la source de référence et le texte affiché si
     JavaScript est désactivé).
   - Ce fichier contient la traduction ANGLAISE (`en`), indexée
     par les clés data-i18n / data-i18n-html / data-i18n-attr
     présentes dans index.html.
   - `ui` regroupe les messages affichés par le JavaScript
     (menus, formulaire...) dans les deux langues.

   Pour modifier un texte : change-le dans index.html (FR)
   et dans `en` ci-dessous (EN) avec la même clé.
   Pour ajouter une langue : ajoute-la dans `ui`, crée un bloc
   du même nom que `en`, puis ajoute son code dans `SUPPORTED`
   (i18n.js) et un bouton dans le header.
   ========================================================= */

window.I18N = {

    /* ---------- Messages gérés par le JavaScript ---------- */
    ui: {
        fr: {
            'menu.open': 'Ouvrir le menu de navigation',
            'menu.close': 'Fermer le menu de navigation',
            'theme.toDark': 'Activer le mode sombre',
            'theme.toLight': 'Activer le mode clair',
            'lang.switch': 'Passer le site en anglais',
            'skill.aria': 'Niveau de maîtrise : {value} %',
            'contact.form.sending': 'Envoi en cours...',
            'contact.form.success': 'Merci, votre message a bien été envoyé.',
            'contact.form.error': 'Une erreur est survenue. Veuillez réessayer dans quelques instants.'
        },
        en: {
            'menu.open': 'Open the navigation menu',
            'menu.close': 'Close the navigation menu',
            'theme.toDark': 'Switch to dark mode',
            'theme.toLight': 'Switch to light mode',
            'lang.switch': 'Switch the site to French',
            'skill.aria': 'Proficiency level: {value}%',
            'contact.form.sending': 'Sending...',
            'contact.form.success': 'Thank you, your message has been sent.',
            'contact.form.error': 'Something went wrong. Please try again in a few moments.'
        }
    },

    /* ---------- Contenu de la page (anglais) ---------- */
    en: {
        /* Métadonnées */
        'meta.title': 'SAGUINTAAH B D Nathanael - Web & Mobile Developer | Portfolio',
        'meta.description': 'Portfolio of Nathanael Saguintaah, a Web & Mobile developer based in Lomé, Togo: websites, Laravel applications, Flutter apps and UI/UX prototypes.',

        /* Navigation */
        'nav.aria': 'Main navigation',
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.services': 'Services',
        'nav.skills': 'Skills',
        'nav.projects': 'Projects',
        'nav.contact': 'Contact',

        /* Hero */
        'hero.title': "Hello! I'm <span>Nathanael SAGUINTAAH</span>",
        'hero.text': 'Passionate Web & Mobile Developer. I build innovative, high-performing digital solutions for your projects.',
        'hero.cta.skills': 'View my Skills',
        'hero.cta.cv': 'Download my CV (PDF, in French)',
        'hero.photoAlt': 'Profile photo - Nathanael Saguintaah',

        /* À propos */
        'about.title': 'About <span>Me</span>',
        'about.subtitle': 'Discover my background and achievements',
        'about.p1': "A web and mobile developer trained in Full Stack development through the D-Clic program of the International Organisation of La Francophonie, I work across the entire development chain: database design, REST API development with PHP and Laravel, and modern interface development with JavaScript and React. Based in Lomé, Togo, I turn requirements into concrete, effective digital solutions.",
        'about.p2': "My goal is to design modern, intuitive and high-performing applications that meet users' real needs.",
        'about.p3': "I have built several applications end to end, from requirements to deployment: a complete digital platform with back office, authentication and security, a management application for car garages, and a library website in vanilla PHP. Autonomous and rigorous, I pay particular attention to security, notably protection against SQL injection, XSS and CSRF attacks, as well as to code quality through the use of Git and documentation. I am also interested in interface design with Figma, alongside my development work.",
        'about.stat.projects': 'Completed Projects',
        'about.stat.clients': 'Satisfied Clients',
        'about.stat.experience': 'Years of Experience',
        'about.stat.quality': 'Guaranteed Quality',

        /* Services */
        'services.title': 'My <span>Services</span>',
        'services.subtitle': 'End-to-end solutions for your digital needs',
        'services.web.title': 'Web Development',
        'services.web.text': 'Design and development of modern, responsive, high-performing websites, using up-to-date technologies for an optimal user experience.',
        'services.mobile.title': 'Mobile Development',
        'services.mobile.text': 'Native and cross-platform mobile applications, with intuitive design and advanced features for stronger user engagement.',
        'services.cms.title': 'WordPress & CMS',
        'services.cms.text': 'Professional, tailored WordPress solutions: plugin integration, SEO optimisation and easy content management.',
        'services.nocode.title': 'No-Code & Low-Code',
        'services.nocode.text': 'Fast solutions built on no-code and low-code platforms: process automation and rapid prototyping of your ideas.',

        /* Compétences */
        'skills.title': 'My <span>Skills</span>',
        'skills.subtitle': 'Technologies and tools I work with',
        'skills.level': 'Intermediate',
        'skills.html5': 'Modern semantic markup',
        'skills.css3': 'Animations and responsive design',
        'skills.js': 'ES6+ and asynchronous programming',
        'skills.react': 'Components and application state',
        'skills.laravel': 'Modern PHP framework',
        'skills.php': 'Back end and database handling',
        'skills.sql': 'Relational databases',
        'skills.wordpress': 'CMS and plugin development',
        'skills.flutter': 'Mobile application development',
        'skills.appinventor': 'App Inventor and no-code Android mobile app creation',
        'skills.flutterflow': 'Low-code web and mobile application development',
        'skills.firestore': 'NoSQL database for mobile applications',
        'skills.sqlite': 'Local database for mobile applications',
        'skills.git': 'Version control',
        'skills.figma': 'Interface design and prototyping',

        /* Projets */
        'projects.title': 'My <span>Projects</span>',
        'projects.subtitle': 'Explore the work I have built',
        'projects.techLabel': 'Technologies:',

        'projects.library.alt': 'Library management website',
        'projects.library.title': 'Online library website',
        'projects.library.text': 'Website built as part of my training, in vanilla PHP (no framework), with direct SQL queries, Bootstrap, JavaScript and CSS. Visitors can quickly search the catalogue for books, and administrators can add or remove books from the collection.',
        'projects.library.role': '<strong>My role:</strong> Sole developer: complete development of the project in vanilla PHP, without relying on an application framework.',
        'projects.library.features': '<strong>Key features:</strong> Book search for visitors; adding and removing books by the administrator.',

        'projects.garage.alt': 'Garage management application',
        'projects.garage.title': 'Car garage management application',
        'projects.garage.text': 'Web application built as part of my training, with full CRUD functionality for managing a car garage. Customers can quickly book a repair appointment, and the administrator gets a complete workspace to manage vehicles, technicians and repairs.',
        'projects.garage.role': '<strong>My role:</strong> Sole developer: full development of the project, from requirements to deployment.',
        'projects.garage.features': '<strong>Key features:</strong> Appointment booking for customers, vehicle management, technician management, repair tracking.',

        'projects.ui.alt': 'Mobile app UI/UX prototype',
        'projects.ui.title': 'Mobile app UI/UX prototype',
        'projects.ui.text': 'Design of a modern, intuitive mobile interface, built to deliver a clear and pleasant user experience.',

        'tags.phpNative': 'Vanilla PHP',
        'tags.interactive': 'Interactive prototype',

        /* Contact */
        'contact.title': 'Get in <span>Touch</span>',
        'contact.subtitle': 'Feel free to reach out to discuss your projects',
        'contact.phone': 'Phone',
        'contact.location': 'Location',
        'contact.form.name': 'Full name',
        'contact.form.subject': 'Subject',
        'contact.form.namePh': 'Your name',
        'contact.form.emailPh': 'Your email (e.g. example@gmail.com)',
        'contact.form.subjectPh': 'Subject',
        'contact.form.messagePh': 'Write your message...',
        'contact.form.submit': 'Send message',

        /* Footer */
        'footer.rights': '© 2025 SAGUINTAAH B D Nathanael. All rights reserved.',
        'footer.tagline': 'Web & Mobile Developer | Lomé, Togo'
    }
};
