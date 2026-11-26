<script setup>
import { computed } from "vue";

const props = defineProps({
  details: String,
  numbering: Number,
  icon: String,
  percentage: Number,
});

// a low growth figure is flagged red, anything else green
const isLow = computed(() => props.percentage <= 5);
const formatted = computed(() => props.numbering?.toLocaleString());
</script>

<template>
  <article class="stat card">
    <div class="stat-head">
      <span class="icon-tile"><i class="pi" :class="props.icon"></i></span>
      <h3>{{ props.details }}</h3>
    </div>
    <div class="stat-body">
      <p class="value">{{ formatted }}</p>
      <span class="badge" :class="isLow ? 'badge-danger' : 'badge-success'">
        <i class="pi" :class="isLow ? 'pi-arrow-down-right' : 'pi-arrow-up-right'"></i>
        {{ props.percentage }}%
      </span>
    </div>
    <p class="updated">Update: November 21, 2025</p>
  </article>
</template>

<style scoped>
.stat {
  display: flex;
  flex-direction: column;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.stat:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.stat-head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 20px 0;
}
.stat-head h3 {
  font-size: var(--fs-base);
  font-weight: 400;
  color: var(--text-muted);
}
.stat-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 14px 20px 18px;
}
.value {
  font-size: var(--fs-2xl);
  font-weight: 600;
  line-height: 1;
  color: var(--text);
}
.badge .pi {
  font-size: 0.65rem;
}
.updated {
  margin-top: auto;
  padding: 12px 20px;
  border-top: 1px solid var(--border);
  font-size: var(--fs-xs);
  color: var(--text-subtle);
}
</style>
