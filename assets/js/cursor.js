// Cursor functionality
export function initializeCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorTrails = [];
    
    // Create cursor trails
    for (let i = 0; i < 5; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        cursorTrails.push(trail);
    }

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Animate trails
        cursorTrails.forEach((trail, index) => {
            trail.style.opacity = 0.7 - index * 0.1;
        });
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}
