import { setLocalStorage, getLocalStorage, updateCartCount, alertMessage } from "./utils.mjs";

export default class ProductDetails {

    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document
            .getElementById("add-to-cart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
        updateCartCount();

        alertMessage("Product added to cart!");
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }

    // add to cart button event handler
    addToCartHandler(e) {
        this.addProductToCart(this.product);
    }
}

function productDetailsTemplate(product) {
    document.querySelector("#p-category").textContent = product.Category ?? "Product";
    document.querySelector("#p-brand").textContent = product.Brand.Name;
    document.querySelector("#p-name").textContent = product.NameWithoutBrand;

    const productImage = document.querySelector("#p-image");
    productImage.src = product.Images.PrimaryExtraLarge;
    productImage.alt = product.NameWithoutBrand;
    const euroPrice = new Intl.NumberFormat('de-DE',
        {
            style: 'currency', currency: 'EUR',
        }).format(Number(product.FinalPrice) * 0.85);
    document.querySelector("#p-price").textContent = `${euroPrice}`;
    document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
    document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

    document.querySelector("#add-to-cart").dataset.id = product.Id;
}