import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('product')

const dataSource = new ProductData("tents");

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
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
