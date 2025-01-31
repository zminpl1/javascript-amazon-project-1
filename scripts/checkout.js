import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import {renderOrderSummary} from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
// import '../data/cart-class.js'
// import '../data/backend-practise.js';

loadProducts(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});

