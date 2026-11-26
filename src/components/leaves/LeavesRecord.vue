<script setup>
import axios from "axios";
import { ref, computed, onMounted } from "vue";

const isLoading = ref(false);
const error = ref(null);
const notification = ref([]);
const order = ref("newest");

const getNotification = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await axios.get("/notification.json");
    notification.value = response.data;
  } catch (err) {
    console.error("404 error", err);
    error.value = "Could not fetch data";
  } finally {
    isLoading.value = false;
  }
};
onMounted(getNotification);

// the file is already newest-first
const sorted = computed(() =>
  order.value === "newest" ? notification.value : [...notification.value].reverse()
);
</script>

<template>
  <section class="card">
    <div class="card-header">
      <div>
        <h2 class="card-title">Notifications</h2>
        <p class="card-subtitle">Leave requests and updates</p>
      </div>
      <select class="select select-sm" v-model="order" aria-label="Sort notifications">
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>

    <ul class="list">
      <li v-for="item in sorted" :key="item.id" class="item">
        <img class="avatar avatar-lg" :src="item.imagePath" alt="" />
        <div class="body">
          <p class="title">{{ item.message }}</p>
          <p class="content">{{ item.content }}</p>
        </div>
        <span class="time">{{ item.timestamp }}</span>
      </li>
      <li v-if="error" class="empty-state"><i class="pi pi-exclamation-triangle"></i>{{ error }}</li>
      <li v-else-if="!isLoading && sorted.length === 0" class="empty-state">
        <i class="pi pi-bell"></i>You're all caught up
      </li>
    </ul>
  </section>
</template>

<style scoped>
.list {
  list-style: none;
}
.item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-top: 1px solid var(--border);
  transition: background-color 0.12s ease;
}
.item:first-child {
  border-top: none;
}
.item:hover {
  background: var(--surface-2);
}
.body {
  flex: 1;
  min-width: 0;
}
.title {
  font-weight: 500;
  color: var(--text);
}
.content {
  font-size: var(--fs-sm);
  color: var(--text-muted);
}
.time {
  flex-shrink: 0;
  font-size: var(--fs-xs);
  color: var(--text-subtle);
  white-space: nowrap;
}
@media (max-width: 560px) {
  .item {
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 14px 16px;
  }
  .time {
    width: 100%;
    padding-left: 58px;
  }
}
</style>
