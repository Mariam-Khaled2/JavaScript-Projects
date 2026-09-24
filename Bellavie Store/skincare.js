const filterButtons = document.querySelectorAll(".skincare-categories a");
const products = document.querySelectorAll(".skincare-product");
const searchToggle = document.getElementById("search-toggle");
const searchPanel = document.getElementById("search-panel");
const productSearch = document.getElementById("product-search");

filterButtons.forEach(button => {

    button.addEventListener("click", function(e) {

        e.preventDefault();

        const filter = this.dataset.filter;
        productSearch.value = "";

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        products.forEach(product => {

            if (
                filter === "all" ||
                product.dataset.category === filter
            ) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }

        });

    });

});

searchToggle.addEventListener("click", event => {
    event.preventDefault();
    searchPanel.hidden = !searchPanel.hidden;

    if (!searchPanel.hidden) {
        productSearch.focus();
    }
});

productSearch.addEventListener("input", () => {
    const searchText = productSearch.value.trim().toLowerCase();

    filterButtons.forEach(button => button.classList.remove("active"));
    filterButtons[0].classList.add("active");

    products.forEach(product => {
        const productName = product.querySelector("h3").textContent.toLowerCase();
        product.style.display = productName.includes(searchText) ? "" : "none";
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

function updateFavoriteCount() {
    favoriteCount.textContent = favorites.length;
}

favoriteIcons.forEach(icon => {

    const productId = icon.dataset.product;

    if (favorites.includes(productId)) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
        icon.setAttribute("aria-pressed", "true");
    } else {
        icon.setAttribute("aria-pressed", "false");
    }

    icon.addEventListener("click", function () {

        if (favorites.includes(productId)) {

            favorites = favorites.filter(id => id !== productId);

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");
            icon.setAttribute("aria-pressed", "false");

        } else {

            favorites.push(productId);

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");
            icon.setAttribute("aria-pressed", "true");
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
        updateFavoriteCount();
    });
});

updateFavoriteCount();


const cartToggle = document.getElementById("cart-toggle");
const cartCount = document.getElementById("cart-count");
const cartButtons = document.querySelectorAll(".skincare-product button");

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
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = itemCount;
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function renderCart() {
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    cartPanel.innerHTML = `
        <div class="cart-panel-header">
            <h2>Your Cart</h2>
            <button class="cart-close" aria-label="Close cart">&times;</button>
        </div>
        <div class="cart-items">
            ${cart.length === 0
                ? "<p>Your cart is empty.</p>"
                : cart.map(item => `
                    <div class="cart-item">
                        <span>${item.name} × ${item.quantity}</span>
                        <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                        <button class="remove-cart-item" data-product="${item.name}">
                            Remove
                        </button>
                    </div>
                `).join("")}
        </div>
        <div class="cart-total">Total: $${total.toFixed(2)}</div>
    `;

    cartPanel.querySelector(".cart-close").addEventListener("click", () => {
        cartPanel.hidden = true;
    });
}

cartPanel.addEventListener("click", event => {
    const removeButton = event.target.closest(".remove-cart-item");

    if (!removeButton) {
        return;
    }

    const productName = removeButton.dataset.product;
    cart = cart.filter(item => item.name !== productName);
    saveCart();
    renderCart();
});

cartButtons.forEach(button => {
    button.addEventListener("click", () => {
        const product = button.closest(".skincare-product");
        const name = product.querySelector("h3").textContent.trim();
        const price = Number(
            product.querySelector(".product-price").textContent.replace("$", "")
        );
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        saveCart();
        renderCart();
    });
});

cartToggle.addEventListener("click", event => {
    event.preventDefault();
    renderCart();
    cartPanel.hidden = !cartPanel.hidden;
});

updateCartCount();
