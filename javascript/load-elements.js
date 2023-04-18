async function loadNavbar() {
    const response = await fetch('navbar.html');
    const navbarContent = await response.text();
    document.getElementById('navbar-container').innerHTML = navbarContent;
}

async function loadFooter() {
    const response = await fetch("footer.html");
    const footerContent = await response.text();
    document.getElementById("footer-container").innerHTML = footerContent;
}

loadNavbar();
loadFooter();
