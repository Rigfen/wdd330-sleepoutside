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
    const colorOptions = document.querySelector("#color-options");

    colorOptions.innerHTML = "";
    
    product.SelectedColor = product.Colors[0];
    product.Colors.forEach((color) => {
        const colorImage = document.createElement("img");
        if (color === product.SelectedColor) {
            colorImage.classList.add("selected");
        }

        colorImage.src = color.ColorChipImageSrc;
        colorImage.alt = color.ColorName;
        colorImage.title = color.ColorName;

        colorImage.addEventListener("click", () => {
            colorOptions.querySelectorAll("img").forEach((image) => {
                image.classList.remove("selected");
            });

            product.SelectedColor = color;
            colorImage.classList.add('selected');

            document.querySelector("#p-color").textContent = color.ColorName;
            document.querySelector("#p-image").src = color.ColorPreviewImageSrc;
        });

        colorOptions.appendChild(colorImage);
    });

    document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

    document.querySelector("#add-to-cart").dataset.id = product.Id;
}