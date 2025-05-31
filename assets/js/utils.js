export function initializeLoading() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('loadingScreen').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('loadingScreen').style.display = 'none';
            }, 500);
        }, 1500);
    });
}

export function initializeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    
    window.toggleMobileMenu = () => {
        navLinks.classList.toggle('active');
    };
}
