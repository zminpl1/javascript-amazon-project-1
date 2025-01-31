import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from '../../data/products.js'
import {formatCurrency} from "../utils/money.js";
import { addOrder } from "../../data/orders.js";


export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let cartQuantity = 0;

  cart.forEach(item => {
      const product = getProduct(item.productId);
      productPriceCents += product.priceCents * item.quantity;
      cartQuantity += item.quantity;

      const deliveryOption = getDeliveryOption(item.deliveryOptionId);
      shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents / 10;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
        Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary js-order-button">
      Place your order
    </button>`;

  const paymentSummary = document.querySelector('.js-payment-summary');
  paymentSummary.innerHTML = paymentSummaryHTML;

  const orderBtn = document.querySelector('.js-order-button');
  orderBtn.addEventListener('click', async () => {
    try {
      const response = 
      await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
      });
  
      const order = await response.json();
      addOrder(order)
    } catch (error) {
      console.log('Unexpected Error: try againmg later')
    }

    window.location.href = 'orders.html'
  });
}                                                                                   