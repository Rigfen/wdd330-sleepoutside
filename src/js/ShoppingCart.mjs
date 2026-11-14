import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

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
</li>`;

    return newItem;
}

export default class ShoppingCart {
    constructor(element) {
        this.element = element;
    }

    init() {
        const cartItems = getLocalStorage("so-cart") || [];
        this.renderCartContents(cartItems);
    }

    renderCartContents(cartItems) {
        renderListWithTemplate(
            cartItemTemplate,
            this.element,
            cartItems
        );

        if (cartItems.length > 0) {
            let total = 0;

            cartItems.forEach((item) => {
                total += item.FinalPrice;
            });

            document.querySelector(".cart-total").textContent =
                `Total: $${total.toFixed(2)}`;

            document.querySelector(".cart-footer").classList.remove("hide");
        }
    }
}