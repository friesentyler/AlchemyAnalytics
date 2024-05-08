

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


function handleClick() {
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




// Show cart icon on shop page

const cart = document.getElementById("cart");
const cartItems = document.querySelector(".cart .items");

if (window.location.pathname.includes("shop") && cart.getAttribute("data-items") > 0) {

    toggleCart();
}

function toggleCart() {
    let val = cart.getAttribute("data-items");

    if (val > 0) {
        cart.style.display = "inline-block";
        cart.style.pointerEvents = "all";
        cartItems.style.display = "block";
        cartItems.innerHTML = val;
    }
}
