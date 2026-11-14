import ShoppingCart from "./ShoppingCart.mjs";
import { updateCartCount, loadHeaderFooter } from "./utils.mjs";

await loadHeaderFooter();

const cartElement = document.querySelector(".product-list");

const shoppingCart = new ShoppingCart(cartElement);

shoppingCart.init();

updateCartCount();

