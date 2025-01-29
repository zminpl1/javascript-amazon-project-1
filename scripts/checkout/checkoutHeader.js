import { cart } from "../../data/cart.js";

export function renderCheckoutHeader() {
    let checkoutHeaderHTML = '';
    let cartQuantity = 0;

    cart.forEach(item => {
        cartQuantity += item.quantity;
    });

    checkoutHeaderHTML += `
    Checkout (<a class="return-to-home-link"
    href="amazon.html">${cartQuantity} items</a>)
    `;

    document.querySelector('.js-checkout-header').innerHTML = checkoutHeaderHTML;
}