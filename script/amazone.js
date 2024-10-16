import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { addToCart } from "../data/cart.js";

products.forEach((value) => {
  const html = `
    <div class="product-container">
    <div class="product-image-container">
      <img
        class="product-image"
        src="${value.image}"
      />
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${value.name}
    </div>

    <div class="product-rating-container">
      <img
        class="product-rating-stars"
        src="images/ratings/rating-${value.rating.stars * 10}.png"
      />
      <div class="product-rating-count link-primary">${value.rating.count}</div>
    </div>

    <div class="product-price">$${(value.priceCents / 100).toFixed(2)}</div>

    <div class="product-quantity-container">
      <select>
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png" />
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart"
    data-product-id = "${value.id}"
    >Add to Cart</button>
  </div>
  `;
  document.querySelector(".products-grid").innerHTML += html;
});

const button = document.querySelectorAll(".js-add-to-cart");

function totalQuantity() {
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity = totalQuantity + item.quantity;
  });
  console.log(totalQuantity);
  document.querySelector(".number-order-total").innerHTML = totalQuantity;
}

button.forEach((button) => {
  button.addEventListener("click", () => {
    let productId = button.dataset.productId;
    addToCart(productId);
    totalQuantity();
    console.log(cart);
  });
});
