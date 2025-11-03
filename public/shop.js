let cart = JSON.parse(localStorage.getItem('cart')) || [];

const productsContainer = document.getElementById('products');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const totalPriceEl = document.getElementById('totalPrice');
const cartCount = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');
const closeModal = document.querySelector('.close');
const viewCartBtn = document.getElementById('viewCartBtn');

// --- Load products ---
async function loadProducts() {
  try {
    const res = await fetch('/api/cart/products');
    const data = await res.json();
    productsContainer.innerHTML = data.map(product => `
      <div class="product">
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart('${product._id}', '${product.name}', ${product.price})">Add to Cart</button>
      </div>
    `).join('');
  } catch {
    productsContainer.innerHTML = '<p>Could not load products.</p>';
  }
}

// --- Add item ---
window.addToCart = function (id, name, price) {
  const existing = cart.find(i => i.id === id);
  existing ? existing.quantity++ : cart.push({ id, name, price, quantity: 1 });
  saveCart();
};

// --- Remove item ---
function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
}

// --- Save cart ---
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

// --- Update counter ---
function updateCart() {
  cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
  renderCartItems();
}

// --- Render modal items ---
function renderCartItems() {
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} x${item.quantity} - $${item.price * item.quantity}
      <button onclick="removeFromCart('${item.id}')">❌</button>
    `;
    cartItems.appendChild(li);
  });
  totalPriceEl.textContent = `Total: $${total.toFixed(2)}`;
}

// --- Modal control ---
viewCartBtn.addEventListener('click', () => {
  renderCartItems();
  cartModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => cartModal.style.display = 'none');
window.onclick = e => { if (e.target === cartModal) cartModal.style.display = 'none'; };

// --- Checkout ---
checkoutBtn.addEventListener('click', async () => {
  if (!cart.length) return alert('Your cart is empty!');
  try {
    const res = await fetch('/api/cart/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart })
    });
    if (res.ok) {
      alert('✅ Order placed successfully!');
      cart = [];
      saveCart();
      cartModal.style.display = 'none';
    } else {
      alert('❌ Checkout failed.');
    }
  } catch (err) {
    console.error('Checkout error:', err);
  }
});

// --- Init ---
updateCart();
loadProducts();
