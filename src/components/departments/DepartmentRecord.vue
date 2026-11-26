<script setup>
import { ref, onMounted } from "vue";
import { useEmployeeStore } from "../../stores/employees";
import DepartmentCard from "./DepartmentCard.vue";

const departments = [
  { segment: "Design", path: "/department/design", name: "Design Department" },
  { segment: "Engineering", path: "/department/engineering", name: "Engineering Department" },
  { segment: "Sales", path: "/department/sales", name: "Sales Department" },
  { segment: "Project Management", path: "/department/management", name: "Project Management Department" },
  { segment: "Marketing", path: "/department/marketing", name: "Marketing Department" },
];

// employees come from the shared store (file data + added employees)
const store = useEmployeeStore();
const searchQuery = ref("");
onMounted(() => store.fetchEmployees());
</script>

<template>
  <div class="departments">
    <div class="toolbar card">
      <label class="search">
        <i class="pi pi-search"></i>
        <input class="input" type="text" v-model="searchQuery" placeholder="Search employee..." />
      </label>
    </div>
    <div class="dept-grid">
      <DepartmentCard
        v-for="dept in departments"
        :key="dept.segment"
        :segment="dept.segment"
        :path="dept.path"
        :department="dept.name"
        :employees="store.employees"
        :search="searchQuery"
      />
    </div>
  </div>
</template>

<style scoped>
.departments {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.dept-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}
@media (max-width: 900px) {
  .dept-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
