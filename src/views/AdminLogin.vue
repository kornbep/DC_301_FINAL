<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";




const router = useRouter();

const username = ref("");
const password = ref("");
const errorMessage = ref("");

const login = () => {
  if (
    username.value === "admin" &&
    password.value === "Admin@123"
  ) {
    sessionStorage.setItem("adminLoggedIn", "true");
    router.push("/admin");
  } else {
    errorMessage.value = "Invalid username or password.";
  }
};
</script>

<template>
  <div class="admin-login-page">
    <div class="admin-login-card">
      <div class="admin-login-icon">🔐</div>

      <h1>Admin Login</h1>
      <p>Sign in to manage Digital Marketplace orders.</p>

      <form @submit.prevent="login">
        <label for="username">Username</label>
        <input
          id="username"
          v-model="username"
          type="text"
          placeholder="Enter admin username"
          required
        />

        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Enter admin password"
          required
        />

        <p v-if="errorMessage" class="login-error">
          {{ errorMessage }}
        </p>

        <button type="submit" class="admin-login-button">
          Login as Admin
        </button>
      </form>

      <router-link to="/" class="back-home">
        ← Back to Home
      </router-link>
    </div>
  </div>
</template>