// Product Viewer

// TODO: Reorganize code into functions

let firstText = "View Item";
let secondText = "Edit Item";
let actionText1 = "Close";
let actionText2 = "Upload Changes";

let viewBtns = document.querySelectorAll(".product-manage");
let editBtns = document.querySelectorAll(".product-edit");
let coverScrn = document.getElementById("cover-scrn");

var currentBtn = null;
var currentBtns = null;


btnFunction(viewBtns);
btnFunction(editBtns);

function btnFunction(btns) {
    btns.forEach(function (btn) {
    let product = btn.parentElement;
    let xbtn = product.parentElement.querySelector(".x-btn");

    btn.addEventListener("click", function () {

        if (product.classList.contains("active")) {

            if (currentBtns === viewBtns) {
                closeProduct(viewBtns);
            } else {
                closeProduct(editBtns);
            }
            return;
        }

        product.classList.add("active");
        coverScrn.classList.add("active");
        xbtn.classList.add("active");

        if (btns === viewBtns) {
            btn.nextElementSibling.classList.add("remove");
            btn.innerText = actionText1;
    } else {
            btn.previousElementSibling.innerText = "Delete Product";
            btn.previousElementSibling.classList.add("pos1");
            btn.classList.add("pos2");
            btn.innerText = actionText2;

            product.querySelectorAll(".card-scroll .e-text").forEach(function (eText) {
                eText.setAttribute("contenteditable", "true");
                eText.classList.add("editable");
            });
        }
        currentBtn = btn;
        currentBtns = btns;
    });

});
}

let xbtns = document.querySelectorAll(".x-btn");

xbtns.forEach(function (xbtn) {
    xbtn.addEventListener("click", function () {
        if (currentBtns === viewBtns) {
            closeProduct(viewBtns);
        } else {
            closeProduct(editBtns);
        }
    });
});


coverScrn.addEventListener("click", function () {
    if (currentBtns === viewBtns) {
        closeProduct(viewBtns);
    } else {
        closeProduct(editBtns);
    }});

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        if (currentBtns === viewBtns) {
            closeProduct(viewBtns);
        } else {
            closeProduct(editBtns);
        }    
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
    if (btns === viewBtns) {
        currentBtn.nextElementSibling.classList.remove("remove");
    } else {
        currentBtn.previousElementSibling.innerText = firstText;
        currentBtn.previousElementSibling.classList.remove("pos1");
        currentBtn.classList.remove("pos2");

        product.querySelectorAll(".card-scroll .e-text").forEach(function (eText) {
            eText.setAttribute("contenteditable", "false");
            eText.classList.remove("editable");

        });
    }
}