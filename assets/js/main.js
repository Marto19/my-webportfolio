/**
 * Main JavaScript Entry Point
 * This file serves as the primary entry point for all JavaScript functionality in the portfolio.
 * It imports and initializes all major components of the interactive portfolio website.
 * 
 * Components initialized:
 * - Cursor: Custom interactive cursor with trailing effect
 * - Matrix: Background Matrix-style animation
 * - Terminal: Interactive terminal game and command interface
 * - Mobile Menu: Responsive navigation for mobile devices
 */

import { initializeCursor } from './cursor.js';
import { initializeMatrix } from './matrix.js';
import { initializeTerminal } from './terminal.js';
import { initializeMobileMenu } from './utils.js';

// Initialize all components when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCursor();    // Initialize custom cursor and trailing effects
    initializeMatrix();    // Start the Matrix background animation
    initializeTerminal();  // Set up the interactive terminal interface
    initializeMobileMenu(); // Enable mobile navigation functionality
});
