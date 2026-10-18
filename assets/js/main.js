/**
 * Good Citizen Olympiad - Main Interactive Application Script
 * Features:
 * - Theme Switcher (Default: Light, supports Dark mode, stores in localStorage)
 * - Language Switcher (Bengali <-> English with DOM replacement)
 * - Mobile Navigation Drawer Toggle
 * - Header scroll shadow detection
 * - Notification toast system
 */

(function () {
  'use strict';

  // --- 1. Theme Management (Default Light) ---
  const THEME_KEY = 'gco_theme_preference';

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    setTheme(savedTheme);
  }

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem(THEME_KEY, 'dark');
      updateThemeIcons('dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem(THEME_KEY, 'light');
      updateThemeIcons('light');
    }
  }

  function toggleTheme() {
    const currentTheme = localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  function updateThemeIcons(theme) {
    const themeBtns = document.querySelectorAll('.theme-toggle-btn');
    themeBtns.forEach(btn => {
      if (theme === 'dark') {
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
        btn.setAttribute('title', 'Switch to Light Mode');
        btn.setAttribute('aria-label', 'Switch to Light Mode');
      } else {
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
        btn.setAttribute('title', 'Switch to Dark Mode');
        btn.setAttribute('aria-label', 'Switch to Dark Mode');
      }
    });
  }

  // --- 2. Language Management (Default Bengali) ---
  const LANG_KEY = 'gco_lang_preference';

  function initLanguage() {
    const savedLang = localStorage.getItem(LANG_KEY) || 'bn';
    setLanguage(savedLang);
  }

  function setLanguage(lang) {
    localStorage.setItem(LANG_KEY, lang);
    if (lang === 'en') {
      document.body.classList.add('lang-en');
      document.documentElement.setAttribute('lang', 'en');
    } else {
      document.body.classList.remove('lang-en');
      document.documentElement.setAttribute('lang', 'bn');
    }

    updateLangButtons(lang);
    applyTranslations(lang);
  }

  function toggleLanguage() {
    const currentLang = localStorage.getItem(LANG_KEY) || 'bn';
    const newLang = currentLang === 'bn' ? 'en' : 'bn';
    setLanguage(newLang);
  }

  function updateLangButtons(lang) {
    const langBtns = document.querySelectorAll('.lang-toggle-btn');
    langBtns.forEach(btn => {
      btn.textContent = lang === 'bn' ? 'EN' : 'বাং';
      btn.setAttribute('title', lang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন');
    });
  }

  function applyTranslations(lang) {
    if (!window.GCO_TRANSLATIONS || !window.GCO_TRANSLATIONS[lang]) return;
    const dict = window.GCO_TRANSLATIONS[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.setAttribute('placeholder', dict[key]);
      }
    });
  }

  // --- 3. Header Scroll Effect ---
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- 4. Mobile Drawer Toggle ---
  function initMobileDrawer() {
    const openBtn = document.querySelector('.btn-mobile-menu');
    const drawer = document.querySelector('.mobile-drawer');
    const closeBtn = document.querySelector('.btn-close-drawer');

    if (!drawer) return;

    function openDrawer() {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (openBtn) openBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    // Close on clicking outside / link
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // --- 5. Accordion Initialization ---
  function initAccordions() {
    document.querySelectorAll('.accordion-button').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.accordion-item');
        const isActive = item.classList.contains('active');
        
        // Optional: close other items in the same accordion
        const parent = item.closest('.accordion');
        if (parent) {
          parent.querySelectorAll('.accordion-item').forEach(other => {
            if (other !== item) other.classList.remove('active');
          });
        }

        item.classList.toggle('active', !isActive);
      });
    });
  }

  // Expose global helper for language & theme toggling
  window.GCO = {
    setTheme,
    toggleTheme,
    setLanguage,
    toggleLanguage,
    getLanguage: () => localStorage.getItem(LANG_KEY) || 'bn',
    getTheme: () => localStorage.getItem(THEME_KEY) || 'light'
  };

  // Run on DOM load
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    initHeaderScroll();
    initMobileDrawer();
    initAccordions();

    // Attach click listeners to controls
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleLanguage);
    });
  });
})();
