// Product Viewer

// TODO: Reorganize code into functions

let firstText = "View Stats";
let secondText = "Edit Item";
let actionText1 = "Close";
let actionText2 = "Upload Changes";

let viewBtns = document.querySelectorAll(".product-manage");
let editBtns = document.querySelectorAll(".product-edit");
let coverScrn = document.getElementById("cover-scrn");

var currentBtn = null;
var currentBtns = null;


function checkAction() {
    if (currentBtns === viewBtns) {
        return viewBtns;
    } else if (currentBtns === editBtns) {
        return editBtns;
    } else {
        return null;
    }
}


btnFunction(viewBtns);
btnFunction(editBtns);

function btnFunction(btns) {
    btns.forEach(function (btn) {
        btnAddEvent(btn, btns);
    });
}

function btnAddEvent(btn, btns) {
    let product = btn.parentElement;
    let xbtn = product.parentElement.querySelector(".x-btn");

    btn.addEventListener("click", function (e) {
        if (product.classList.contains("active")) {

            if (currentBtns === viewBtns) {
                closeProduct(viewBtns);
            } else {
                closeProduct(editBtns);
            }
            return;
        }

        openProductView(btn, btns, product, xbtn);
    });
}

// Opening View Product
function openProductView(btn, btns, product, xbtn) {
    product.classList.add("active");
    coverScrn.classList.add("active");
    xbtn.classList.add("active");

    switch (btns) {
        case viewBtns:
            btn.nextElementSibling.classList.add("remove");
            btn.innerText = actionText1;
            getStats(product.parentNode.parentNode, product.parentNode, product.querySelector(".card-scroll .p-desc"));
            break;
        case editBtns:
            btn.previousElementSibling.innerText = "Delete Product";
            btn.previousElementSibling.classList.add("pos1");
            btn.classList.add("pos2");
            btn.innerText = actionText2;

            product.querySelectorAll(".card-scroll .e-text").forEach(function (eText) {
                eText.setAttribute("contenteditable", "true");
                eText.classList.add("editable");
            });
            break;
    }

    currentBtn = btn;
    currentBtns = btns;
}


xBtn();
function xBtn() {
    let xbtns = document.querySelectorAll(".x-btn");
    xbtns.forEach(function (xbtn) {
        xbtn.addEventListener("click", function () {
            closeProduct(checkAction(currentBtns));
        });
    });
}



coverScrn.addEventListener("click", function () {
    closeProduct(checkAction(currentBtns));

});

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeProduct(checkAction(currentBtns));
    }
});




function closeProduct(btns) {

    if (currentBtn === null) {
        return;
    }

    product = currentBtn.parentElement;
    let xbtn = product.parentElement.querySelector(".x-btn");

    let text = currentBtns === viewBtns ? firstText : secondText;

    product.classList.remove("active");
    coverScrn.classList.remove("active");
    xbtn.classList.remove("active");
    currentBtn.innerText = text;

    // Checks if view or edit button 


    switch (btns) {
        case viewBtns: //View Product
            currentBtn.nextElementSibling.classList.remove("remove");
            product.querySelector(".card-scroll .p-desc").innerHTML = defaultText;
            break;
        case editBtns: //Edit Product
            currentBtn.previousElementSibling.innerText = firstText;
            currentBtn.previousElementSibling.classList.remove("pos1");
            currentBtn.classList.remove("pos2");

            product.querySelectorAll(".card-scroll .e-text").forEach(function (eText) {
                eText.setAttribute("contenteditable", "false");
                eText.classList.remove("editable");

            });
            break;
        default: //Add Product
            product.classList.remove("active");
            coverScrn.classList.remove("active");
            xbtn.classList.remove("active");
            currentBtn.innerText = firstText;
            currentBtn.nextElementSibling.classList.remove("remove");

            product.querySelectorAll(".card-scroll .e-text").forEach(function (eText) {
                eText.setAttribute("contenteditable", "false");
                eText.classList.remove("editable");
            });
            break;

    }
}


// Stats Append

let statsSold = [52, 56];
let statsRevenue = [2600.00, 2800.00];
let defaultText = null;

function getStats(parent, child, e) {
    let i = Array.prototype.indexOf.call(parent.children, child);
    defaultText = e.innerHTML;
    e.innerHTML = statsCombine(statsSold[i], statsRevenue[i]) + e.innerHTML;
}

function statsCombine(sold, revenue) {
    let statsText = `<b>STATS:</b> <br>
    <u>Sell Count</u>: ${sold} <br>
    <u>Revenue</u>: $${revenue} <br><br>`;

    return statsText;
}

// Add Product

let productContainer = document.getElementById("products");

document.getElementById("add").addEventListener("click", function () {
    addProduct();
});

function addProduct() {
    productContainer.insertAdjacentHTML("afterbegin", `
            <div class="p-viewer">
                <div class="card">
                    <div class="x-btn xpv"><span></span><span></span></div>
                    <div class="card-scroll">
                        <img src="/Images/product.png" alt="Image of product" />
                        <h5 class="e-text">Product Name</h5>
                        <p class="price-lbl">$<span class="e-text">Product Price</span></p>
                        <p class="p-desc e-text">Product Description</p>
                    </div>
                    <button class="product-manage">Add Item</button>
                    <button class="product-edit">Edit Item</button>
                </div>
            </div>
    `);
    addMenu();
}

function addMenu() {
    let product = productContainer.firstElementChild.children[0];
    // let xbtn = product.querySelector(".x-btn");

    // product.classList.add("active");
    // coverScrn.classList.add("active");
    // xbtn.classList.add("active");
    btn1 = product.querySelector(".product-manage");
    btn2 = product.querySelector(".product-edit");

    // btn1.innerText = "Add Item";
    // btn2.classList.add("remove");

    // product.querySelectorAll(".card-scroll .e-text").forEach(function (eText) {
    //     eText.setAttribute("contenteditable", "true");
    //     eText.classList.add("editable");
    // });

    currentBtn = btn1;
    currentBtns = null;
    
    btnAddEvent(btn1, viewBtns);
    btnAddEvent(btn2, editBtns);
    xBtn();
}