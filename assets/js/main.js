import { initializeCursor } from './cursor.js';
import { initializeMatrix } from './matrix.js';
import { initializeTerminal } from './terminal.js';
import { initializeLoading, initializeMobileMenu } from './utils.js';
import { initializeLanguageSwitcher } from './language.js';

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    initializeCursor();
    initializeMatrix();
    initializeTerminal();
    initializeLoading();
    initializeMobileMenu();
    initializeLanguageSwitcher();
    initializeLanguageSwitcher();
});
