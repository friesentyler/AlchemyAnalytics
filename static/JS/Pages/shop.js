// Product Viewer

function loadEvents() {
    let viewBtns = document.querySelectorAll(".product-btn");
    let coverScrn = document.getElementById("cover-scrn");

    viewBtns.forEach(function (btn) {
        let product = btn.parentElement;
        let xbtn = product.parentElement.querySelector(".x-btn");

        btn.addEventListener("click", function () {
            if (btn.innerText.includes("Add")) {
                addCartItem(); // Adds item to cart     
            }
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
}

function closeProduct(product, coverScrn, xbtn, btn) {
    product.classList.remove("active");
    coverScrn.classList.remove("active");
    xbtn.classList.remove("active");
    btn.innerText = "View Item";
}

function addCartItem() {
    let cart = document.getElementById("cart");
    let cartItems = document.querySelector(".cart .items");
    let val = cart.getAttribute("data-items");
    val++;
    cart.style.display = "inline-block";
    cart.style.pointerEvents = "all";
    cartItems.style.display = "block";
    cartItems.innerText = val;
    cart.setAttribute("data-items", val);


}




// Mobile Filters Btn

let filterBtn = document.getElementById("filter-btn");

filterBtn.addEventListener("click", function () {
    let filter = document.getElementById("filter");
    filter.classList.toggle("active");
});

// Set URL Query String

function urlQueryString(param, value) {
    let url = new URL(window.location.href);
    url.searchParams.set(param, value);
    window.location.href = url;
}

function urlQueryStringUrl(param, value, url) {
    url.searchParams.set(param, value);
    window.location.href = url;
}

//----------------
// Filter Products
//----------------

// Slider range

var slider = document.getElementById("price-range");
var val = document.getElementById("price-value");

val.innerHTML = slider.value;

if (window.location.search.includes("max_price")) {
    let url = new URL(window.location.href);
    let maxPrice = url.searchParams.get("max_price");
    slider.value = maxPrice;
    val.innerHTML = maxPrice;
}

slider.oninput = function () {
    val.innerHTML = this.value;
};

slider.addEventListener("mouseup", function () {
    urlQueryString("max_price", this.value);
});

slider.addEventListener("touchend", function () {
    urlQueryString("max_price", this.value);
});

// If slider is being dragged




// Sort By

let sorter = document.getElementById("sortby");
let sortOptions = ["Oldest", "Price: Low", "Price: High", "Newest"];
let sortValues = ["oldest", "low", "high", "newest"];
let currentSort;

if (window.location.search.includes("sort")) {
    let url = new URL(window.location.href);
    let sort = url.searchParams.get("sort_by");

    if (sort === "oldest") {
        currentSort = 0;
    } else if (sort === "low") {
        currentSort = 1;
    } else if (sort === "high") {
        currentSort = 2;
    } else if (sort === "newest") {
        currentSort = 3;
    }

    sorter.value = currentSort;
    sorter.innerHTML = sortOptions[currentSort];
}

sorter.addEventListener("click", function () {
    if (currentSort < 3) {
        currentSort++;
    } else {
        currentSort = 0;
    }
    sorter.innerHTML = sortOptions[currentSort];
    sorter.value = currentSort;

    urlQueryString("sort_by", sortValues[currentSort]);
});

// Checkboxes Inputs
let cbInputs = document.querySelectorAll("#filter input[type='checkbox']");
let cbPack = document.querySelectorAll("#filter input[type='checkbox'].pack");
let cbItem = document.querySelectorAll("#filter input[type='checkbox'].item");

clearCheckboxes();
function clearCheckboxes(except) {
    cbInputs.forEach(function (checkbox) {
        if (checkbox !== except)
        checkbox.checked = false;
    });
}

// Packs or Items
cbPack.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
        let url = new URL(window.location.href);
        if (window.location.search.includes("indicator_or_strategy")) {
            url.searchParams.delete("indicator_or_strategy");
        }
        if (checkbox.checked) {
            let cbQueryName = checkbox.getAttribute("data-queryName");
            urlQueryStringUrl("item_or_package", cbQueryName, url);
        } else {
            url.searchParams.delete("item_or_package");
            window.location.href = url;
        }
        clearCheckboxes(checkbox);
    });
});

if (window.location.search.includes("item_or_package")) {
    let url = new URL(window.location.href);
    let searchFor = url.searchParams.get("item_or_package");
    let checkbox = document.querySelector(`input[data-queryName="${searchFor}"].pack`);
    checkbox.checked = true;
}


// Indicator or Strategy
cbItem.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
        let url = new URL(window.location.href);
        if (window.location.search.includes("item_or_package")) {
            url.searchParams.delete("item_or_package");
        }
        if (checkbox.checked) {
            let cbQueryName = checkbox.getAttribute("data-queryName");
            urlQueryStringUrl("indicator_or_strategy", cbQueryName, url);
        } else {
            url.searchParams.delete("indicator_or_strategy");
            window.location.href = url;
        }

        clearCheckboxes();
        checkbox.checked = true;
    });
});

if (window.location.search.includes("indicator_or_strategy")) {
    let url = new URL(window.location.href);
    let searchFor = url.searchParams.get("indicator_or_strategy");
    let checkbox = document.querySelector(`input[data-queryName="${searchFor}"].item`);
    checkbox.checked = true;
}


//-----------
// Pagination
//-----------

var itemCount;
let paginationBtns = document.querySelectorAll(".circle");
let itemsPerPage = window.location.search.includes("page_size") ? parseInt(new URL(window.location.href).searchParams.get("page_size")) : returnItemsCount();
let totalPages = 0;

if (!window.location.search.includes("page_size")) {
    urlQueryString("page_size", returnItemsCount());
}



window.addEventListener("load", function () {
    setPagination(parseInt(currentPage));
    paginationBtns.forEach(function (btn) {
        if (btn.innerText === currentPage) {
            btn.classList.add("active");
        }
    });
});


function loadPagination() {
    if (totalPages < 5) {
        switch (totalPages) {
            case 1: 
                paginationBtns[2].style.display = "none";
                paginationBtns[3].style.display = "none";
                paginationBtns[4].style.display = "none";
                paginationBtns[5].style.display = "none";
                break;
            case 2:
                paginationBtns[3].style.display = "none";
                paginationBtns[4].style.display = "none";
                paginationBtns[5].style.display = "none";
                break;
            case 3:
                paginationBtns[4].style.display = "none";
                paginationBtns[5].style.display = "none";
                break;
            case 4:
                paginationBtns[5].style.display = "none";
                break;
        }
    }
    paginationBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            if (btn.classList.contains("start")) {
                let url = new URL(window.location.href);
                url.searchParams.set("page", 1);
                window.location.href = url;
                return;
            } else if (btn.classList.contains("end")) {
                let url = new URL(window.location.href);
                url.searchParams.set("page", totalPages);
                window.location.href = url;
                return;
            } else {
                let url = new URL(window.location.href);
                url.searchParams.set("page", btn.innerText);
                window.location.href = url;
            }
            setPagination(parseInt(btn.innerText));
        });
    });
}


function setPagination(page) {
    if (page > 3) {
        let incrementor = page - 3;
        paginationBtns.forEach(function (btn) {
            btn.classList.remove("active");
            if (!btn.classList.contains("start") && !btn.classList.contains("end")) {
                incrementor++;
                btn.innerText = incrementor;
            }
        });
        paginationBtns[3].classList.add("active");
    } else {
        let incrementor = 0;
        paginationBtns.forEach(function (btn) {
            btn.classList.remove("active");
            if (!btn.classList.contains("start") && !btn.classList.contains("end")) {
                incrementor++;
                btn.innerText = incrementor;
            }
        });

        if (page === 1) {
            paginationBtns[1].classList.add("active");
        } else if (page === 2) {
            paginationBtns[2].classList.add("active");
        } else if (page === 3) {
            paginationBtns[3].classList.add("active");
        }
    }
}




//Resize Events

function returnItemsCount() {
    let products = document.getElementById("products");

    if (window.innerWidth <= 800 && window.innerHeight <= 600) {
        return 6;
    }

    if (products.offsetWidth <= 720) {
        return 8;
    }

    if (products.offsetWidth <= 1080) {
        return 10;
    }
    return 12;
}

function debounce(func) {
    var timer;
    return function (event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 100, event);
    };
}


let url = new URL(window.location.href);
const currentPage = url.searchParams.get("page") || 1;




let currentURL = new URL("http://127.0.0.1:8000/");
let productsData;

// Function to fetch data and update products
async function fetchAndLoadProducts() {
    try {
        productsData = await fetchData(currentURL + "products" + getQueryStrings());
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
                    <p class="price-lbl">$<span id="price">${product.price}</span></p>
                    <p class="p-desc">
                    ${product.description}
                    </p>
                </div>
                <button class="product-btn" id="product1">View Item</button>
            </div>
            `;
        products.appendChild(productDiv);
        itemCount = product.total_number_of_products;
        totalPages = Math.ceil(itemCount / itemsPerPage)
    });
    loadEvents();
    loadPagination();
}

function clearProducts() {
    let products = document.getElementById("products");
    products.innerHTML = "";
}


// Grab Query Strings

function getQueryStrings() {
    let url = new URL(window.location.href);
    let searchParams = "?" + url.searchParams;
    return searchParams;
}