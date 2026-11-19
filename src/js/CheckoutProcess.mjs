import { getLocalStorage, formDataToJSON } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key) || [];
        this.calculateItemSubTotal();

        document.querySelector("#zip").addEventListener("blur", () => {
            this.calculateOrderTotal();
        });
    }

    calculateItemSubTotal() {
        // calculate and display the total dollar amount of the items in the cart, and the number of items.
        this.itemTotal = 0;

        this.list.forEach((item) => {
            this.itemTotal += Number(item.FinalPrice);
        });

        document.querySelector("#numberItems").innerText = this.list.length;
        document.querySelector("#cartTotal").innerText = `$${this.itemTotal.toFixed(2)}`;
    }

    calculateOrderTotal() {
        // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total

        this.tax = this.itemTotal * 0.06;

        this.shipping = 10 + (this.list.length - 1) * 2;

        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        // display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        const shipping = document.querySelector(`${this.outputSelector} #shipping`);
        const total = document.querySelector(`${this.outputSelector} #total`);

        tax.innerText = `$${this.tax.toFixed(2)}`;
        shipping.innerText = `$${this.shipping.toFixed(2)}`;
        total.innerText = `$${this.orderTotal.toFixed(2)}`;
    }

    packageItems(items) {
        return items.map((item) => {
            return {
                id: item.Id,
                name: item.Name,
                price: Number(item.FinalPrice),
                quantity: 1
            };
        });
    };

    async checkout(form) {
        // Get the form data and convert it to a JSON object
        const order = formDataToJSON(form);

        // Add the order information
        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal.toFixed(2);
        order.tax = this.tax.toFixed(2);
        order.shipping = this.shipping;
        order.items = this.packageItems(this.list);

        // Match the property names expected by the server
        order.street = order.address;
        delete order.address;

        order.expiration = order.exp;
        delete order.exp;

        order.code = order.cvv;
        delete order.cvv;

        // Send the order to the server
        const externalServices = new ExternalServices();
        const response = await externalServices.checkout(order);

        return response;
    }
}