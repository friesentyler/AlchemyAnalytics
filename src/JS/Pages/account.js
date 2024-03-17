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
        btn.innerHTML = btn.innerHTML.includes("View") ? "Download <i class=\"fa-solid fa-download\"></i>" : "View Item";

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