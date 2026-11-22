
import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter().catch(console.error);

// Create checkout process
const myCheckout = new CheckoutProcess();

// Calculate totals when the page loads
myCheckout.calculateSubtotal();
myCheckout.calculateOrderTotal();

// Recalculate totals when the ZIP code changes
document.querySelector("#zip").addEventListener("change", () => {
  myCheckout.calculateOrderTotal();
});

// Handle checkout form submission
document
  .querySelector("#checkoutForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const myForm = event.currentTarget;

    // Check form validation
    if (!myForm.checkValidity()) {
      myForm.reportValidity();
      return;
    }

    // Collect information from the form
    const formData = new FormData(myForm);

    // Prepare the order information for the server
    const orderPayload = {
      orderDate: new Date().toISOString(),
      fname: formData.get("fname"),
      lname: formData.get("lname"),
      street: formData.get("street"),
      city: formData.get("city"),
      state: formData.get("state"),
      zip: formData.get("zip"),
      cardNumber: formData.get("cardNumber"),
      expiration: formData.get("expiration"),
      code: formData.get("securityCode"),

      // Package cart items for the server
      items: myCheckout.packageItems(myCheckout.cart),

      // Include order calculations
      orderTotal: myCheckout.orderTotal,
      shipping: myCheckout.shipping,
      tax: myCheckout.tax,
    };

    // Submit the order
    await myCheckout.checkout(orderPayload);
  });
