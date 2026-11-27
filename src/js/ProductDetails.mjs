import { setLocalStorage } from "./utils.mjs";

// returns discount info only when the final price is below the suggested retail price
function getDiscount(product) {
  const retail = Number(product.SuggestedRetailPrice);
  const final = Number(product.FinalPrice);

  if (!retail || !final || retail <= final) {
    return null;
  }

  return {
    retail: retail.toFixed(2),
    percent: Math.round(((retail - final) / retail) * 100),
  };
}
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // get the details for the current product
    this.product = await this.dataSource.findProductById(this.productId);

    // the details are needed before rendering the HTML
    this.renderProductDetails();

    // once the HTML is rendered, add a listener to the Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const savedCart = JSON.parse(localStorage.getItem("so-cart"));

    let cart = [];
    if (Array.isArray(savedCart)) {
      cart = savedCart;
    } else if (savedCart) {
      cart = [savedCart];
    }

    cart.push(this.product);
    setLocalStorage("so-cart", cart);
  }

  renderProductDetails() {
    const product = this.product;
    const discount = getDiscount(product);

    // update the browser tab title for this product
    document.title = `Sleep Outside | ${product.Name}`;

    // build the product HTML and put it inside the product-detail section
    document.querySelector(".product-detail").innerHTML = `
      <h3>${product.Brand.Name}</h3>

      <h2 class="divider">${product.NameWithoutBrand}</h2>

      <div class="product-image-wrapper">
        <img
          class="divider"
          src="${product.Image}"
          alt="${product.Name}"
        />
        ${
          discount
            ? `<span class="discount-badge">${discount.percent}% OFF</span>`
            : ""
        }
      </div>

      <p class="product-card__price">
        ${
          discount
            ? `<span class="product__original-price">$${discount.retail}</span>
               <strong class="product__final-price">$${product.FinalPrice}</strong>`
            : `$${product.FinalPrice}`
        }
      </p>

      <p class="product__color">${product.Colors[0].ColorName}</p>

      <p class="product__description">${product.DescriptionHtmlSimple}</p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
    `;
  }
}