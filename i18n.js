/* =========================================================
   i18n.js — moteur de traduction FR / EN
   ---------------------------------------------------------
   Éléments pris en charge dans index.html :
   - data-i18n="clé"              -> remplace le texte de l'élément
   - data-i18n-html="clé"         -> remplace le HTML de l'élément
   - data-i18n-attr="attr:clé;…"  -> remplace des attributs
                                     (alt, placeholder, content…)
   Le français est lu dans la page au chargement ; l'anglais
   vient de translations.js. Le choix est mémorisé et peut être
   forcé avec ?lang=en ou ?lang=fr dans l'URL.
   ========================================================= */
(function () {
    'use strict';

    const STORAGE_KEY = 'portfolio-lang';
    const DEFAULT_LANG = 'fr';
    const SUPPORTED = ['fr', 'en'];
    const data = window.I18N || { ui: { fr: {}, en: {} }, en: {} };
    const root = document.documentElement;

    let currentLang = DEFAULT_LANG;
    const sources = new Map(); // élément -> contenu français d'origine

    /* ---------- Lecture / mémorisation ---------- */
    function readStoredLang() {
        try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
    }

    function storeLang(lang) {
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* stockage indisponible */ }
    }

    function detectLanguage() {
        const fromUrl = new URLSearchParams(window.location.search).get('lang');
        if (SUPPORTED.includes(fromUrl)) return fromUrl;

        const stored = readStoredLang();
        if (SUPPORTED.includes(stored)) return stored;

        const preferred = navigator.languages && navigator.languages.length
            ? navigator.languages
            : [navigator.language || DEFAULT_LANG];

        for (const code of preferred) {
            const base = String(code).toLowerCase().slice(0, 2);
            if (SUPPORTED.includes(base)) return base;
        }
        return DEFAULT_LANG;
    }

    /* ---------- Traduction du DOM ---------- */
    function parseAttrs(el) {
        const raw = el.getAttribute('data-i18n-attr');
        if (!raw) return [];
        return raw.split(';')
            .map(pair => pair.trim())
            .filter(Boolean)
            .map(pair => {
                const index = pair.indexOf(':');
                return { attr: pair.slice(0, index).trim(), key: pair.slice(index + 1).trim() };
            });
    }

    function collectSources() {
        document.querySelectorAll('[data-i18n], [data-i18n-html], [data-i18n-attr]').forEach(el => {
            const source = { attrs: {} };
            if (el.hasAttribute('data-i18n')) source.text = el.textContent;
            if (el.hasAttribute('data-i18n-html')) source.html = el.innerHTML;
            parseAttrs(el).forEach(({ attr }) => { source.attrs[attr] = el.getAttribute(attr); });
            sources.set(el, source);
        });
    }

    function lookup(dict, key, fallback) {
        if (!dict || dict[key] === undefined) {
            console.warn(`[i18n] Traduction manquante : "${key}"`);
            return fallback;
        }
        return dict[key];
    }

    function translateElement(el, source, lang) {
        const dict = lang === DEFAULT_LANG ? null : data[lang];
        const useSource = lang === DEFAULT_LANG;

        if (source.text !== undefined) {
            el.textContent = useSource ? source.text : lookup(dict, el.getAttribute('data-i18n'), source.text);
        }
        if (source.html !== undefined) {
            el.innerHTML = useSource ? source.html : lookup(dict, el.getAttribute('data-i18n-html'), source.html);
        }
        parseAttrs(el).forEach(({ attr, key }) => {
            el.setAttribute(attr, useSource ? source.attrs[attr] : lookup(dict, key, source.attrs[attr]));
        });
    }

    /* ---------- Messages du JavaScript ---------- */
    function t(key, params) {
        const table = (data.ui && data.ui[currentLang]) || {};
        const fallback = (data.ui && data.ui[DEFAULT_LANG]) || {};
        const text = table[key] !== undefined ? table[key] : fallback[key];
        if (text === undefined) return key;
        return text.replace(/\{(\w+)\}/g, (match, name) => (params && name in params ? params[name] : match));
    }

    /* ---------- Sélecteur de langue ---------- */
    const toggle = document.querySelector('.lang-toggle');

    function updateToggle() {
        if (!toggle) return;
        toggle.querySelectorAll('[data-lang-opt]').forEach(option => {
            const active = option.getAttribute('data-lang-opt') === currentLang;
            option.classList.toggle('is-active', active);
            if (active) option.setAttribute('aria-current', 'true');
            else option.removeAttribute('aria-current');
        });
        toggle.setAttribute('aria-label', t('lang.switch'));
    }

    /* ---------- API publique ---------- */
    function setLanguage(lang, options) {
        const persist = !options || options.persist !== false;
        if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;

        currentLang = lang;
        root.setAttribute('lang', lang);
        sources.forEach((source, el) => translateElement(el, source, lang));
        updateToggle();
        if (persist) storeLang(lang);

        document.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang } }));
    }

    function retranslate(el) {
        const source = sources.get(el);
        if (source) translateElement(el, source, currentLang);
    }

    window.i18n = {
        t,
        setLanguage,
        retranslate,
        getLanguage: () => currentLang
    };

    /* ---------- Initialisation ---------- */
    collectSources();

    if (toggle) {
        toggle.addEventListener('click', () => {
            setLanguage(currentLang === 'fr' ? 'en' : 'fr');
        });
    }

    setLanguage(detectLanguage(), { persist: false });
})();
