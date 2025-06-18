/**
 * Custom Cursor Implementation
 * This module creates an interactive custom cursor with trailing effects.
 * It replaces the default cursor with a stylized version that includes
 * multiple trailing elements for a more engaging user experience.
 * 
 * Features:
 * - Custom cursor with smooth movement
 * - Multiple trailing elements that follow the main cursor
 * - Fade effect on trailing elements
 * - Responsive to real-time mouse movement
 */

export function initializeCursor() {
    // Main cursor element
    const cursor = document.querySelector('.cursor');
    const cursorTrails = [];
    
    // Create multiple trailing elements for the cursor effect
    for (let i = 0; i < 5; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        cursorTrails.push(trail);
    }

    // Track mouse position
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    // Update mouse position on movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    /**
     * Animate the cursor and its trails
     * This function runs on every animation frame to:
     * 1. Update the main cursor position
     * 2. Update the position of trailing elements
     * 3. Apply fade effects to the trails
     */
    function animateCursor() {
        // Update cursor position instantly for responsiveness
        cursorX = mouseX;
        cursorY = mouseY;
        
        // Position the main cursor (offset by half its size for centering)
        cursor.style.left = (cursorX - 10) + 'px';
        cursor.style.top = (cursorY - 10) + 'px';
        
        // Update trail elements with decreasing opacity
        cursorTrails.forEach((trail, index) => {
            trail.style.opacity = 0.7 - index * 0.1;
        });
        
        // Continue the animation loop
        requestAnimationFrame(animateCursor);
    }
    
    // Start the cursor animation
    animateCursor();
}
