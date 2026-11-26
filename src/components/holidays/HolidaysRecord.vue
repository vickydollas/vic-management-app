<script setup>
import axios from "axios";
import { ref, computed, onMounted } from "vue";

const isLoading = ref(false);
const error = ref(null);
const holiday = ref([]);
const searchQuery = ref("");

const getHoliday = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await axios.get("/holidays.json");
    holiday.value = response.data;
  } catch (err) {
    console.error(err);
    error.value = "Could not load holidays";
  } finally {
    isLoading.value = false;
  }
};
onMounted(getHoliday);

const filtered = computed(() => {
  const search = searchQuery.value.trim().toLowerCase();
  if (!search) return holiday.value;
  return holiday.value.filter((h) => h.holiday_name?.toLowerCase().includes(search));
});

// status "true" = upcoming holiday
const isUpcoming = (h) => h.status === "true";
</script>

<template>
  <section class="card">
    <div class="toolbar">
      <label class="search">
        <i class="pi pi-search"></i>
        <input class="input" type="text" v-model="searchQuery" placeholder="Search holiday..." />
      </label>
      <button class="btn btn-primary"><i class="pi pi-plus"></i> Add New Holiday</button>
    </div>

    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Day</th>
            <th>Holiday Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="h in filtered" :key="h.id" :class="{ past: !isUpcoming(h) }">
            <td>
              <span class="date" :class="{ upcoming: isUpcoming(h) }">{{ h.date }}</span>
            </td>
            <td class="muted">{{ h.day_of_week }}</td>
            <td>{{ h.holiday_name }}</td>
            <td>
              <span class="badge" :class="isUpcoming(h) ? 'badge-accent' : ''">
                {{ isUpcoming(h) ? "Upcoming" : "Past" }}
              </span>
            </td>
          </tr>
          <tr v-if="error">
            <td colspan="4" class="empty-state"><i class="pi pi-exclamation-triangle"></i>{{ error }}</td>
          </tr>
          <tr v-else-if="!isLoading && filtered.length === 0">
            <td colspan="4" class="empty-state"><i class="pi pi-search"></i>No holidays match your search</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card-footer">
      <div class="legend">
        <span><i class="dot upcoming-dot"></i> Upcoming</span>
        <span><i class="dot past-dot"></i> Past Holidays</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.date {
  display: inline-block;
  padding-left: 12px;
  border-left: 3px solid var(--border-strong);
}
.date.upcoming {
  border-left-color: var(--accent);
  font-weight: 500;
}
tr.past td {
  color: var(--text-muted);
}
.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-size: var(--fs-sm);
  color: var(--text-muted);
}
.legend span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.upcoming-dot {
  color: var(--accent);
}
.past-dot {
  color: var(--border-strong);
}
</style>
