const navPopup = document.getElementById("navpopup");
const navIcon = document.getElementById("nav-icon");
const nav = document.querySelector("nav");



// Toggles classes for the nav menu
let hamburger = 0;

function openNav() {
    if (hamburger === 0) {
        let mobileNavBtns = document.querySelectorAll(".nav-btns");
        let children = mobileNavBtns[0].children;

        for (let i = 0; i < children.length; i++) {
            val = 0.3 + (i * 0.15);
            children[i].style.animationDelay = val + "s";
        }


        navPopup.classList.toggle("open");
        nav.classList.toggle("open");
        hamburger = 1;
    } else {
        toggleNav();
    }
}
// document.addEventListener('click', handleClick);
window.addEventListener("scroll", toggleNav);
window.addEventListener("keydown", handleEscKey);


function handleClick () {
    // Check if the clicked element is the dialog itself or its backdrop
        if (hamburger === 1) {
        // Clicked on the dialog or its backdrop, trigger toggleNav
        toggleNav();
    }
};

function toggleNav() {
    if (hamburger === 1) {
        nav.classList.remove("open");
        navPopup.classList.remove("open");
        hamburger = 0;
        }
}

function handleEscKey(event) {
    if (event.key == "Escape") {
        toggleNav();
    }
}
