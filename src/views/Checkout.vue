
<script setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const cart = inject("cart");

const submitted = ref(false);
const error = ref("");

const order = ref({
  name: "",
  email: "",
  address: "",
  payment: "Cash on Delivery"
});

const placeOrder = () => {
  if (!cart.value.length) {
    error.value = "Your cart is empty.";
    return;
  }

  const newOrder = {
    id: Date.now(),
    customer: { ...order.value },
    products: cart.value.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    })),
    total: cart.value.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),
    status: "Pending",
    date: new Date().toLocaleString()
  };

  try {
    const orders = JSON.parse(
      localStorage.getItem("marketplace_orders") || "[]"
    );

    orders.unshift(newOrder);

    localStorage.setItem(
      "marketplace_orders",
      JSON.stringify(orders)
    );

    cart.value.splice(0, cart.value.length);
    localStorage.setItem("cart", "[]");

    submitted.value = true;
    error.value = "";
  } catch {
    error.value = "Unable to save your order. Please try again.";
  }
};
</script>

<template>
  <section class="checkout">
    <div class="page-heading">
      <span>CHECKOUT</span>
      <h1>Complete Your Order</h1>
      <p>Your order details will be sent to the admin dashboard.</p>
    </div>

    <div v-if="submitted" class="success">
      <div>✅</div>
      <h2>Order Placed Successfully!</h2>
      <p>The administrator can now view your order.</p>

      <button class="checkout-btn" @click="router.push('/products')">
        Continue Shopping
      </button>
    </div>

    <form v-else @submit.prevent="placeOrder" class="checkout-form">
      <p v-if="error" class="error-message">{{ error }}</p>

      <label>Full Name</label>
      <input v-model="order.name" required placeholder="Enter your name" />

      <label>Email</label>
      <input v-model="order.email" type="email" required placeholder="Enter your email" />

      <label>Delivery Address</label>
      <textarea v-model="order.address" required placeholder="Enter your address"></textarea>

      <label>Payment Method</label>
      <select v-model="order.payment">
        <option>Cash on Delivery</option>
        <option>GCash</option>
        <option>Credit/Debit Card</option>
      </select>

      <h3 class="checkout-total">
        Total: ₱{{ cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString() }}
      </h3>

      <button type="submit" class="checkout-btn">
        Place Order
      </button>
    </form>
  </section>
</template>
