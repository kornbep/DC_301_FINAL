```vue
<script setup>
import { inject } from "vue";

const cartCount = inject("cartCount");
</script>

<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="logo">
        🛒 MarketHub
      </router-link>

      <div class="nav-links">
        <router-link to="/" exact-active-class="active-link">
          Home
        </router-link>

        <router-link to="/products" active-class="active-link">
          Products
        </router-link>

        
        <router-link to="/cart" class="cart-link">
          🛒 Cart
          <span class="cart-count">{{ cartCount }}</span>
          
          <router-link to="/admin" active-class="active-link">
            Admin
          </router-link>
        </router-link>
      </div>
    </div>
  </nav>
</template>
```