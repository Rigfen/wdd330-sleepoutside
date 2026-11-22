
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("so-cart")) || [];
    this.subtotal = 0;
    this.services = new ExternalServices();
    this.tax = 0;
    this.shipping = 0;
    this.orderTotal = 0;
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
    this.tax = this.subtotal * 0.06;

    // Count all items, including quantities
    const itemCount = this.cart.reduce((total, item) => {
      return total + Number(item.quantity ?? 1);
    }, 0);

    // $10 for the first item and $2 for each additional item
    this.shipping =
      itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;

    this.orderTotal = this.subtotal + this.tax + this.shipping;

    document.querySelector("#tax").textContent =
      `$${this.tax.toFixed(2)}`;

    document.querySelector("#shipping").textContent =
      `$${this.shipping.toFixed(2)}`;

    document.querySelector("#orderTotal").textContent =
      `$${this.orderTotal.toFixed(2)}`;
  }

  // Prepare cart items for the server
  packageItems(items) {
    return items.map((item) => ({
      id: item.Id,
      name: item.Name,
      price: Number(item.FinalPrice),
      quantity: Number(item.quantity ?? 1),
    }));
  }

  // Submit the checkout order
  async checkout(orderPayload) {
    try {
      const result = await this.services.checkout(orderPayload);

      console.log("Checkout successful:", result);

      // Clear the cart after successful checkout
      localStorage.removeItem("so-cart");
      this.cart = [];

      // Redirect to the success page
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
