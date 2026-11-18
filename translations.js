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
        'hero.text': 'Trained in Full Stack development, I build web and mobile applications with Laravel, React and Flutter, from the database to the interface. Based in Lomé, Togo.',
        'hero.role': 'Web & Mobile Developer',
        'hero.cta.projects': 'View my Projects',
        'hero.cta.contact': 'Contact me',
        'hero.cta.cv': 'Download my CV (Word)',
        'hero.cta.cvHref': './document/CV_Nathanael_Saguintaah_.docx',
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
        'projects.featuresLabel': 'Key features:',
        'projects.btn.site': 'View site',
        'projects.btn.prototype': 'View prototype',
        'projects.btn.code': 'Source code',

        'projects.library.alt': 'Library management website',
        'projects.library.title': 'Online library website',
        'projects.library.text': 'Online library website built in vanilla PHP (no framework) as part of my training. Visitors can quickly search the catalogue, while administrators manage the book collection.',
        'projects.library.role': '<strong>My role:</strong> Complete development of the project, working independently, in vanilla PHP and without an application framework.',
        'projects.library.f1': 'Quick book search in the catalogue',
        'projects.library.f2': 'Adding titles (administrator)',
        'projects.library.f3': 'Removing books from the collection (administrator)',
        'projects.library.btnAria': 'View the site: online library (new tab)',

        'projects.garage.alt': 'Garage management application',
        'projects.garage.title': 'Car garage management application',
        'projects.garage.text': 'Car garage management web application with full CRUD, built as part of my training. Customers book repair appointments online, and the administrator gets a complete management workspace.',
        'projects.garage.role': '<strong>My role:</strong> Complete development of the project, working independently, from requirements to deployment.',
        'projects.garage.f1': 'Appointment booking for customers',
        'projects.garage.f2': 'Vehicle management',
        'projects.garage.f3': 'Technician management',
        'projects.garage.f4': 'Repair tracking',
        'projects.garage.btnAria': 'View the site: car garage management (new tab)',

        'projects.ui.alt': 'Mobile app UI/UX prototype',
        'projects.ui.title': 'Mobile app UI/UX prototype',
        'projects.ui.text': 'Interactive mobile app prototype designed in Figma as part of my training, to deliver a clear, modern and intuitive user experience.',
        'projects.ui.role': '<strong>My role:</strong> Complete prototype design: interface (UI), user journey (UX) and interactive prototyping in Figma.',
        'projects.ui.f1': 'Modern, intuitive mobile interface',
        'projects.ui.f2': 'Interactive navigation between screens',
        'projects.ui.f3': 'Prototype available online on Figma',
        'projects.ui.btnAria': 'View the UI/UX prototype (new tab)',

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
