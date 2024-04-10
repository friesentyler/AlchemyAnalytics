

// Check if cart is empty

let mcart = document.querySelector(".cart-items");

function isEmpty() {
    if (mcart.children.length === 0) {
        mcart.innerHTML = "<h6>Your cart is empty</h6>";
    }
}

$(document).ready(function () {
    isEmpty();
});


// Pull cart items from local storage

let cartCheckout = getLocalData("cart") || [];
let cartItemContainer = document.querySelector(".cart-items");

if (cartCheckout.length <= 0) {
    cartItemContainer.innerHTML = "<h6>Your cart is empty</h6>";
} else {
    cartItemContainer.innerHTML = "";
    passCart(); // Pass cart to endpoint for backend
}

cartCheckout.forEach(function (item) {
    let product = document.createElement("div");
    product.classList.add("c-item");
    product.innerHTML = `
            <div class="x-btn"><span></span><span></span></div>
            <img src="${item.image}" alt="Item Image" />
            <h6 class="ci-name">${item.name}</h6>
            <h6 class="ci-price">$${item.price}</h6>
    `;
    cartItemContainer.appendChild(product);
});
addDeleteBtns();


function addDeleteBtns() {
    let deleteBtns = document.querySelectorAll(".x-btn");

    deleteBtns.forEach(function (btn) {
        let product = btn.parentElement;
        btn.addEventListener("click", function () {
            product.classList.add("remove");
        });

        product.addEventListener("animationend", function () {
            product.remove();
            isEmpty();
            removeFromCart(product.querySelector(".ci-name").innerText);
            calcTotal();
            passCart();
        });
    });
}

calcTotal();
function calcTotal() {
    let total = 0;
    let prices = document.querySelectorAll(".ci-price");
    prices.forEach(function (price) {
        total += parseFloat(price.innerText.replace("$", ""));
    });
    total = total.toFixed(2);
    document.getElementById("checkout-total").innerText = total;
}

// Pass Cart Information to endpoint


function passCart() {
    let currentURL = new URL(domain);
    try {
        postData(currentURL + "purchase", cartCheckout);
    } catch (e) {
        alertMessage("Cart Error", "Try reloading the page");
        console.error('Error with passing backend cart data:', e);
    }
}