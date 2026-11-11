import { setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

async function init() {
  const product = await dataSource.findProductById(productId);

  console.log(product);

  if (!product) {
    console.error("Product not found:", productId);
    return;
  }

  // These selectors must match your product page's HTML.
  document.querySelector(".product-detail h3").textContent = product.Brand.Name;

  document.querySelector(".product-detail h2").textContent =
    product.NameWithoutBrand;

  const image = document.querySelector(".product-detail img");
  image.src = product.Images.PrimaryLarge;
  image.alt = product.Name;

  document.querySelector(".product-card__price").textContent =
    `$${product.FinalPrice.toFixed(2)}`;

  document.querySelector(".product__color").textContent =
    product.Colors[0].ColorName;

  document.querySelector(".product__description").innerHTML =
    product.DescriptionHtmlSimple;

  document.getElementById("addToCart").addEventListener("click", () => {
    addProductToCart(product);
  });
}

function addProductToCart(product) {
  const savedCart = JSON.parse(localStorage.getItem("so-cart"));

  let cart = [];

  if (Array.isArray(savedCart)) {
    cart = savedCart;
  } else if (savedCart) {
    cart = [savedCart];
  }

  cart.push(product);
  setLocalStorage("so-cart", cart);
}

init();
