document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalDiv = document.getElementById("cart-total");
  const totalPrice = document.getElementById("total-price");
  const addedItems = document.getElementById("added-items");
  const checkoutBtn = document.getElementById("checkout-btn");

  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 99.99 },
    { id: 3, name: "Product 3", price: 129.99 },
    { id: 4, name: "Product 4", price: 729.99 },
    { id: 5, name: "Product 5", price: 19.99 },
    { id: 6, name: "Product 6", price: 9.99 },
  ];

  const cart = JSON.parse(localStorage.getItem("items")) || [];
  let total = cart.reduce((sum, item) => sum + item.price, 0);

  // Render products
  products.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(div);
  });

  // Render saved cart items
  if (cart.length > 0) {
    cartItems.classList.add("hidden");
    cartTotalDiv.classList.remove("hidden");
    cart.forEach((product) => renderCartItem(product));
    updateTotalPrice();
  }

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((e) => e.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cartItems.classList.add("hidden");
    cartTotalDiv.classList.remove("hidden");
    cart.push(product);
    renderCartItem(product);
    priceTotal(product.price);
    saveItems();
  }

  function renderCartItem(product) {
    const para = document.createElement("p");
    para.classList.add("items");
    para.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}" class="delete-btn">Delete</button>
    `;
    addedItems.appendChild(para);
  }

  function priceTotal(price) {
    total += price;
    updateTotalPrice();
  }

  function updateTotalPrice() {
    totalPrice.textContent = `$${total.toFixed(2)}`;
  }

  function saveItems() {
    localStorage.setItem("items", JSON.stringify(cart));
  }

  // Delete item from cart
  addedItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const index = cart.findIndex((item) => item.id === productId);
      if (index > -1) {
        total -= cart[index].price;
        cart.splice(index, 1);
        saveItems();
        updateTotalPrice();
        e.target.parentElement.remove();

        if (cart.length === 0) {
          cartItems.classList.remove("hidden");
          cartTotalDiv.classList.add("hidden");
        }
      }
    }
  });

  checkoutBtn.addEventListener("click", () => {
    cartItems.classList.remove("hidden");
    cartTotalDiv.classList.add("hidden");
    cart.length = 0; // Clear cart array
    addedItems.innerHTML = ""; // Clear displayed items
    total = 0; // Reset total price
    updateTotalPrice(); // Update total display
    emptyCartMessage.textContent = `Checkout successfully!`;
    localStorage.removeItem("items"); // Clear localStorage
  });
});
