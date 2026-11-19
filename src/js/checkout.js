import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter().catch(console.error);

// Create checkout process
const myCheckout = new CheckoutProcess();

// Calculate subtotal when page loads
myCheckout.calculateSubtotal();
myCheckout.calculateOrderTotal();

// Calculate totals after user enters zip code
document.querySelector("#zip").addEventListener("change", () => {
  myCheckout.calculateOrderTotal();
});

// Prevent form from submitting for now

document
  .querySelector("#checkoutForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const myForm = event.currentTarget;

    if (!myForm.checkValidity()) {
      myForm.reportValidity();
      return;
    }

    // Collect information from the checkout form
    const formData = new FormData(myForm);

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
      securityCode: formData.get("securityCode"),
      order: myCheckout.cart.map((item) => ({
        id: item.Id,
        name: item.Name,
        price: item.FinalPrice,
        quantity: item.quantity ?? 1,
      })),
    };

    // Send the order to the checkout process
    await myCheckout.checkout(orderPayload);
  });
