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

const xBttns = document.querySelectorAll('.remove');

xBttns.forEach(button => {
  const cItems = getLocalStorage('so-cart');

  button.addEventListener('click', () => {
    const filteredItems = cItems.filter(item => {
      return item.Id !== button.id;
    })
    setLocalStorage('so-cart', filteredItems);
    renderCartContents();
  })
})