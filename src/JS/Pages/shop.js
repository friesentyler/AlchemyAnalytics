var slider = document.getElementById("price-range");
var val = document.getElementById("price-value");

val.innerHTML = slider.value;

slider.oninput = function () {
    val.innerHTML = this.value;
}

let sorter = document.getElementById("sortby");
let currentSort = 2;
let sortOptions = ["Price: Low", "Price: High", "Newest", "Oldest"];

sorter.addEventListener("click", function () {
    if (currentSort < 3) {
        currentSort++;
    } else {
        currentSort = 0;
    }
    sorter.innerHTML = sortOptions[currentSort];
    sorter.value = currentSort;
});


// Product Viewer

let viewBtns = document.querySelectorAll(".product-btn");
let coverScrn = document.getElementById("cover-scrn");

viewBtns.forEach(function (btn) {
    let product = btn.parentElement;
    let xbtn = product.parentElement.querySelector(".x-btn");

    btn.addEventListener("click", function () {
        product.classList.toggle("active");
        coverScrn.classList.toggle("active");
        xbtn.classList.toggle("active");
        btn.innerText = btn.innerText.includes("View") ? "Add to cart" : "View Item";

    });

    xbtn.addEventListener("click", function () {
        closeProduct(product, coverScrn, xbtn, btn);
    });

    coverScrn.addEventListener("click", function () {
        closeProduct(product, coverScrn, xbtn, btn);
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeProduct(product, coverScrn, xbtn, btn);
        }
    });

    window.addEventListener("scroll", function () {
        closeProduct(product, coverScrn, xbtn, btn);
    });
});

function closeProduct(product, coverScrn, xbtn, btn) {
    product.classList.remove("active");
    coverScrn.classList.remove("active");
    xbtn.classList.remove("active");
    btn.innerText = "View Item";
}


// Mobile Filters Btn

let filterBtn = document.getElementById("filter-btn");

filterBtn.addEventListener("click", function () {
    let filter = document.getElementById("filter");
    filter.classList.toggle("active");
});