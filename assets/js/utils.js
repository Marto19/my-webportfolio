export function initializeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    
    window.toggleMobileMenu = () => {
        navLinks.classList.toggle('active');
    };
}
