# 🛒 Cart Utilities

A lightweight ES module for managing a shopping cart using **localStorage**.  
Includes functions to add, remove, update quantities, calculate totals, and clear the cart.

---

## 📦 Installation

### Using in a Browser (HTML + JS)
```html
<script type="module">
  import {
    addToCart,
    removeFromCart,
    getCart,
    updateQuantity,
    getPrice,
    clearCart
  } from "./your-cart-utils.js";
</script>
🚀 Functions & Usage
1. addToCart(data, id)
Adds a new item to the cart only if an item with the same ID does not already exist.

Example
js
Copy code
addToCart(
  { id: 1, name: "Chair", price: 1200, quantity: 1 },
  1
);
⚠️ Pitfalls
Ensure the item has an id property.

Pass the same id as the second argument.

If the item already exists, it will not be added again.

2. removeFromCart(id)
Removes a specific item from the cart by its id.

Example
js
Copy code
removeFromCart(1);
⚠️ Pitfalls
Removing a non-existing ID does nothing silently.

3. getCart()
Returns the current cart array or null if the cart is empty.

Example
js
Copy code
const cart = getCart();
console.log(cart);
⚠️ Pitfalls
If the cart is empty, the function returns null, not an empty array.

Safe usage:

js
Copy code
const cart = getCart();
if (cart) {
  console.log(cart);
}
4. updateQuantity(id, quantity)
Updates the quantity of a specific item in the cart.

Example
js
Copy code
updateQuantity(1, 3);
⚠️ Pitfalls
If the item does not exist, the function logs a message but does nothing.

Make sure quantity is a valid number (preferably >= 1).

5. getPrice(tax = 0, deliveryCharges = 0)
Returns the total cost of the cart including optional tax and delivery charges.

Example
js
Copy code
const total = getPrice(50, 30);
console.log("Grand Total:", total);
⚠️ Pitfalls
Ensure each item has a numeric price.

Items without a quantity default to 1.

6. clearCart()
Removes all cart data from localStorage.

Example
js
Copy code
clearCart();
⚠️ Pitfalls
This action cannot be undone.

Use only when the user confirms an action (checkout/cancel/cart reset).

🧠 Internal Helper Function
readCartSafe()
Safely reads the cart from localStorage.

Returns an empty array if no valid data exists.

📁 Cart Storage Format
Data stored inside localStorage:

json
Copy code
[
  {
    "id": 1,
    "name": "Chair",
    "price": 1200,
    "quantity": 2
  }
]
📝 Notes & Best Practices
Always provide a unique id for each item.

Avoid storing large objects inside localStorage.

Use updateQuantity instead of addToCart to modify quantities.

Use Number(item.price) to prevent string arithmetic bugs.