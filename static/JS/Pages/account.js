// Product Viewer
function loadEvents() {
    let viewBtns = document.querySelectorAll(".product-btn");
    let coverScrn = document.getElementById("cover-scrn");

    viewBtns.forEach(function (btn) {
        let product = btn.parentElement;
        let xbtn = product.parentElement.querySelector(".x-btn");

        btn.addEventListener("click", function () {
            if (btn.innerHTML.includes("Download")) {
                let downloadLink = btn.getAttribute("data-download");
                window.open("https://" + downloadLink, "_blank");
            }
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
}

function closeProduct(product, coverScrn, xbtn, btn) {
    product.classList.remove("active");
    coverScrn.classList.remove("active");
    xbtn.classList.remove("active");
    btn.innerText = "View Item";
}


// Fetch data from the API to get user products



let currentURL = new URL(domain);
let productsData;

// Function to fetch data and update products
async function fetchAndLoadProducts() {
    try {
        productsData = await fetchData(currentURL + "user_products");
        updateProducts(productsData);
    } catch (error) {
        console.error('Error fetching and updating products:', error);
    }
}

window.addEventListener("load", fetchAndLoadProducts);


function updateProducts(data) {
    clearProducts();
    let products = document.getElementById("products");

    data.forEach(function (product) {
        let productDiv = document.createElement("div");
        productDiv.classList.add("p-viewer");
        productDiv.innerHTML = `
            <div class="card">
                <div class="x-btn xpv"><span></span><span></span></div>
                <div class="card-scroll">
                    <img src="${product.image_url}" alt="Image of product" draggable="false" />
                    <h5>${product.name}</h5>
                    <p class="p-desc">
                    ${product.description}
                    </p>
                </div>
                <button class="product-btn" id="product1" data-download="${product.download_url}">View Item</button>
            </div>
            `;
        products.appendChild(productDiv);
    });
    if (!productsData.length > 0) {
        products.innerHTML = `
        <h6 style="width: 100%;">You don't have any products to download!</h6>
        <br>
        <a style="margin-right: auto;" href="/shop"><button style="color: #342C40;" class="modern-btn">Visit Shop</button></a>
        `;
    }
    loadEvents();
}

function clearProducts() {
    let products = document.getElementById("products");
    products.innerHTML = "";
}