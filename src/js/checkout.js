import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter().catch(console.error);

// Create checkout process
const myCheckout = new CheckoutProcess();

// Calculate subtotal when page loads
myCheckout.calculateSubtotal();

// Calculate totals after user enters zip code
document.querySelector("#zip").addEventListener("change", () => {
  myCheckout.calculateOrderTotal();
});

// Prevent form from submitting for now
document.querySelector("#checkoutForm").addEventListener("submit", (event) => {
  event.preventDefault();

  if (event.currentTarget.checkValidity()) {
    alert("Checkout form validated!");
  }
});
