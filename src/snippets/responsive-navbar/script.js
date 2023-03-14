const navbarToggle = document.querySelector("#navbar-toggle");
const navbarMenu = document.querySelector("#navbar-menu");
const navbar = document.querySelector("#navbar");
const navbarItemsContainer = navbarMenu.querySelector(".navbar-items");
const navbarBackground = document.querySelector("#navbar-background");

let isNavbarExpanded = navbarToggle.getAttribute("aria-expanded") === "true";

const toggleNavbarVisibility = () => {
    isNavbarExpanded = !isNavbarExpanded;
    navbarToggle.setAttribute("aria-expanded", isNavbarExpanded);
};

[navbarToggle, navbarBackground].map((div) => {
    div.addEventListener("click", (ev) => {
        toggleNavbarVisibility();
        ev.stopPropagation();
    });
});
navbarMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    // toggleNavbarVisibility
});
