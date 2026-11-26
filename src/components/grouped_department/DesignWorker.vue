<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted, computed, nextTick } from "vue";
import { useEmployeeStore } from "../../stores/employees";
import GroupDetail from "./GroupDetail.vue";
import EmployeeDialogs from "../employees/EmployeeDialogs.vue";

// generic "employees in one department" table
const props = defineProps({
  department: {
    type: String,
    required: true,
  },
});

const store = useEmployeeStore();
const searchQuery = ref("");
const limitNumber = ref(5);
const dialogs = ref(null);
const highlightId = ref(null);

onMounted(() => store.fetchEmployees());

const departmentEmployees = computed(() => {
  const search = searchQuery.value.trim().toLowerCase();
  return store.employees.filter(
    (employee) =>
      employee.department === props.department &&
      employee.name?.toLowerCase().includes(search)
  );
});

// briefly highlight a row (reset first so the animation replays)
async function flash(id) {
  highlightId.value = null;
  await nextTick();
  highlightId.value = id;
}

function onCreated(employee) {
  searchQuery.value = "";
  flash(employee.id);
}
</script>

<template>
  <section class="card">
    <div class="toolbar">
      <div class="toolbar-actions">
        <RouterLink to="/department" class="btn-icon" aria-label="Back to departments">
          <i class="pi pi-arrow-left"></i>
        </RouterLink>
        <label class="search">
          <i class="pi pi-search"></i>
          <input class="input" type="text" v-model="searchQuery" placeholder="Search employee..." />
        </label>
      </div>
      <div class="toolbar-actions">
        <button class="btn btn-primary" @click="dialogs.openAdd()">
          <i class="pi pi-plus"></i> Add New Employee
        </button>
        <button class="btn btn-outline"><i class="pi pi-sliders-h"></i> Filter</button>
      </div>
    </div>

    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Designation</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <GroupDetail
            v-for="employee in departmentEmployees.slice(0, limitNumber)"
            :key="employee.id"
            :job="employee"
            :highlight="employee.id === highlightId"
            :can-delete="store.isAdded(employee.id)"
            @view="dialogs.openView($event)"
            @edit="dialogs.openEdit($event)"
            @delete="dialogs.askDelete($event)"
          />
          <tr v-if="store.isLoading && departmentEmployees.length === 0">
            <td colspan="6" class="empty-state"><i class="pi pi-spin pi-spinner"></i>Loading employees…</td>
          </tr>
          <tr v-else-if="departmentEmployees.length === 0">
            <td colspan="6" class="empty-state"><i class="pi pi-users"></i>No employees found</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card-footer">
      <div class="pager">
        <span>Showing</span>
        <select class="select select-sm" v-model.number="limitNumber">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="15">15</option>
        </select>
        <span>of {{ departmentEmployees.length }} employees</span>
      </div>
    </div>

    <EmployeeDialogs
      ref="dialogs"
      :default-department="props.department"
      @created="onCreated"
      @updated="flash($event.id)"
    />
  </section>
</template>

<style scoped>
.toolbar-actions .search {
  width: 300px;
}
@media (max-width: 640px) {
  .toolbar-actions .search {
    width: auto;
    flex: 1;
  }
  .toolbar > .toolbar-actions:first-child {
    width: 100%;
  }
}
</style>
