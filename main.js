let header = document.querySelector("header")
let row = document.querySelector("div.row");
let counterBadg = document.querySelector("div.shop-basket span");
let modal = document.querySelector("div.modal-massage");
let closeBtn = document.querySelector("button.close-btn");
let openBtn = document.querySelector("div.shop-basket i");
let sidebar = document.querySelector("aside");
let total = document.querySelector("div.total-price");
let totalPrice = document.querySelector("span.total span");
let productTemplate = "";
let template = "";
let productsContainer = document.querySelector("div.products");
let addedToBasket = [];
let selectedProducts = [];
let removeButtons = [];
let x = 0;
let timer;
let conatiner = []

function setProducts() {
    products.forEach((element) => {
        productTemplate +=
            `<div class="card col-xs-12 col-sm-6 col-lg-3 distance distance-between-row " id="${element.id}">
                <figure>
                    <img src="${element.imgURL}" class="img-fluid">
                </figure>
                <div class="des">
                    <p>${element.productName}
                    </p>
                </div>
                <div class="price text-end">
                    <span class="lead">${element.price} تومان</span>
                </div>
                <div class="sale-info-btn text-center">
                    <button class="btn d-inline-block sale">افزودن به سبد خرید</button>
                    <button class="btn d-inline-block information">مشاهده مشخصات</button>
                </div>
    </div>`
    });
    row.innerHTML = productTemplate;
}
setProducts();
let addButtons = document.querySelectorAll("button.sale");


function countProducts() {
    let productId = this.parentNode.parentNode.getAttribute("id");
    let productSpecifications = products.find((element) => {
        return productId == element.id;
    })
    addedToBasket.push(productSpecifications);
    counterBadg.textContent = addedToBasket.length;
    modal.classList.add("active-modal");
    clearTimeout(timer);
    timer = setTimeout(function() {
        modal.classList.remove("active-modal");

    }, 2000)

}

function addToBasket() {
    selectedProducts = [];
    addedToBasket.forEach((element) => {
        template = `
        <div class="item" id="${element.id}">
                <img src="${element.imgURL}">
                <div class="content">
                    <div class="description">
                        <p>${element.productName}</p>
                    </div>
                    <div class="button">
                        <button class="remove">انصراف</button>
                    </div>
                </div>
            </div>
            `
        selectedProducts.push(template);
    });
    productsContainer.innerHTML = "";
    for (let product of selectedProducts) {
        productsContainer.innerHTML += product;
    }
    removeButtons = [...document.querySelectorAll("button.remove")];
    for (let button of removeButtons) {
        button.addEventListener("click", removeItem);
    }
    x = 0;
    for (let item of addedToBasket) {
        x += Number(item.price);
    }
    totalPrice.textContent = x.toLocaleString("fa-IR");
}


function open() {
    sidebar.classList.add("active-sidebar");
    total.classList.add("active-sidebar");
}

function close() {
    sidebar.classList.remove("active-sidebar");
    total.classList.remove("active-sidebar");
}

function removeItem() {
    for (let i = 0; i < selectedProducts.length; i++) {
        if (selectedProducts[i].trim() == this.closest("div.item").outerHTML.trim()) {
            selectedProducts.splice(i, 1);
            x -= Number(addedToBasket[i].price);
            totalPrice.textContent = x.toLocaleString("fa-IR");;
            addedToBasket.splice(i, 1);
            break;
        }
    }
    productsContainer.innerHTML = "";
    for (let product of selectedProducts) {
        productsContainer.innerHTML += product;
    }
    removeButtons = [...document.querySelectorAll("button.remove")];
    for (let button of removeButtons) {
        button.addEventListener("click", removeItem);
    }
    counterBadg.textContent = addedToBasket.length;
}

function hideHeader() {
    conatiner.push(window.scrollY);
    if (window.scrollY > 100) {
        header.classList.add("shrink");
        header.classList.remove("expanded");
    }
    if (window.scrollY < conatiner[conatiner.length - 2]) {
        header.classList.remove("shrink");
        header.classList.add("expanded");
    }
    if (conatiner.length > 105) {
        conatiner.splice(0, 100);
    }
    console.log(conatiner)
}


for (let button of addButtons) {
    button.addEventListener("click", countProducts);
    button.addEventListener("click", addToBasket)
}
openBtn.addEventListener("click", open);
closeBtn.addEventListener("click", close);
window.addEventListener("scroll", hideHeader)