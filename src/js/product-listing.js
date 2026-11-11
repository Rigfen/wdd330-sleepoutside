import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";


const category = getParam("category") || "tents"; // default to "tents" if no category is provided
const categoryNames = {
  tents: "Tents",
  hammocks: "Hammocks",
  sleeping_bags: "Sleeping Bags",
  backpacks: "Backpacks",
};


// first create an instance of the ProductData class.
const dataSource = new ProductData();
// then get the element you want the product list to render in
const listElement = document.querySelector(".product-list");
// then create an instance of the ProductList class and send it the correct information.
const myList = new ProductList(category, dataSource, listElement);
// finally call the init method to show the products
myList.init();
