const products = [
  {
    name: "Waffle with Berries",
    price: 6.5,
    img: "assets/images/image-waffle-desktop.jpg",
  },
  {
    name: "Vanilla Bean Crème Brûlée",
    price: 7.0,
    img: "assets/images/image-creme-brulee-desktop.jpg",
  },
  {
    name: "Macaron Mix of Five",
    price: 8.0,
    img: "assets/images/image-macaron-desktop.jpg",
  },
  {
    name: "Classic Tiramisu",
    price: 5.5,
    img: "assets/images/image-tiramisu-desktop.jpg",
  },
  {
    name: "Pistachio Baklava",
    price: 4.0,
    img: "assets/images/image-baklava-desktop.jpg",
  },
  {
    name: "Lemon Meringue Pie",
    price: 5.0,
    img: "assets/images/image-meringue-desktop.jpg",
  },
  {
    name: "Red Velvet Cake",
    price: 4.5,
    img: "assets/images/image-cake-desktop.jpg",
  },
  {
    name: "Salted Caramel Brownie",
    price: 5.5,
    img: "assets/images/image-brownie-desktop.jpg",
  },
  {
    name: "Vanilla Panna Cotta",
    price: 6.5,
    img: "assets/images/image-panna-cotta-desktop.jpg",
  },
];

const productGrid = document.getElementById("productGrid");
const cartItemsEl = document.getElementById("cartItems");
const cartCountEl = document.getElementById("cartCount");
const cartTotalEl = document.getElementById("cartTotal");
const cart = {};

// Function to update the cart UI
function updateCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;
  let count = 0;
  let cartItemsHTML = "";
  for (const name in cart) {
    const { price, quantity } = cart[name];
    const item = document.createElement("div");
    item.className = "cart-item";
    item.innerHTML = `

        <span>${name} <br><small>${quantity}x $${price.toFixed(
      2
    )}</small></span>
        <strong>$${(price * quantity).toFixed(2)}</strong>
        <button class="remove-btn" data-name="${name}"></button>
      `;
    item.querySelector(".remove-btn").onclick = () => {
      removeFromCart(name); // Remove item when "Remove" button is clicked
    };
    cartItemsEl.appendChild(item);
    total += price * quantity;
    count += quantity;
    cartItemsHTML += `
<div class="order-item">
  <span>${name} <br><small>${quantity}x $${price.toFixed(2)}</small></span>
  <strong>$${(price * quantity).toFixed(2)}</strong>
</div>
`;
  }

  cartCountEl.textContent = count;
  cartTotalEl.textContent = `$${total.toFixed(2)}`;

  // Display cart items in the order confirmation modal
  document.querySelector(".order-items").innerHTML = cartItemsHTML;
  document.querySelector(".order-total strong").textContent = `$${total.toFixed(
    2
  )}`;
}

// Function to add items to the cart
function addToCart(name, price) {
  if (!cart[name]) {
    cart[name] = { price, quantity: 1 }; // If item is not in cart, add it with quantity 1
  } else {
    cart[name].quantity++; // If item is in cart, increase quantity
  }
  console.log(`Added ${name} to the cart`); // Debug log to check if item is added
  updateCart();
  document.querySelector(".confirm-btn").disabled = false;
}

// Function to remove items from the cart
function removeFromCart(name) {
  delete cart[name]; // Remove item from the cart
  console.log(`Removed ${name} from the cart`); // Debug log to check if item is removed
  updateCart(); // Update cart display
  renderEmptyCartMessage();
}

// Function to show the order confirmation modal
function showOrderConfirmation() {
  const confirmationBox = document.querySelector(".order-confirmation");
  confirmationBox.style.display = "flex"; // Show confirmation box
  updateCart(); // Populate the order details in the modal
}

// Function to start a new order
function startNewOrder() {
  // Clear the cart
  for (let item in cart) {
    delete cart[item]; // Remove all items from the cart
  }

  renderEmptyCartMessage();

  // Hide the order confirmation modal
  document.querySelector(".order-confirmation").style.display = "none";

  // Reset the cart count and total in the main cart
  cartCountEl.textContent = "0";
  cartTotalEl.textContent = "$0.00";
}
// Display products in the grid
products.forEach(({ name, price, img }) => {
  const product = document.createElement("div");
  product.className = "product";
  product.innerHTML = `
    <img src="${img}" alt="${name}" />
    <div class="info">
      <h4>${name}</h4>
      <p>$${price.toFixed(2)}</p>
      <button class="add-btn">🛒 Add to Cart</button>
    </div>
  `;
  // Add event listener to "Add to Cart" button
  product.querySelector(".add-btn").onclick = () => addToCart(name, price);
  productGrid.appendChild(product);
});

// Handle "Confirm Order" button click to show order confirmation
document
  .querySelector(".confirm-btn")
  .addEventListener("click", showOrderConfirmation);

// Handle "Start New Order" button click to reset the cart
document
  .querySelector(".start-new-order")
  .addEventListener("click", startNewOrder);

function renderEmptyCartMessage() {
  // Check if the cart is empty

  if (Object.keys(cart).length === 0) {
    document.querySelector(".confirm-btn").disabled = true;
    // If empty, render the "empty cart" message
    cartItemsEl.innerHTML = `
        <div id="emptyCartMessage" class="empty-cart">
          <img
            src="/assets/images/illustration-empty-cart.svg"
            alt="empty-cart"
          />
          <p class="empty-cart-message">
            Your added items will appear here
          </p>
        </div>
      `;
  } else {
    // If there are items in the cart, update the cart UI
    document.querySelector(".confirm-btn").disabled = false;
    updateCart();
  }
}
