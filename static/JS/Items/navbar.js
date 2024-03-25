

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



// LOGIN BTN

const loginBtn = document.getElementById("login-btn");
const loginDD = document.getElementById("login-dd");
var login = true;

$(document).ready(function () {
    if (login == true) {
        loginBtn.innerHTML = `
        <svg class="icon i-w" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
        Account
        `;
        
    } else {
        loginBtn.innerHTML = `
        <svg class="icon i-w" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
        Sign in
        `;
    }
});

loginBtn.addEventListener("click", function () {
    if (login === true) {
        window.location.href = "../../../templates/HTML/Pages/account.html";
    } else {
        loginDD.classList.toggle("open");
        toggleNav();

        window.addEventListener("scroll", function () {
            loginDD.classList.remove("open");
        });
    }
});

// Show cart icon on shop page

const cart = document.getElementById("cart");
const cartItems = document.querySelector(".cart .items");


if (window.location.pathname.includes("shop") && cart.getAttribute("data-items") > 0) {
    cart.style.display = "inline-block";
    cart.style.pointerEvents = "all";

    toggleCart();
}

function toggleCart() {
    let val = cart.getAttribute("data-items");

    if (val > 0) {
        cartItems.style.display = "block";
        cartItems.innerHTML = val;
    }
}