import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData();

// Get the product ID from the URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("product");

// Create a unique storage key for each product
const commentsKey = `product-comments-${productId}`;

// Get comments saved for this product
function getComments() {
  try {
    return JSON.parse(localStorage.getItem(commentsKey)) || [];
  } catch (error) {
    console.error("Could not load comments:", error);
    return [];
  }
}

// Display all comments for this product
function renderComments() {
  const commentsList = document.querySelector("#comments-list");
  const comments = getComments();

  commentsList.innerHTML = "";

  if (comments.length === 0) {
    commentsList.innerHTML = "<p>No comments yet. Be the first to comment!</p>";
    return;
  }

  comments.forEach((comment) => {
    const commentCard = document.createElement("article");
    commentCard.classList.add("comment-card");

    const name = document.createElement("h3");
    name.textContent = comment.name;

    const text = document.createElement("p");
    text.textContent = comment.text;

    const date = document.createElement("small");
    date.textContent = new Date(comment.date).toLocaleString();

    commentCard.append(name, text, date);
    commentsList.appendChild(commentCard);
  });
}

// Save a new comment
function addComment(event) {
  event.preventDefault();

  const nameInput = document.querySelector("#comment-name");
  const commentInput = document.querySelector("#comment-text");

  const name = nameInput.value.trim();
  const text = commentInput.value.trim();

  if (!name || !text) {
    return;
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

// Run the function
renderProductDetails();
