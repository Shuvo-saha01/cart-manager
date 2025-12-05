// read from cart
function readCartSafe() {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
}

// add to cart 
export function addToCart(data, id) {
    const cartDataParsed = readCartSafe();

    // check if item already exist 
    const itemAlreadyExist = cartDataParsed.some(
        (item) => item.id == id
    );

    if (itemAlreadyExist) {
        console.log("item already exist");
        return;
    }

    cartDataParsed.push(data);

    localStorage.setItem("cart", JSON.stringify(cartDataParsed));
}



// remove from cart by id
export function removeFromCart(id) {
    const cartDataParsed = readCartSafe();

    const newCartData = cartDataParsed.filter(
        (item) => item.id != id
    );

    localStorage.setItem("cart", JSON.stringify(newCartData));
}


// function read cart 
export function getCart() {
    const cartDataParsed = readCartSafe();
    return cartDataParsed.length > 0 ? cartDataParsed : null;
}



// function updateQuantity
export function updateQuantity(id, quantity) {
    const cartDataParsed = readCartSafe();

    // find index of the item
    const index = cartDataParsed.findIndex(
        (item) => item.id == id
    );

    if (index === -1) {
        console.log("item do not exist, quantity cant be updated");
        return;
    }

    // update quantity
    cartDataParsed[index].quantity = quantity;

    // save the updated cart
    localStorage.setItem("cart", JSON.stringify(cartDataParsed));
}


export function getPrice(tax = 0, deliveryCharges = 0) {
    const cartDataParsed = readCartSafe();

   

    const sumWithoutTaxAndDelivery = cartDataParsed.reduce(
        (accu, item) => accu + ( Number(item.price) * (item.quantity || 1)), 
        0
    );

    const sumFinal = sumWithoutTaxAndDelivery + tax + deliveryCharges;

    return sumFinal;
}


export function clearCart() {
    localStorage.removeItem("cart");
}