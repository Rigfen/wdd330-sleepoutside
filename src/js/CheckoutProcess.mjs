
import ExternalServices from "./ExternalServices.mjs";

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

  

async checkout(orderPayload) {
  try {
    const result = await this.services.checkout(orderPayload);

    console.log("Checkout successful:", result);

    // Only clear the cart after the server accepts the order
    localStorage.removeItem("so-cart");
    this.cart = [];

    // Take the customer to the success page
    window.location.href = "/checkout/success.html";

    return result;
  } catch (err) {
    console.error("Checkout failed:", err);

    const details = err.message;

    alert(
      typeof details === "string"
        ? details
        : JSON.stringify(details)
    );

    return null;
  }
}

}
