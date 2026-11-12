import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  if (cartItems.length > 0) {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.FinalPrice;
    });
    document.querySelector(".cart-total").textContent =
      `Total: $${total.toFixed(2)}`;
    document.querySelector(".cart-footer").classList.remove("hide");
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
  <span id='${item.Id}' class='remove'>X</span>
  </li>`;

  return newItem;
}

renderCartContents();

document.querySelector(".product-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const cItems = getLocalStorage("so-cart") || [];

    const filteredItems = cItems.filter((item) => item.Id !== e.target.id);

    setLocalStorage("so-cart", filteredItems);
    renderCartContents();
  }
});
