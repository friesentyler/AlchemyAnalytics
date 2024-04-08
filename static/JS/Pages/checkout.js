// Delete Cart Items

let deleteBtns = document.querySelectorAll(".x-btn");

deleteBtns.forEach(function (btn) {
    let product = btn.parentElement;
    btn.addEventListener("click", function () {
        product.classList.add("remove");
    });

    product.addEventListener("animationend", function () {
        product.remove();
        isEmpty();
    });
});

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