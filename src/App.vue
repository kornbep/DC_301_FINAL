<script setup>
import { ref, provide, computed } from "vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

const cart = ref(JSON.parse(localStorage.getItem("cart")) || []);

const addToCart = (product) => {
  const existing = cart.value.find(item => item.id === product.id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.value.push({
      ...product,
      quantity: 1
    });
  }

  saveCart();
};

const removeFromCart = (id) => {
  cart.value = cart.value.filter(item => item.id !== id);
  saveCart();
};

const increaseQuantity = (id) => {
  const item = cart.value.find(item => item.id === id);

  if (item) {
    item.quantity++;
  }

  saveCart();
};

const decreaseQuantity = (id) => {
  const item = cart.value.find(item => item.id === id);

  if (item && item.quantity > 1) {
    item.quantity--;
  } else {
    removeFromCart(id);
  }

  saveCart();
};

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart.value));
};

const cartCount = computed(() =>
  cart.value.reduce((total, item) => total + item.quantity, 0)
);

provide("cart", cart);
provide("addToCart", addToCart);
provide("removeFromCart", removeFromCart);
provide("increaseQuantity", increaseQuantity);
provide("decreaseQuantity", decreaseQuantity);
provide("cartCount", cartCount);
</script>

<template>
  <Navbar />

  <main>
    <router-view />
  </main>

  <Footer />
</template>