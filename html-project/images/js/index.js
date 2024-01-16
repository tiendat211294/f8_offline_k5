const header_toggleMenu = document.querySelector("#header_toggle-menu");
const header_navbar = document.querySelector("#header_navbar");

header_toggleMenu.addEventListener("click", () => {
    header_navbar.classList.toggle("active");
    header_toggleMenu.classList.toggle("active");
});
