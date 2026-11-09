import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { qs } from "./utils.mjs";

const dataSource = new ProductData("tents");
const listElement = qs(".product-list");
const myList = new ProductList("tents", dataSource, listElement);
myList.init();