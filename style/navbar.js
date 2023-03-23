function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-link");

    for (const link of navLinks) {
        if (link.href.endsWith(currentPath)) {
            link.classList.add("nav-link-active");
            break;
        }
    }
}

function initNavbar() {
    setActiveNavLink();
}
