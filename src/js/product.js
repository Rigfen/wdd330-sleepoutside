import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Get the product ID from the URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("product");

// Display the selected product
async function renderProductDetails() {
  const product = await dataSource.findProductById(productId);

  if (!product) {
    document.querySelector(".product-detail").innerHTML =
      "<p>Sorry, product not found.</p>";
    return;
  }

  // Display product information
  document.querySelector("#product-brand").textContent =
    product.Brand.Name;

  document.querySelector("#product-name").textContent =
    product.NameWithoutBrand;

  const image = document.querySelector("#product-image");
  image.src = product.Image;
  image.alt = product.Name;

  document.querySelector("#product-price").textContent =
    `$${product.FinalPrice}`;

  document.querySelector("#product-color").textContent =
    product.Colors[0].ColorName;

  document.querySelector("#product-description").innerHTML =
    product.DescriptionHtmlSimple;

  // Add product to cart
  document
    .querySelector("#addToCart")
    .addEventListener("click", () => {
      const savedCart = JSON.parse(localStorage.getItem("so-cart"));

      const cart = Array.isArray(savedCart)
        ? savedCart
        : savedCart
          ? [savedCart]
          : [];

      cart.push(product);

      setLocalStorage("so-cart", cart);
    });
}

// Run the function
renderProductDetails();
