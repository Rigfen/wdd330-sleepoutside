import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  let total = 0;

  cartItems.forEach((item) => {
    total += Number(item.FinalPrice);
  });

  document.querySelector(".cart-total").textContent =
    `Total: $${total.toFixed(2)}`;

  document.querySelector(".cart-footer").classList.toggle(
    "hide",
    cartItems.length === 0
  );

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  // Support API products and older products already saved in the cart.
  const image = item.Images?.PrimaryMedium || item.Image;
  const productURL = `../product_pages/index.html?product=${item.Id}`;

  return `<li class="cart-card divider">
    <a href="${productURL}" class="cart-card__image">
      <img
        src="${image}"
        alt="${item.Name}"
      />
    </a>

    <a href="${productURL}">
      <h2 class="card__name">${item.Name}</h2>
    </a>

    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${Number(item.FinalPrice).toFixed(2)}</p>

    <button
      type="button"
      data-id="${item.Id}"
      class="remove"
      aria-label="Remove product"
    >X</button>
  </li>`;
}

renderCartContents();

document.querySelector(".product-list").addEventListener("click", (event) => {
  const removeButton = event.target.closest(".remove");

  if (!removeButton) {
    return;
  }

  const cartItems = getLocalStorage("so-cart") || [];

  const filteredItems = cartItems.filter(
    (item) => item.Id !== removeButton.dataset.id
  );

  setLocalStorage("so-cart", filteredItems);
  renderCartContents();
});

loadHeaderFooter().catch(console.error);