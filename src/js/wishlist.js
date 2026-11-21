import {
    getLocalStorage,
    setLocalStorage,
    loadHeaderFooter,
} from "./utils.mjs";

// Retrieve saved wish list products
function getWishlist() {
    const savedWishlist = getLocalStorage("so-wishlist");
    return Array.isArray(savedWishlist) ? savedWishlist : [];
}

// Retrieve cart products
function getCart() {
    const savedCart = getLocalStorage("so-cart");

    if (Array.isArray(savedCart)) {
        return savedCart;
    }

    return savedCart ? [savedCart] : [];
}

// Create HTML for each wish list product
function wishlistItemTemplate(item) {
    const image = item.Images?.PrimaryMedium || item.Image;
    const productURL = `../product_pages/index.html?product=${encodeURIComponent(item.Id)}`;
    const color = item.Colors?.[0]?.ColorName || "Color not specified";

    return `
    <li class="cart-card divider">
      <a href="${productURL}" class="cart-card__image">
        <img src="${image}" alt="${item.Name}" />
      </a>

      <a href="${productURL}">
        <h2 class="card__name">${item.Name}</h2>
      </a>

      <p class="cart-card__color">${color}</p>

      <p class="cart-card__price">
        $${Number(item.FinalPrice).toFixed(2)}
      </p>

      <div class="wishlist-actions">
        <button
          type="button"
          class="move-to-cart"
          data-id="${item.Id}"
        >
          Move to Cart
        </button>

        <button
          type="button"
          class="remove-wishlist"
          data-id="${item.Id}"
        >
          Remove
        </button>
      </div>
    </li>
  `;
}

// Display wish list products
function renderWishlist() {
    const wishlist = getWishlist();

    const wishlistItems = document.querySelector("#wishlist-items");
    const emptyMessage = document.querySelector("#wishlist-empty");

    wishlistItems.innerHTML = wishlist
        .map((item) => wishlistItemTemplate(item))
        .join("");

    emptyMessage.classList.toggle("hide", wishlist.length !== 0);
}

// Remove a product from the wish list
function removeFromWishlist(productId) {
    const wishlist = getWishlist();

    const updatedWishlist = wishlist.filter(
        (item) => String(item.Id) !== String(productId)
    );

    setLocalStorage("so-wishlist", updatedWishlist);

    renderWishlist();
}

// Move a product from the wish list into the cart
function moveToCart(productId) {
    const wishlist = getWishlist();

    const product = wishlist.find(
        (item) => String(item.Id) === String(productId)
    );

    if (!product) {
        return;
    }

    const cart = getCart();

    const existingItem = cart.find(
        (item) => String(item.Id) === String(productId)
    );

    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cart.push({
            ...product,
            quantity: 1,
        });
    }

    setLocalStorage("so-cart", cart);

    // Remove the product from the wish list after moving it
    removeFromWishlist(productId);
}

// Handle button clicks
document
    .querySelector("#wishlist-items")
    .addEventListener("click", (event) => {
        const removeButton = event.target.closest(".remove-wishlist");
        const moveButton = event.target.closest(".move-to-cart");

        if (removeButton) {
            removeFromWishlist(removeButton.dataset.id);
        }

        if (moveButton) {
            moveToCart(moveButton.dataset.id);
        }
    });

// Initialize the page
renderWishlist();

loadHeaderFooter().catch(console.error);
