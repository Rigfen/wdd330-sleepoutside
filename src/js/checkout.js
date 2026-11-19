import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

await loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".checkout-summary");

checkout.init();

document.forms.checkout.addEventListener("submit", async (event) => {
    event.preventDefault();
    const response = await checkout.checkout(event.target);

    console.log(response);
});