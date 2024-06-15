// Q&A Card functionality

const cards = document.querySelectorAll('.qa-card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        let cardChild = card.children[1];
        card.classList.toggle('open');

        if (card.classList.contains('open')) {
            // Set a custom transition duration for opening
            cardChild.style.transitionDuration = (cardChild.scrollHeight / 200) + 's';
        } else {
            // Set the default transition duration for closing
            cardChild.style.transitionDuration = "0.5s";
        }
        cardChild.style.height = cardChild.style.height ? null : cardChild.scrollHeight + 'px';

    })
})

// Display items on home page

let products = document.querySelectorAll(".card");
let currentURL = new URL(domain);
let productsData;

// Function to fetch data and update products
async function fetchAndLoadProducts() {
    try {
        productsData = await fetchData(currentURL + "products?page_size=3");
        updateProducts(productsData);
    } catch (error) {
        console.error('Error fetching and updating products:', error);
    }
}

window.addEventListener("load", fetchAndLoadProducts);


function updateProducts(data) {

    clearProducts();

    data.forEach(function (product, i) {
        products[i].innerHTML = `
        <img src="${product.image_url}" alt="Image of product" />
        <h5>${product.name}</h5>
        <div class="p-desc">
          ${product.description}
        </div>
        <a href="/shop"><button>Buy Now</button></a>
            `;
    });
}

function clearProducts() {
    products.forEach(product => {
        product.innerHTML = "";
        product.classList.remove("pre-load");
    });
}