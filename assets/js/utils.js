/**
 * Utility Functions
 * This module contains utility functions used across the portfolio website.
 * Currently implements mobile menu functionality for responsive navigation.
 */

/**
 * Initialize Mobile Menu Functionality
 * Sets up the hamburger menu toggle for mobile devices.
 * Creates a global toggleMobileMenu function that can be called from HTML.
 */
export function initializeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    
    // Define global toggle function for mobile menu
    window.toggleMobileMenu = () => {
        navLinks.classList.toggle('active');
    };
}
