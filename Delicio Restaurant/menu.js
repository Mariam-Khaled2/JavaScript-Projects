let cart = JSON.parse(localStorage.getItem('cartData')) || [];

const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const cartCount = document.getElementById('cartCount');

if (cartIcon) {
  cartIcon.addEventListener('click', () => {
    if (cartSidebar) cartSidebar.classList.add('open');
    if (cartOverlay) cartOverlay.classList.add('show');
  });
}

const closeCart = () => {
  if (cartSidebar) cartSidebar.classList.remove('open');
  if (cartOverlay) cartOverlay.classList.remove('show');
};

if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

document.querySelectorAll('.add-to-cart-btn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;

    const title = card.querySelector('h3').innerText;
    const priceText = card.querySelector('.price').innerText;
    const price = parseFloat(priceText.replace('$', ''));

    const existingItem = cart.find((item) => item.title === title);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ title, price, quantity: 1 });
    }

    localStorage.setItem('cartData', JSON.stringify(cart));
    updateCart();
  });
});

function updateCart() {
  localStorage.setItem('cartData', JSON.stringify(cart));

  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = '';
  let total = 0;
  let totalCount = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    totalCount += item.quantity;

    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <div class="cart-item-details">
        <h4>${item.title} (x${item.quantity})</h4>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
      <button class="remove-item" onclick="removeItem(${index})"><i class="fas fa-trash"></i></button>
    `;
    cartItemsContainer.appendChild(itemElement);
  });

  if (cartTotalPrice) cartTotalPrice.innerText = `$${total.toFixed(2)}`;
  if (cartCount) cartCount.innerText = totalCount;
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

const renderCart = updateCart;
updateCart();
