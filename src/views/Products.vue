<script setup>
import { ref, computed } from "vue";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard.vue";

const search = ref("");
const category = ref("All");

const filteredProducts = computed(() => {
  return products.filter(product => {

    const searchMatch =
      product.name
        .toLowerCase()
        .includes(search.value.toLowerCase());

    const categoryMatch =
      category.value === "All" ||
      product.category === category.value;

    return searchMatch && categoryMatch;
  });
});
</script>

<template>

  <section class="products-page">

    <div class="page-heading">

      <span>Digital Marketplace</span>

      <h1>All Products</h1>

      <p>
        Browse our collection of products.
      </p>

    </div>


    <div class="filter-bar">

      <input
        v-model="search"
        placeholder="Search products..."
      />

      <select v-model="category">

        <option>All</option>
        <option>Electronics</option>
        <option>Fashion</option>
        <option>Gaming</option>
        <option>Home</option>

      </select>

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