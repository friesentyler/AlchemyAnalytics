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

        if (btn.innerText.includes("Add")) {
            toggleCart();
        }

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

// Set URL Query String

function urlQueryString(param, value) {
    let url = new URL(window.location.href);
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

if (window.location.search.includes("max-price")) {
    let url = new URL(window.location.href);
    let maxPrice = url.searchParams.get("max-price");
    slider.value = maxPrice;
    val.innerHTML = maxPrice;
}

slider.oninput = function () {
    val.innerHTML = this.value;
};

slider.addEventListener("mouseup", function () {
        urlQueryString("max-price", this.value);
});

slider.addEventListener("touchend", function () {
    urlQueryString("max-price", this.value);
});

// If slider is being dragged




// Sort By

let sorter = document.getElementById("sortby");
let sortOptions = ["Price: Low", "Price: High", "Newest", "Oldest"];
let currentSort;

if (window.location.search.includes("sort")) {
    let url = new URL(window.location.href);
    let sort = url.searchParams.get("sort");
    sorter.value = sort;
    currentSort = sort;
    sorter.innerHTML = sortOptions[sort];
}

sorter.addEventListener("click", function () {
    if (currentSort < 3) {
        currentSort++;
    } else {
        currentSort = 0;
    }
    sorter.innerHTML = sortOptions[currentSort];
    sorter.value = currentSort;

    urlQueryString("sort", currentSort);
});

// Checkboxes Inputs

let checkboxes = document.querySelectorAll("#filter input[type='checkbox']");


checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            let cbQueryName = checkbox.getAttribute("data-queryName");
            urlQueryString("searchFor" , cbQueryName);
        }
    });
});

if (window.location.search.includes("searchFor")) {
    let url = new URL(window.location.href);
    let searchFor = url.searchParams.get("searchFor");
    let checkbox = document.querySelector(`input[data-queryName="${searchFor}"]`);
    checkbox.checked = true;
}


//-----------
// Pagination
//-----------

function returnItemsCount() {
    let products = document.getElementById("products");
    console.log(products.offsetWidth);

    if ( window.innerWidth <= 800 && window.innerHeight <= 600 ) {
        return 6;
    }

    if ( products.offsetWidth <= 720) {
        return 8;
    }

    if ( products.offsetWidth <= 1080) {
        return 10;
    }
    return 12;
}
function debounce(func){
    var timer;
    return function(event){
      if(timer) clearTimeout(timer);
      timer = setTimeout(func,100,event);
    };
  }


let url = new URL(window.location.href);
const currentPage = url.searchParams.get("page") || 1;
let itemsPerPage = returnItemsCount();

window.addEventListener("resize", debounce(function () {
    itemsPerPage = returnItemsCount();
}));

console.log(itemsPerPage);
    // Update URL


        // Start & End Pages

        
