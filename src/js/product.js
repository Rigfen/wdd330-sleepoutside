import { setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

async function init() {
  const product = await dataSource.findProductById(productId);

  console.log(product);

  if (!product) {
    console.error("Product not found:", productId);
    return;
  }

  // These selectors must match your product page's HTML.
  document.querySelector(".product-detail h3").textContent = product.Brand.Name;

  document.querySelector(".product-detail h2").textContent =
    product.NameWithoutBrand;

  const image = document.querySelector(".product-detail img");
  image.src = product.Images.PrimaryLarge;
  image.alt = product.Name;

  document.querySelector(".product-card__price").textContent =
    `$${product.FinalPrice.toFixed(2)}`;

  document.querySelector(".product__color").textContent =
    product.Colors[0].ColorName;

  document.querySelector(".product__description").innerHTML =
    product.DescriptionHtmlSimple;

  document.getElementById("addToCart").addEventListener("click", () => {
    addProductToCart(product);
  });
}

function addProductToCart(product) {
  const savedCart = JSON.parse(localStorage.getItem("so-cart"));

  let cart = [];

  if (Array.isArray(savedCart)) {
    cart = savedCart;
  } else if (savedCart) {
    cart = [savedCart];
  }

  const comments = getComments();

  const newComment = {
    name: name,
    text: text,
    date: new Date().toISOString(),
  };

  comments.push(newComment);

  localStorage.setItem(commentsKey, JSON.stringify(comments));

  // Clear the form and display the updated comments
  document.querySelector("#comment-form").reset();
  renderComments();
}

// Display the selected product
async function renderProductDetails() {
  const productSection = document.querySelector(".product-detail");

  if (!productId) {
    productSection.innerHTML = "<p>No product was selected.</p>";
    return;
  }

  try {
    const product = await dataSource.findProductById(productId);

    if (!product) {
      productSection.innerHTML = "<p>Sorry, product not found.</p>";
      return;
    }

    document.title = `Sleep Outside | ${product.Name}`;

    // Display product information
    document.querySelector("#product-brand").textContent = product.Brand.Name;

    document.querySelector("#product-name").textContent =
      product.NameWithoutBrand;

    const image = document.querySelector("#product-image");
    image.src = product.Images.PrimaryLarge;
    image.alt = product.Name;

    document.querySelector("#product-price").textContent =
      `$${product.FinalPrice}`;

    document.querySelector("#product-color").textContent =
      product.Colors[0].ColorName;

    document.querySelector("#product-description").innerHTML =
      product.DescriptionHtmlSimple;

    // Add product to cart
    document.querySelector("#addToCart").addEventListener("click", () => {
      const savedCart = JSON.parse(localStorage.getItem("so-cart"));

      const cart = Array.isArray(savedCart)
        ? savedCart
        : savedCart
          ? [savedCart]
          : [];

      cart.push(product);

      setLocalStorage("so-cart", cart);
    });

    // Display comments for this product
    renderComments();

    // Listen for new comments
    document
      .querySelector("#comment-form")
      .addEventListener("submit", addComment);
  } catch (error) {
    console.error("Error loading product:", error);
    productSection.innerHTML =
      "<p>Sorry, we could not load this product. Please try again.</p>";
  }
}

init();
