import { RESPONSIVE_WIDTH } from './config.js';

let headerWhiteBg = false;
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH;
let collapseBtn, collapseHeaderItems;

function initializeElements() {
    collapseBtn = document.getElementById('collapse-btn');
    collapseHeaderItems = document.getElementById('collapsed-header-items');
}

function onHeaderClickOutside(e) {
    const items = document.getElementById('collapsed-header-items');
    const btn = document.getElementById('collapse-btn');
    if (!items?.contains(e.target) && !btn?.contains(e.target)) {
        toggleHeader();
    }
    const selector = document.getElementById('lang-selector');
    const langBtn = document.getElementById('lang-btn');
    if (!selector?.contains(e.target) && !langBtn?.contains(e.target) && selector?.style.display !== 'none') {
        hideLanguageSelector();
    }
}

function toggleHeader() {
    const btn = document.getElementById('collapse-btn');
    const items = document.getElementById('collapsed-header-items');
    if (!btn || !items) {
        return;
    }

    if (isHeaderCollapsed) {
        // Open menu
        items.classList.remove('tw-hidden');
        btn.classList.remove('bi-list');
        btn.classList.add('bi-x');
        btn.setAttribute('aria-expanded', 'true');
        btn.setAttribute('aria-label', 'Cerrar menú');
        isHeaderCollapsed = false;

        setTimeout(() => window.addEventListener('click', onHeaderClickOutside), 1);
    } else {
        // Close menu
        items.classList.add('tw-hidden');
        btn.classList.remove('bi-x');
        btn.classList.add('bi-list');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Abrir menú');
        isHeaderCollapsed = true;

        window.removeEventListener('click', onHeaderClickOutside);
    }
}

function closeMobileMenu() {
    const btn = document.getElementById('collapse-btn');
    const items = document.getElementById('collapsed-header-items');
    
    // Only close if we're in mobile mode and menu is open
    if (window.innerWidth <= RESPONSIVE_WIDTH && !isHeaderCollapsed) {
        items.classList.add('tw-hidden');
        btn.classList.remove('bi-x');
        btn.classList.add('bi-list');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Abrir menú');
        isHeaderCollapsed = true;
        window.removeEventListener('click', onHeaderClickOutside);
    }
}

function toggleLanguageSelector() {
    // Removed: no longer needed with toggle switch
}

function hideLanguageSelector() {
    const selector = document.getElementById('lang-selector');
    if (!selector) return;
    selector.style.display = 'none';
}

function updateCurrentLangDisplay() {
    const span = document.getElementById('current-lang');
    if (!span) return;
    const currentLang = localStorage.getItem('lang') || 'en';
    span.textContent = currentLang.toUpperCase();
}

function responsive() {
    const items = document.getElementById('collapsed-header-items');
    const btn = document.getElementById('collapse-btn');
    const wasDesktop = window.innerWidth > RESPONSIVE_WIDTH;
    
    if (wasDesktop) {
        // Desktop: show menu, hide button
        if (items) {
            items.classList.remove('tw-hidden');
            items.style.width = '';
        }
        if (btn) {
            btn.classList.add('tw-hidden');
            btn.setAttribute('aria-expanded', 'false');
        }
        isHeaderCollapsed = false;
    } else {
        // Mobile: ensure proper initial state
        if (items && items.classList.contains('tw-hidden')) {
            isHeaderCollapsed = true;
        } else if (items && !isHeaderCollapsed) {
            // Only close if it was open
            items.classList.add('tw-hidden');
            isHeaderCollapsed = true;
        }
        
        if (btn) {
            btn.classList.remove('tw-hidden');
            // Ensure button shows correct icon based on state
            if (isHeaderCollapsed) {
                btn.classList.add('bi-list');
                btn.classList.remove('bi-x');
                btn.setAttribute('aria-expanded', 'false');
            } else {
                btn.classList.remove('bi-list');
                btn.classList.add('bi-x');
                btn.setAttribute('aria-expanded', 'true');
            }
        }
    }
}

window.addEventListener('resize', responsive);

// IntersectionObserver for active navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.header-links');

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('tw-text-white', 'tw-font-bold');
                if (link.getAttribute('href') === `#${entry.target.id}`) {
                    link.classList.add('tw-text-white', 'tw-font-bold');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Initialize language display
updateCurrentLangDisplay();

// Add event listeners for language selector
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    updateCurrentLangDisplay();
    responsive(); // Initialize proper state on load
    
    // Removed: lang-btn event listener
});

// Expose functions globally
window.toggleHeader = toggleHeader;
window.closeMobileMenu = closeMobileMenu;
// window.toggleLanguageSelector = toggleLanguageSelector;
