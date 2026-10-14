```vue
<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  sessionStorage.removeItem("adminLoggedIn");
  router.replace("/admin-login");
};

const savedOrders = () => {
  try {
    const data = JSON.parse(
      localStorage.getItem("marketplace_orders") || "[]"
    );

    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

const orders = ref(savedOrders());
const search = ref("");
const statusFilter = ref("All");

const statuses = [
  "Pending",
  "Processing",
  "Shipped",
  "Completed",
  "Cancelled"
];

const filteredOrders = computed(() => {
  const keyword = search.value.toLowerCase().trim();

  return orders.value.filter((order) => {
    const name = String(order.customer?.name || "").toLowerCase();
    const email = String(order.customer?.email || "").toLowerCase();
    const id = String(order.id || "");

    const matchesSearch =
      name.includes(keyword) ||
      email.includes(keyword) ||
      id.includes(keyword);

    const matchesStatus =
      statusFilter.value === "All" ||
      order.status === statusFilter.value;

    return matchesSearch && matchesStatus;
  });
});

const pendingOrders = computed(() =>
  orders.value.filter((order) => order.status === "Pending").length
);

const processingOrders = computed(() =>
  orders.value.filter((order) => order.status === "Processing").length
);

const totalSales = computed(() =>
  orders.value
    .filter((order) => order.status !== "Cancelled")
    .reduce((sum, order) => sum + (Number(order.total) || 0), 0)
);

const formatPrice = (price) =>
  (Number(price) || 0).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

const saveOrders = () => {
  localStorage.setItem(
    "marketplace_orders",
    JSON.stringify(orders.value)
  );
};

const updateStatus = (order, status) => {
  if (!statuses.includes(status)) return;

  order.status = status;
  saveOrders();
};

const deleteOrder = (id) => {
  if (!confirm("Are you sure you want to delete this order?")) {
    return;
  }

  orders.value = orders.value.filter((order) => order.id !== id);
  saveOrders();
};
</script>

<template>
  <section class="admin-page">
    <!-- Dashboard Header -->
    <div class="admin-header">
      <div>
        <span class="admin-eyebrow">MARKETHUB MANAGEMENT</span>
        <h1>Admin Dashboard</h1>
        <p>Manage customer orders and track their status.</p>
      </div>

      <div class="admin-header-actions">
        <router-link to="/" class="admin-back">
          ← View Store
        </router-link>

        <button class="admin-logout-button" @click="logout">
          Logout
        </button>
      </div>
    </div>

    <!-- Dashboard Statistics -->
    <div class="admin-stats">
      <div class="admin-stat">
        <span>Total Orders</span>
        <strong>{{ orders.length }}</strong>
      </div>

      <div class="admin-stat">
        <span>Pending Orders</span>
        <strong>{{ pendingOrders }}</strong>
      </div>

      <div class="admin-stat">
        <span>Processing</span>
        <strong>{{ processingOrders }}</strong>
      </div>

      <div class="admin-stat">
        <span>Order Value</span>
        <strong>₱{{ formatPrice(totalSales) }}</strong>
      </div>
    </div>

    <!-- Orders Section -->
    <div class="admin-orders">
      <div class="admin-orders-heading">
        <div>
          <h2>Customer Orders</h2>
          <p>Review customer information and ordered products.</p>
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="admin-filters">
        <input
          v-model="search"
          type="search"
          placeholder="Search customer, email, or order ID..."
          aria-label="Search orders"
        />

        <select v-model="statusFilter" aria-label="Filter by status">
          <option value="All">All Statuses</option>

          <option
            v-for="status in statuses"
            :key="status"
            :value="status"
          >
            {{ status }}
          </option>
        </select>
      </div>

      <!-- Empty State -->
      <div v-if="filteredOrders.length === 0" class="admin-empty">
        <div class="admin-empty-icon">📦</div>
        <h3>No orders found</h3>
        <p>
          {{
            orders.length === 0
              ? "Customer orders will appear here after checkout."
              : "Try changing your search or status filter."
          }}
        </p>
      </div>

      <!-- Order List -->
      <div v-else class="admin-order-list">
        <article
          v-for="order in filteredOrders"
          :key="order.id"
          class="admin-order-card"
        >
          <!-- Customer and Total -->
          <div class="order-top">
            <div>
              <span class="order-label">
                ORDER #{{ order.id }}
              </span>

              <h3>{{ order.customer?.name || "Unknown Customer" }}</h3>

              <p>{{ order.customer?.email || "No email provided" }}</p>
            </div>

            <strong class="order-total">
              ₱{{ formatPrice(order.total) }}
            </strong>
          </div>

          <!-- Customer Information -->
          <div class="order-customer-info">
            <p>
              <strong>Address:</strong>
              {{ order.customer?.address || "Not provided" }}
            </p>

            <p>
              <strong>Payment:</strong>
              {{ order.customer?.payment || "Not specified" }}
            </p>

            <p>
              <strong>Date:</strong>
              {{ order.date || "Not available" }}
            </p>
          </div>

          <!-- Products -->
          <div class="ordered-products">
            <h4>Products Ordered</h4>

            <div
              v-for="(product, index) in order.products || []"
              :key="product.id ?? index"
              class="ordered-product"
            >
              <span>
                {{ product.name || "Product" }} ×
                {{ Number(product.quantity) || 0 }}
              </span>

              <strong>
                ₱{{
                  formatPrice(
                    (Number(product.price) || 0) *
                    (Number(product.quantity) || 0)
                  )
                }}
              </strong>
            </div>

            <p v-if="!order.products?.length">
              No product details available.
            </p>
          </div>

          <!-- Status and Actions -->
          <div class="order-bottom">
            <div class="order-status-group">
              <label :for="`status-${order.id}`">
                Order Status
              </label>

              <select
                :id="`status-${order.id}`"
                :value="statuses.includes(order.status) ? order.status : 'Pending'"
                @change="updateStatus(order, $event.target.value)"
                class="order-status"
              >
                <option
                  v-for="status in statuses"
                  :key="status"
                  :value="status"
                >
                  {{ status }}
                </option>
              </select>
            </div>

            <button
              type="button"
              class="admin-delete"
              @click="deleteOrder(order.id)"
            >
              Delete Order
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
```