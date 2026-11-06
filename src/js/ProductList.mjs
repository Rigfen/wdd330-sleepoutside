import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/?product=">
    <img src="" alt="Image of ">
    <h2 class="card__brand"></h2>
    <h3 class="card__name"></h3>
    <p class="product-card__price">S</p>
    </a></li>`
}

export default class ProductList {

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }
}