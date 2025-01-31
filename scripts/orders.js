import { orders } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import formatCurrency from "./utils/money.js";

function renderOrders() {
    let orderHTML = '';

    
    
    orders.forEach(order => {
        const orderId = order.id;
        const totalCents = order.totalCostCents;
        const date = new Date(order.orderTime);
        const option = {day: '2-digit', month: 'long'}
        const formatedDate = date.toLocaleDateString('pl-PL', option);
        const products = order.products;       
        console.log(products) 

     orderHTML += 
     `<div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formatedDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(totalCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderId}</div>
            </div>
          </div>

          <div class="order-details-grid js-product-essential">
            ${productRender(products)}

          </div>
        </div>`;

        
    });

    document.querySelector('.js-orders-container').innerHTML = orderHTML;
}

function productRender(products) {
    let productHTML ='';
    products.forEach((product) => {
        const productId = product.productId;
        const matchingProduct = getProduct(productId);
        console.log(matchingProduct)
        const deliveryDate = new Date(product.estimatedDeliveryTime);
        const option = {month: 'long', day: '2-digit'}
        const formatedDate = deliveryDate.toLocaleDateString('pl-PL', option);

        productHTML += 
        `<div class="product-image-container">
          <img src=>
        </div>

        <div class="product-details">
          <div class="product-name">
            
          </div>
          <div class="product-delivery-date">
            Arriving on: ${formatedDate}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html"> <!--?orderId=123&productId=456-->
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>`

        
    });
    return  productHTML;
}

renderOrders();