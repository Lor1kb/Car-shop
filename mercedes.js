// Add event listener to all the "+" buttons
document.querySelectorAll(".add").forEach((button) => {
  button.addEventListener("click", addToCart);
});

function addToCart(event) {
  const carElement = event.target.closest(".car"); // Find the parent car element
  const itemName = carElement.querySelector("h4").textContent.trim();
  const itemPrice = parseFloat(
    carElement
      .querySelector("h6")
      .textContent.replace("Price: ", "")
      .replace("$", "")
  );

  const item = { name: itemName, price: itemPrice };

  // Check if cart items already exist in local storage
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Add item to cart
  cartItems.push(item);

  // Update local storage
  localStorage.setItem("cart", JSON.stringify(cartItems));

  updateBasketDisplay(cartItems);

  event.preventDefault();
}

function updateBasketDisplay(cartItems) {
  const basketItemsList = document.getElementById("basket-items");
  basketItemsList.innerHTML = "";

  let subtotal = 0;

  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name}: $${item.price.toFixed(2)}`;
    basketItemsList.appendChild(li);

    subtotal += item.price;
  });

  const taxRate = 0.05;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  document.getElementById("Subtotal-price").textContent = subtotal.toFixed(2);
  document.getElementById("tax-price").textContent = tax.toFixed(2);
  document.getElementById("total-price").textContent = total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  updateBasketDisplay(cartItems);
});

document.querySelectorAll(".remove").forEach((button) => {
  button.addEventListener("click", removeFromCart);
});

function removeFromCart(event) {
  const carElement = event.target.closest(".car");
  const itemName = carElement.querySelector("h4").textContent.trim();
  const itemPrice = parseFloat(
    carElement
      .querySelector("h6")
      .textContent.replace("Price: ", "")
      .replace("$", "")
  );

  const item = { name: itemName, price: itemPrice };

  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const index = cartItems.findIndex(
    (cartItem) => cartItem.name === item.name && cartItem.price === item.price
  );

  if (index !== -1) {
    cartItems.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));

  updateBasketDisplay(cartItems);

  event.preventDefault();
}
