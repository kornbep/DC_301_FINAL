<script setup>
import { computed, inject } from "vue";

const cart = inject("cart");
const increaseQuantity = inject("increaseQuantity");
const decreaseQuantity = inject("decreaseQuantity");
const removeFromCart = inject("removeFromCart");

const total = computed(() => {
  return cart.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
});
</script>

<template>

  <section class="cart-page">

    <div class="page-heading">
      <span>SHOPPING CART</span>
      <h1>Your Cart</h1>
    </div>


    <div
      v-if="cart.length === 0"
      class="empty-cart"
    >
      <div>🛒</div>

      <h2>Your cart is empty</h2>

      <p>
        Add some products to your cart.
      </p>

      <router-link
        to="/products"
        class="hero-btn"
      >
        Start Shopping
      </router-link>
    </div>


    <div v-else class="cart-layout">

      <div class="cart-items">

        <div
          v-for="item in cart"
          :key="item.id"
          class="cart-item"
        >

          <img
            :src="item.image"
            :alt="item.name"
          />

          <div class="cart-info">

            <h3>{{ item.name }}</h3>

            <p>
              ₱{{ item.price.toLocaleString() }}
            </p>

            <div class="quantity">

              <button
                @click="decreaseQuantity(item.id)"
              >
                −
              </button>

              <span>{{ item.quantity }}</span>

              <button
                @click="increaseQuantity(item.id)"
              >
                +
              </button>

            </div>

          </div>

          <button
            @click="removeFromCart(item.id)"
            class="remove-btn"
          >
            ✕
          </button>

        </div>

      </div>


      <div class="summary">

        <h2>Order Summary</h2>

        <div class="summary-row">
          <span>Subtotal</span>
          <strong>
            ₱{{ total.toLocaleString() }}
          </strong>
        </div>

        <div class="summary-row">
          <span>Shipping</span>
          <strong>Free</strong>
        </div>

        <hr />

        <div class="summary-total">
          <span>Total</span>

          <strong>
            ₱{{ total.toLocaleString() }}
          </strong>
        </div>

        <router-link
          to="/checkout"
          class="checkout-btn"
        >
          Proceed to Checkout
        </router-link>

      </div>

    </div>

  </section>

</template>