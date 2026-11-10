import { setLocalStorage, updateCartCount } from "./utils.mjs";

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
            .getElementById('addToCart')
            .addEventListener('click', this.addToCartHandler.bind(this));
    }

    addProductToCart(product) {
        const savedCart = JSON.parse(localStorage.getItem("so-cart"));

        let cart = [];
        if (Array.isArray(savedCart)) {
            cart = savedCart;
        } else if (savedCart) {
            cart = [savedCart];
        }

        cart.push(product);
        setLocalStorage("so-cart", cart);
        updateCartCount();
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
    document.querySelector('h2').textContent = product.Brand.Name;
    document.querySelector('h3').textContent = product.Name;

    const productImage = document.getElementById('productImage');
    productImage.src = product.Image;
    productImage.alt = product.Name;

    document.getElementById('productPrice').textContent = product.FinalPrice;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;
}