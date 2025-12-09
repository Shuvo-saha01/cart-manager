# Cart Utilities

A lightweight ES module for managing shopping cart operations using localStorage. This library provides a simple and intuitive API for adding, removing, updating, and managing cart items in browser-based applications.

## Features

- 🚀 Simple and intuitive API
- 💾 Persistent storage using localStorage
- 🔒 Safe data handling with built-in validation
- 📦 Zero dependencies
- 🎯 TypeScript-friendly structure
- ⚡ Lightweight and fast

## Installation

### Browser (ES Modules)

Include the module in your HTML file:

```html

  import {
    addToCart,
    removeFromCart,
    getCart,
    updateQuantity,
    getPrice,
    clearCart
  } from "./cart-utils.js";

```

## API Reference

### `addToCart(data, id)`

Adds a new item to the cart. If an item with the same ID already exists, the operation is skipped.

**Parameters:**
- `data` (Object): The item object containing product details
  - `id` (Number|String): Unique identifier for the item
  - `name` (String): Product name
  - `price` (Number): Product price
  - `quantity` (Number): Quantity to add
- `id` (Number|String): The ID of the item (must match `data.id`)

**Example:**

```javascript
addToCart(
  { 
    id: 1, 
    name: "Ergonomic Chair", 
    price: 1200, 
    quantity: 1 
  },
  1
);
```

**Important Notes:**
- The item must include an `id` property
- The second parameter should match the item's ID
- Duplicate IDs will not be added to prevent conflicts

---

### `removeFromCart(id)`

Removes an item from the cart by its unique identifier.

**Parameters:**
- `id` (Number|String): The ID of the item to remove

**Example:**

```javascript
removeFromCart(1);
```

**Important Notes:**
- Removing a non-existent ID performs no action
- No error is thrown for invalid IDs

---

### `getCart()`

Retrieves the current cart contents.

**Returns:**
- `Array`: Cart items, or `null` if the cart is empty

**Example:**

```javascript
const cart = getCart();

if (cart) {
  console.log("Current cart:", cart);
} else {
  console.log("Cart is empty");
}
```

**Important Notes:**
- Returns `null` (not an empty array) when cart is empty
- Always check for null before iterating

---

### `updateQuantity(id, quantity)`

Updates the quantity of a specific item in the cart.

**Parameters:**
- `id` (Number|String): The ID of the item to update
- `quantity` (Number): The new quantity value

**Example:**

```javascript
updateQuantity(1, 3);
```

**Important Notes:**
- If the item doesn't exist, a message is logged but no error is thrown
- Ensure quantity is a positive number
- Setting quantity to 0 does not remove the item

---

### `getPrice(tax = 0, deliveryCharges = 0)`

Calculates the total cart price including optional tax and delivery charges.

**Parameters:**
- `tax` (Number, optional): Tax amount to add (default: 0)
- `deliveryCharges` (Number, optional): Delivery fee to add (default: 0)

**Returns:**
- `Number`: Total cart value

**Example:**

```javascript
const subtotal = getPrice();
const total = getPrice(50, 30);

console.log("Subtotal:", subtotal);
console.log("Total with tax and delivery:", total);
```

**Important Notes:**
- Items without a `quantity` property default to 1
- Ensure all prices are numeric values
- Tax and delivery charges are added to the subtotal

---

### `clearCart()`

Removes all items from the cart and clears localStorage.

**Example:**

```javascript
clearCart();
```

**Important Notes:**
- This action is irreversible
- Consider asking for user confirmation before clearing
- Use after successful checkout or explicit cart reset

---

## Data Structure

Cart data is stored in localStorage with the following structure:

```json
[
  {
    "id": 1,
    "name": "Ergonomic Chair",
    "price": 1200,
    "quantity": 2
  },
  {
    "id": 2,
    "name": "Standing Desk",
    "price": 3500,
    "quantity": 1
  }
]
```

## Best Practices

### Unique IDs
Always ensure each item has a unique identifier:

```javascript
// Good
addToCart({ id: Date.now(), name: "Product", price: 100, quantity: 1 }, Date.now());

// Avoid duplicate IDs
```

### Quantity Management
Use `updateQuantity()` instead of adding the same item multiple times:

```javascript
// Recommended
updateQuantity(1, 3);

// Not recommended
addToCart(item, 1);
addToCart(item, 1);
addToCart(item, 1);
```

### Type Safety
Ensure numeric values are properly typed:

```javascript
const price = Number(item.price);
const quantity = parseInt(item.quantity, 10);
```

### Error Handling
Always validate cart data before operations:

```javascript
const cart = getCart();

if (cart && Array.isArray(cart)) {
  // Safe to process cart
  cart.forEach(item => {
    console.log(item.name, item.price);
  });
}
```

## Common Pitfalls

| Issue | Solution |
|-------|----------|
| Cart returns `null` | Check for null before accessing cart data |
| Quantities not updating | Ensure ID exists and quantity is valid |
| Price calculation errors | Verify all prices are numbers, not strings |
| LocalStorage quota exceeded | Clear cart periodically or limit items |
| Duplicate items | Use `updateQuantity()` instead of `addToCart()` |

## Browser Compatibility

This library uses localStorage and ES6 modules, which are supported in:

- Chrome 61+
- Firefox 60+
- Safari 10.1+
- Edge 16+

## License

MIT License - feel free to use in personal and commercial projects.

## Contributing

Contributions are welcome! Please ensure all changes maintain backward compatibility and include appropriate documentation.

---

**Need help?** Open an issue or submit a pull request on GitHub.