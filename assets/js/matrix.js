/**
 * Matrix Rain Animation
 * This module creates the iconic "Matrix" digital rain effect in the background
 * of the portfolio website. It uses HTML5 Canvas to render falling characters
 * that create a cyberpunk-inspired visual effect.
 * 
 * Features:
 * - Dynamic character streams
 * - Responsive canvas sizing
 * - Custom character set including letters, numbers, and symbols
 * - Configurable animation speed and density
 * - Automatic resizing on window resize
 */

export function initializeMatrix() {
    // Get canvas element and context
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size to match window dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Define the character set used in the matrix rain
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");

    // Configuration for the matrix effect
    const fontSize = 10;
    const columns = canvas.width / fontSize; // Number of character columns

    // Initialize drop positions for each column
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    /**
     * Main drawing function for the matrix effect
     * This function:
     * 1. Creates a semi-transparent black overlay for fade effect
     * 2. Renders characters in each column
     * 3. Updates drop positions
     * 4. Randomly resets columns when they reach bottom
     */
    function drawMatrix() {
        // Create fade effect with semi-transparent overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set style for matrix characters
        ctx.fillStyle = '#0f0'; // Matrix green
        ctx.font = fontSize + 'px monospace';

        // Draw and update each column
        for (let i = 0; i < drops.length; i++) {
            // Get random character from our character set
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Reset column if it reaches bottom (with random chance)
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    // Start animation loop
    setInterval(drawMatrix, 35);

    // Handle window resizing
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
