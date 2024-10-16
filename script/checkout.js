import { cart, removeCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { FormatCurrency } from "./untils/formatCurrency.js";
// console.log(FormatCurrency);

const today = dayjs();
const deliveryDate = today.add(7, "days");
console.log(deliveryDate.format("dddd, MMMM D"));

let htmlForCartOrder = "";
cart.forEach((item) => {
  const productID = item.productId;
  let matchingProduct;
  products.forEach((dataProduct) => {
    if (dataProduct.id === productID) {
      matchingProduct = dataProduct;
      // console.log(matchingProduct.priceCents);
      // console.log(FormatCurrency(122));
      htmlForCartOrder += `
         <div class="cart-item-container js-item-container-${
           matchingProduct.id
         }">
          <div class="delivery-date">Delivery date: Tuesday, June 21</div>
          <div class="cart-item-details-grid">
            <img
              class="product-image"
              src=${matchingProduct.image}
            />
            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">$${FormatCurrency(
                matchingProduct.priceCents
              )}</div>
              <div class="product-quantity">Quantity: </span>${
                item.quantity
              } </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary delete-to-cart" data-delete-cart="${
                  matchingProduct.id
                }">
                  Delete
                </span>
              </div>
            </div>
            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              <div class="delivery-option">
                <input
                  type="radio"
                  checked
                  class="delivery-option-input"
                  name="delivery-option-${matchingProduct.id}"
                />
                <div>
                  <div class="delivery-option-date">Tuesday, June 21</div>
                  <div class="delivery-option-price">FREE Shipping</div>
                </div>
              </div>
              <div class="delivery-option">
                <input
                  type="radio"
                  class="delivery-option-input"
                  name="delivery-option-${matchingProduct.id}"
                />
                <div>
                  <div class="delivery-option-date">Wednesday, June 15</div>
                  <div class="delivery-option-price">$4.99 - Shipping</div>
                </div>
              </div>
              <div class="delivery-option">
                <input
                  type="radio"
                  class="delivery-option-input"
                  name="delivery-option-${matchingProduct.id}"
                />
                <div>
                  <div class="delivery-option-date">Monday, June 13</div>
                  <div class="delivery-option-price">$9.99 - Shipping</div>
                </div>
              </div>
            </div>
          </div>
         </div>
      `;
    }

    document.querySelector(".add-to-cart-checkout").innerHTML =
      htmlForCartOrder;
  });
});

document.querySelectorAll(".delete-to-cart").forEach((productIdDelete) => {
  productIdDelete.addEventListener("click", function () {
    const productId = productIdDelete.dataset.deleteCart;
    removeCart(productId);
    // console.log(productId);
    const container = document.querySelector(`.js-item-container-${productId}`);
    container.remove();
  });
});
