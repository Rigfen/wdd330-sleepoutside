import { getLocalStorage, setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

function addProductToCart(product) {
  const cart = getLocalStorage('so-cart') || [];
  cart.push(product);
  setLocalStorage('so-cart', cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const button = e.target.closest('#addToCart');
  const product = await dataSource.findProductById(button.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
