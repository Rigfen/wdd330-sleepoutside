
import ExternalServices from "./ExternalServices.mjs";
import { alertMessage, removeAlerts, setLocalStorage } from "./utils.mjs";
export default class CheckoutProcess {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("so-cart")) || [];
    this.subtotal = 0;
    this.services = new ExternalServices();
  }

  // Calculate and display the subtotal
  calculateSubtotal() {
    this.subtotal = this.cart.reduce((total, item) => {
      const price = Number(item.FinalPrice) || 0;
      const quantity = Number(item.quantity ?? 1);

      return total + price * quantity;
    }, 0);

    document.querySelector("#subtotal").textContent =
      `$${this.subtotal.toFixed(2)}`;
  }

  // Calculate tax, shipping, and order total
  calculateOrderTotal() {
    const tax = this.subtotal * 0.06;
    const shipping = this.subtotal > 0 ? 10 : 0;
    const orderTotal = this.subtotal + tax + shipping;

    document.querySelector("#tax").textContent =
      `$${tax.toFixed(2)}`;

    document.querySelector("#shipping").textContent =
      `$${shipping.toFixed(2)}`;

    document.querySelector("#orderTotal").textContent =
      `$${orderTotal.toFixed(2)}`;
  }

  

async checkout(payload) {

  try {
    await this.services.checkout(payload);
    setLocalStorage("so-cart", []);
    window.location.assign("/checkout/success.html");
  } catch (error) {
    removeAlerts();
    const errMessage = error.message && typeof error.message === "object" ? Object.values(error.message) : [error.message || "Unable to place your order."];
    errMessage.forEach((message) => alertMessage(message));
  }

  }
}
