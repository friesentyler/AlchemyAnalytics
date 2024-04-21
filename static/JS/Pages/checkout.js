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


async function passCart() {
    let currentURL = new URL(domain);
    try {
        let res = await postData(currentURL + "purchase", cartCheckout);

        // Extract the session ID from the response
        const sessionId = res.sessionId;

        // Redirect to the Stripe checkout session URL
        window.location.href = 'https://checkout.stripe.com/c/pay/' + sessionId;
    } catch (e) {
        alertMessage("Cart Error", "Try reloading the page");
        console.error('Error with passing backend cart data:', e);
    }
}

// Stripe Button 

let stripe = document.getElementById("stripe");

stripe.addEventListener("click", function () {
    passCart();
    // localStorage.removeItem("cart");
    setTimeout(() => {
        // Redirect to /purchase
    }, 2000);

});