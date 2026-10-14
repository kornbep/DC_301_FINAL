<script setup>
import { ref, computed } from "vue";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard.vue";

const search = ref("");

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Gaming",
  "Home"
];

const selectedCategory = ref("All");

const filteredProducts = computed(() => {
  return products.filter(product => {

    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(search.value.toLowerCase());

    const matchesCategory =
      selectedCategory.value === "All" ||
      product.category === selectedCategory.value;

    return matchesSearch && matchesCategory;
  });
});
</script>

<template>

  <section class="hero">

    <div class="hero-content">

      <span class="hero-small">
        WELCOME TO Digital Marketplace
      </span>

      <h1>
        Shop Everything
        <span>You Need</span>
      </h1>

      <p>
        Discover quality products at affordable prices.
      </p>

      <router-link to="/products" class="hero-btn">
        Shop Now →
      </router-link>

    </div>

    <div class="hero-image">
      🛍️
    </div>

  </section>


  <section class="marketplace">

    <div class="section-header">

      <div>
        <span class="section-label">
          OUR MARKETPLACE
        </span>

        <h2>Featured Products</h2>
      </div>

      <input
        v-model="search"
        type="text"
        placeholder="Search products..."
      />

    </div>


    <div class="categories">

      <button
        v-for="category in categories"
        :key="category"
        @click="selectedCategory = category"
        :class="{ active: selectedCategory === category }"
      >
        {{ category }}
      </button>

    </div>


    <div class="product-grid">

      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />

    </div>

  </section>

</template>