<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { products } from "../data/products";
import { inject } from "vue";

const route = useRoute();

const product = computed(() => {
  return products.find(
    item => item.id === Number(route.params.id)
  );
});

const addToCart = inject("addToCart");
</script>

<template>

  <section
    v-if="product"
    class="details"
  >

    <img
      :src="product.image"
      :alt="product.name"
    />

    <div class="details-content">

      <span class="category">
        {{ product.category }}
      </span>

      <h1>{{ product.name }}</h1>

      <h2>
        ₱{{ product.price.toLocaleString() }}
      </h2>

      <p>
        {{ product.description }}
      </p>

      <button
        @click="addToCart(product)"
        class="add-btn large"
      >
        🛒 Add to Cart
      </button>

    </div>

  </section>

</template>