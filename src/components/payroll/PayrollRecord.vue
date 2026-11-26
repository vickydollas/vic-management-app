<script setup>
import { computed, onMounted, ref } from "vue";
import { useEmployeeStore } from "../../stores/employees";

const store = useEmployeeStore();
const searchQuery = ref("");
const options = ref(5);

onMounted(() => store.fetchEmployees());

const getSearch = computed(() => {
  const search = searchQuery.value.trim().toLowerCase();
  if (!search) return store.employees;
  return store.employees.filter((result) => result.name?.toLowerCase().includes(search));
});

const statusClass = (status) => {
  if (status === "Completed") return "badge-success";
  if (status === "Pending") return "badge-warning";
  return "";
};
</script>

<template>
  <section class="card">
    <div class="toolbar">
      <label class="search">
        <i class="pi pi-search"></i>
        <input class="input" type="text" v-model="searchQuery" placeholder="Search employee..." />
      </label>
      <button class="btn btn-primary"><i class="pi pi-download"></i> Export</button>
    </div>

    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>CTC</th>
            <th>Salary Per Month</th>
            <th>Deduction</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in getSearch.slice(0, options)" :key="item.id">
            <td>
              <div class="person">
                <img class="avatar" :src="item.imagePath" alt="" />
                <span class="person-name">{{ item.name }}</span>
              </div>
            </td>
            <td>{{ item.salary?.perYear }}</td>
            <td>{{ item.salary?.amount }}</td>
            <td class="muted">{{ item.salary?.deduction }}</td>
            <td>
              <span class="badge" :class="statusClass(item.salary?.transaction)">
                {{ item.salary?.transaction || "—" }}
              </span>
            </td>
          </tr>
          <tr v-if="getSearch.length === 0">
            <td colspan="5" class="empty-state"><i class="pi pi-search"></i>No employees match your search</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card-footer">
      <div class="pager">
        <span>Showing</span>
        <select class="select select-sm" v-model.number="options">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="15">15</option>
        </select>
        <span>of {{ getSearch.length }} records</span>
      </div>
    </div>
  </section>
</template>
