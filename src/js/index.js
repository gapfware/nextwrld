// Exponer funciones globales inmediatamente
window.changeLanguage = () => {}; // Placeholder

import './modules/header.js';
import './modules/animations.js';
import './modules/faq.js';
import { changeLanguage, initI18n } from './modules/i18n.js';

// Actualizar las funciones globales con las implementaciones reales
window.changeLanguage = changeLanguage;

// Inicializar i18n después de que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initI18n();
});
