const emailInput = document.getElementById("emailInput");
const subscribeBtn = document.getElementById("subscribeBtn");
const successPopup = document.getElementById("successPopup");
const closePopup = document.getElementById("closePopup");


subscribeBtn.addEventListener("click", function () {

    const email = emailInput.value.trim();

    if (email === "") {
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        return;
    }

    successPopup.style.display = "flex";

});


closePopup.addEventListener("click", function () {

    successPopup.style.display = "none";

});
const searchToggle = document.getElementById("search-toggle");
const searchPanel = document.getElementById("search-panel");
const productSearch = document.getElementById("product-search");
const featuredProducts = document.querySelectorAll(".product-card");

searchToggle.addEventListener("click", event => {
    event.preventDefault();
    searchPanel.hidden = !searchPanel.hidden;
    if (!searchPanel.hidden) productSearch.focus();
});

productSearch.addEventListener("input", () => {
    const searchText = productSearch.value.trim().toLowerCase();
    featuredProducts.forEach(product => {
        const name = product.querySelector("h3").textContent.toLowerCase();
        product.style.display = name.includes(searchText) ? "" : "none";
    });
});

const favoriteIcons = document.querySelectorAll(".product-heart");
const favoriteCount = document.getElementById("favorite-count");
let favorites;

try {
    favorites = JSON.parse(localStorage.getItem("favorites")) || [];
} catch (error) {
    favorites = [];
}

function getProductId(product) {
    return product.querySelector("h3").textContent.trim().toLowerCase()
        .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function updateFavoriteCount() {
    favoriteCount.textContent = favorites.length;
}

favoriteIcons.forEach(icon => {
    const id = getProductId(icon.closest(".product-card"));
    const isFavorite = favorites.includes(id);
    icon.classList.toggle("fa-solid", isFavorite);
    icon.classList.toggle("fa-regular", !isFavorite);
    icon.classList.add("favorite-clickable");

    icon.addEventListener("click", () => {
        if (favorites.includes(id)) favorites = favorites.filter(item => item !== id);
        else favorites.push(id);
        const nowFavorite = favorites.includes(id);
        icon.classList.toggle("fa-solid", nowFavorite);
        icon.classList.toggle("fa-regular", !nowFavorite);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        updateFavoriteCount();
    });
});

const cartToggle = document.getElementById("cart-toggle");
const cartCount = document.getElementById("cart-count");
const cartButtons = document.querySelectorAll(".product-card button");
let cart;

try {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
} catch (error) {
    cart = [];
}

const cartPanel = document.createElement("aside");
cartPanel.className = "cart-panel";
cartPanel.hidden = true;
document.body.appendChild(cartPanel);

function updateCartCount() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function renderCart() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartPanel.innerHTML = `
        <div class="cart-panel-header"><h2>Your Cart</h2>
            <button class="cart-close" aria-label="Close cart">&times;</button>
        </div>
        <div class="cart-items">${cart.length === 0 ? "<p>Your cart is empty.</p>" : cart.map(item => `
            <div class="cart-item"><span>${item.name} &times; ${item.quantity}</span>
                <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                <button class="remove-cart-item" data-product="${item.name}">Remove</button>
            </div>`).join("")}</div>
        <div class="cart-total">Total: $${total.toFixed(2)}</div>`;
    cartPanel.querySelector(".cart-close").addEventListener("click", () => {
        cartPanel.hidden = true;
    });
}

cartPanel.addEventListener("click", event => {
    const removeButton = event.target.closest(".remove-cart-item");
    if (!removeButton) return;
    cart = cart.filter(item => item.name !== removeButton.dataset.product);
    saveCart();
    renderCart();
});

cartButtons.forEach(button => {
    button.addEventListener("click", () => {
        const product = button.closest(".product-card");
        const name = product.querySelector("h3").textContent.trim();
        const price = Number(product.querySelector(".price").textContent.replace("$", ""));
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) existingItem.quantity += 1;
        else cart.push({ name, price, quantity: 1 });
        saveCart();
        renderCart();
    });
});

cartToggle.addEventListener("click", event => {
    event.preventDefault();
    renderCart();
    cartPanel.hidden = !cartPanel.hidden;
});

updateFavoriteCount();
updateCartCount();


