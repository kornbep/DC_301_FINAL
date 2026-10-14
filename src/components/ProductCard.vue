<script setup>
import { inject } from "vue";

defineProps({
  product: Object
});

const addToCart = inject("addToCart");
</script>

<template>
  <div class="product-card">

    <img
      :src="product.image"
      :alt="product.name"
    />

    <div class="product-info">

      <span class="category">
        {{ product.category }}
      </span>

      <h3>{{ product.name }}</h3>

      <p class="price">
        ₱{{ product.price.toLocaleString() }}
      </p>

      <div class="product-buttons">

        <router-link
          :to="`/product/${product.id}`"
          class="view-btn"
        >
          View
        </router-link>

        <button
          @click="addToCart(product)"
          class="add-btn"
        >
          Add to Cart
        </button>

      </div>

    </div>
  </div>
</template>