const domain = "http://127.0.0.1:8000/";



// Fetch Data from API

async function fetchData(url) {
    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        alertMessage("Product Error!", "Try reloading the page");
        throw error;
    }
}

// Post Data to API

async function postData(url, data) {
    try {

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        // return response.json();
    } catch (error) {
        alertMessage("Cart Error!", "Try reloading the page");
        throw error;
    }
}



// Set URL Query String

function urlQueryString(param, value) {
    let url = new URL(window.location.href);
    url.searchParams.set(param, value);
    window.history.pushState({}, '', url);
}

function urlQueryStringUrl(param, value, url) {
    url.searchParams.set(param, value);
    window.history.pushState({}, '', url);
}

// Grab Query Strings

function getQueryStrings() {
    let url = new URL(window.location.href);
    let searchParams = "?" + url.searchParams;
    return searchParams;
}

// Local Storage Functions

function storeLocalData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getLocalData(key) {
    return JSON.parse(localStorage.getItem(key));
}

function replaceLocalData(key, data) {
    removeLocalData(key);
    storeLocalData(key, data);
}

function removeLocalData(key) {
    localStorage.removeItem(key);
}


// Pushes cart  to local storage
let shoppingCart = getLocalData("cart") || [];

function addToCart() {
    
    if (doesItemExist(document.querySelector(".card.active h5").innerText)) {
        alertMessage("Item in cart", "Item already in cart");
        return;
    }

    shoppingCart.push({
        name: document.querySelector(".card.active h5").innerText,
        price: document.querySelector(".card.active #price").innerText,
        image: document.querySelector(".card.active img").src
    });
    storeLocalData("cart", shoppingCart);
}

// Checks if cart is empty and updates the cart icon

checkCart();
function checkCart() {
    let cart = document.getElementById("cart");
    let cartItems = document.querySelector(".cart .items");
    if (shoppingCart.length > 0) {
        let val = shoppingCart.length;
        cartItems.innerText = val;

        cart.style.display = "inline-block";
        cart.style.pointerEvents = "all";
        cartItems.style.display = "block";
    } else {
        cart.style.display = "none";
        cart.style.pointerEvents = "none";
        cartItems.style.display = "none";
    }
}

// Remove from cart

function removeFromCart(name) {

    let index = shoppingCart.findIndex(function (cartItem) {
        return cartItem.name === name;
    });


    shoppingCart.splice(index, 1);
    replaceLocalData("cart", shoppingCart);
    checkCart();
}

// Does Cart Item Exist

function doesItemExist(itemName) {
    let exists = shoppingCart.find(function (cartItem) {
        return cartItem.name === itemName;
    });

    return exists;
}



// Alert

let alert = document.querySelector(".alert");
let alertHeader = document.querySelector(".alert h6");
let alertMsg = document.querySelector(".alert p");
let alertClose = document.querySelector(".alert-close");

function alertMessage(head, msg) {
    alertHeader.innerText = head;
    alertMsg.innerText = msg;
    alert.classList.add("active");

    alertClose.addEventListener("click", function () {
        alert.classList.remove("active");
    });

    setTimeout(function () {
        alert.classList.remove("active");
    }, 5000);
}