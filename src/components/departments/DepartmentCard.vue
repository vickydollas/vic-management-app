<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  path: String,
  department: String,
  segment: String,
  employees: { type: Array, default: () => [] },
  search: { type: String, default: "" },
});

const members = computed(() => props.employees.filter((e) => e.department === props.segment));
const shown = computed(() => {
  const search = props.search.trim().toLowerCase();
  return members.value.filter((e) => e.name?.toLowerCase().includes(search)).slice(0, 5);
});
</script>

<template>
  <section class="card dept">
    <div class="card-header">
      <div>
        <h3 class="card-title">{{ props.department }}</h3>
        <p class="card-subtitle">{{ members.length }} Members</p>
      </div>
      <RouterLink :to="props.path" class="link">View All</RouterLink>
    </div>

    <ul class="members">
      <li v-for="job in shown" :key="job.id">
        <RouterLink :to="props.path" class="member">
          <div class="person">
            <img class="avatar" :src="job.imagePath" alt="" />
            <div class="person-text">
              <p class="person-name">{{ job.name }}</p>
              <p class="person-meta">{{ job.title }}</p>
            </div>
          </div>
          <i class="pi pi-angle-right"></i>
        </RouterLink>
      </li>
      <li v-if="shown.length === 0" class="empty-state">No matching members</li>
    </ul>
  </section>
</template>

<style scoped>
.members {
  list-style: none;
  padding: 8px;
}
.member {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  transition: background-color 0.12s ease;
}
.member:hover {
  background: var(--surface-2);
}
.person-text {
  min-width: 0;
}
.member .pi {
  color: var(--text-subtle);
  font-size: var(--fs-sm);
  transition: transform 0.15s ease, color 0.15s ease;
}
.member:hover .pi {
  color: var(--accent-text);
  transform: translateX(2px);
}
.empty-state {
  padding: 24px;
}
</style>
