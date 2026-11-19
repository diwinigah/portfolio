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
            'contact.form.sending': 'Envoi en cours...',
            'contact.form.success': 'Merci, votre message a bien été envoyé. Je vous réponds sous 48 h.',
            'contact.form.error': 'Une erreur est survenue. Veuillez réessayer dans quelques instants.',
            'contact.copy.done': 'E-mail copié',
            'contact.copy.fail': 'Copie impossible'
        },
        en: {
            'menu.open': 'Open the navigation menu',
            'menu.close': 'Close the navigation menu',
            'theme.toDark': 'Switch to dark mode',
            'theme.toLight': 'Switch to light mode',
            'lang.switch': 'Switch the site to French',
            'contact.form.sending': 'Sending...',
            'contact.form.success': 'Thank you, your message has been sent. I will reply within 48 hours.',
            'contact.form.error': 'Something went wrong. Please try again in a few moments.',
            'contact.copy.done': 'Email copied',
            'contact.copy.fail': 'Copy failed'
        }
    },

    /* ---------- Contenu de la page (anglais) ---------- */
    en: {
        /* Métadonnées */
        'meta.title': 'SAGUINTAAH B D Nathanael - Web & Mobile Developer | Portfolio',
        'meta.description': 'Portfolio of Nathanael Saguintaah, a Web & Mobile developer based in Lomé, Togo: websites, Laravel applications, Flutter apps and UI/UX prototypes.',

        /* Navigation */
        'nav.aria': 'Main navigation',
        'skip.link': 'Skip to main content',
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.services': 'Services',
        'nav.skills': 'Skills',
        'nav.projects': 'Projects',
        'nav.contact': 'Contact',

        /* Hero */
        'hero.title': "Hello! I'm <span>Nathanael SAGUINTAAH</span>",
        'hero.text': 'Trained in Full Stack development, I build web and mobile applications with Laravel, React and Flutter, from the database to the interface. Based in Lomé, Togo.',
        'hero.badge': 'Available for an internship or a job',
        'hero.role': 'Web & Mobile Developer',
        'hero.cta.projects': 'View my Projects',
        'hero.cta.contact': 'Contact me',
        'hero.cta.cv': 'Download my CV',
        'hero.cta.cvHref': './document/CV_Nathanael_Saguintaah_EN.pdf',
        'hero.photoAlt': 'Profile photo - Nathanael Saguintaah',

        /* À propos */
        'about.title': 'About <span>Me</span>',
        'about.subtitle': 'My background, my achievements and how I work',
        'about.intro': "A Web & Mobile developer certified by the International Organisation of La Francophonie (OIF, D-Clic project), trained in full-stack development with Laravel, vanilla PHP and MySQL, as well as mobile development with Flutter and App Inventor. I put these skills to work for an association by building a complementary platform that plugs into its own and works with it as a single whole: camp management and registration, project management and publication, and funding tracking. Rigorous, autonomous and attentive to both business logic and security, I turn requirements into concrete solutions.",
        'about.facts.location': 'Location',
        'about.facts.languages': 'Languages',
        'about.facts.languagesValue': 'French (excellent), English (basic)',
        'about.facts.availability': 'Availability',
        'about.facts.availabilityValue': 'Internship or job',
        'about.proof1.title': 'OIF certified',
        'about.proof1.text': 'OIF D-Clic project, run by the SAEI-CUBE organisation: web and mobile development (2025–2026).',
        'about.proof2.title': 'Real project, live online',
        'about.proof2.text': 'Complementary platform integrated with an association\'s existing one: camps and registrations, projects, funding tracking. Filament back office, two separate authentication areas, notifications and PDF exports.',
        'about.proof3.title': 'Security',
        'about.proof3.text': 'Form Request validation, rate limiting, CSRF protection and prepared statements.',
        'about.proof4.title': 'Autonomy',
        'about.proof4.text': 'From requirements to deployment, using Git and documentation.',

        /* Services */
        'services.title': 'My <span>Services</span>',
        'services.subtitle': 'What I can build for your project, from requirements to deployment',
        'services.web.title': 'Custom web applications',
        'services.web.text': 'Websites and web applications with Laravel, PHP and MySQL: admin areas, secure authentication, notifications and PDF exports.',
        'services.api.title': 'REST API & back end',
        'services.api.text': 'REST API design with Laravel: routes, authentication and data validation, to power a web or mobile application.',
        'services.mobile.title': 'Mobile applications',
        'services.mobile.text': 'Flutter apps connected to Firebase or a local SQLite database, and Android apps with App Inventor.',
        'services.ui.title': 'UI/UX design',
        'services.ui.text': 'Interactive mockups and prototypes in Figma: user journeys, a clear interface and smooth navigation between screens.',
        'services.debug.title': 'Debugging & maintenance',
        'services.debug.text': 'Bug tracking and fixing, code improvement and hardening of PHP and Laravel applications.',
        'services.nocode.title': 'WordPress, no-code & low-code',
        'services.nocode.text': 'A foundation for building WordPress sites (themes, plugins) and quickly prototyping simple applications with FlutterFlow or App Inventor.',
        'services.cta': "Let's talk about your project",

        /* Compétences */
        'skills.title': 'My <span>Skills</span>',
        'skills.subtitle': 'The technologies I use in my projects, and where I stand with each one',
        'skills.note': 'I keep learning: the level shown reflects my current practice.',
        'skills.legend.aria': 'Level legend',
        'skills.level.3': 'Comfortable',
        'skills.level.2': 'Hands-on',
        'skills.level.1': 'Basics',
        'skills.legend.3': '— used regularly, without having to look things up',
        'skills.legend.2': '— used in a complete project, from design to deployment',
        'skills.legend.1': '— learned and tried out, but not yet used in depth',
        'skills.usedLabel': 'Used in',
        'skills.cat.front': 'Front-end',
        'skills.cat.back': 'Back end and databases',
        'skills.cat.mobile': 'Mobile',
        'skills.cat.lowcode': 'Low-code and CMS',
        'skills.cat.tools': 'Tools and design',
        'skills.used.html5': 'Portfolio, library, garage',
        'skills.used.css3': 'Portfolio, garage (responsive design)',
        'skills.used.js': 'Portfolio, library, garage',
        'skills.used.react': 'Currently learning',
        'skills.used.php': 'Library, garage',
        'skills.used.laravel': "Garage, the association's platform",
        'skills.used.sql': 'Library, garage',
        'skills.used.flutter': 'App connected to Firebase',
        'skills.used.firestore': 'Flutter app',
        'skills.used.sqlite': 'Local mobile database, currently learning',
        'skills.used.appinventor': 'Android apps without code',
        'skills.used.flutterflow': 'Simple app prototypes',
        'skills.used.wordpress': 'Simple sites: themes and plugins',
        'skills.used.git': 'All my projects',
        'skills.used.figma': 'UI/UX prototype',

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
        'projects.library.f3': 'Removing books from the collection',
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
        'contact.subtitle': 'An internship, a job or a project to build? Write to me and I will reply within 48 hours.',
        'contact.phone': 'Phone',
        'contact.location': 'Location',
        'contact.tz': 'Time zone: GMT (UTC+0)',
        'contact.copy': 'Copy email',
        'contact.whatsapp.cta': 'Message me on WhatsApp',
        'contact.form.name': 'Full name',
        'contact.form.subject': 'Subject',
        'contact.form.namePh': 'Your name',
        'contact.form.emailPh': 'Your email (e.g. example@gmail.com)',
        'contact.form.subjectPh': 'Choose a subject',
        'contact.form.subject.internship': 'Internship',
        'contact.form.subject.job': 'Job',
        'contact.form.subject.project': 'Project to build',
        'contact.form.subject.other': 'Other',
        'contact.form.messagePh': 'Write your message...',
        'contact.form.submit': 'Send message',

        /* Footer */
        'footer.rights': '© <span class="js-year">2026</span> SAGUINTAAH B D Nathanael. All rights reserved.',
        'footer.tagline': 'Web & Mobile Developer | Lomé, Togo',
        'footer.nav.aria': 'Quick links',
        'footer.top': 'Back to top',
        'footer.github.aria': 'GitHub (new tab)',
        'footer.linkedin.aria': 'LinkedIn (new tab)',
        'footer.facebook.aria': 'Facebook (new tab)',
        'footer.whatsapp.aria': 'WhatsApp (new tab)',
        'footer.whatsapp.href': 'https://wa.me/22893403768?text=Hello%20Nathanael%2C%20I%20am%20writing%20to%20you%20from%20your%20portfolio.',
        'footer.email.aria': 'Send an email'
    }
};
