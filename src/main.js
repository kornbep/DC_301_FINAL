import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import Home from "./views/Home.vue";
import Products from "./views/Products.vue";
import ProductDetails from "./views/ProductDetails.vue";
import Cart from "./views/Cart.vue";
import Checkout from "./views/Checkout.vue";
import Admin from "./views/Admin.vue";
import AdminLogin from "./views/AdminLogin.vue";

import "./style.css";

const routes = [
  { path: "/", component: Home },
  { path: "/products", component: Products },
  { path: "/product/:id", component: ProductDetails },
  { path: "/cart", component: Cart },
  { path: "/checkout", component: Checkout },

  { path: "/admin-login", component: AdminLogin },

  {
    path: "/admin",
    component: Admin,
    meta: { requiresAdmin: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to) => {
  const isAdminLoggedIn =
    sessionStorage.getItem("adminLoggedIn") === "true";

  if (to.meta.requiresAdmin && !isAdminLoggedIn) {
    return "/admin-login";
  }

  if (to.path === "/admin-login" && isAdminLoggedIn) {
    return "/admin";
  }
});

createApp(App).use(router).mount("#app");