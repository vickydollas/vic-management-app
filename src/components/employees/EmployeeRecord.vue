<script setup>
import { ref, onMounted, computed, nextTick } from "vue";
import { useEmployeeStore } from "../../stores/employees";
import EmployeeDetail from "./EmployeeDetail.vue";
import EmployeeDialogs from "./EmployeeDialogs.vue";

const store = useEmployeeStore();
const searchQuery = ref("");
const limitNumber = ref(5);
const dialogs = ref(null);
const highlightId = ref(null);

onMounted(() => store.fetchEmployees());

const getSearch = computed(() => {
  const search = searchQuery.value.trim().toLowerCase();
  if (!search) return store.employees;
  return store.employees.filter(
    (job) =>
      job.name?.toLowerCase().includes(search) ||
      job.department?.toLowerCase().includes(search)
  );
});

// briefly highlight a row (reset first so the animation replays)
async function flash(id) {
  highlightId.value = null;
  await nextTick();
  highlightId.value = id;
}

// new employees go to the top of the list: clear the search so they're visible
function onCreated(employee) {
  searchQuery.value = "";
  flash(employee.id);
}
</script>

<template>
  <section class="card">
    <div class="toolbar">
      <label class="search">
        <i class="pi pi-search"></i>
        <input class="input" type="text" v-model="searchQuery" placeholder="Search name or department..." />
      </label>
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
            <th>Department</th>
            <th>Designation</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <EmployeeDetail
            v-for="job in getSearch.slice(0, limitNumber)"
            :key="job.id"
            :job="job"
            :highlight="job.id === highlightId"
            :can-delete="store.isAdded(job.id)"
            @view="dialogs.openView($event)"
            @edit="dialogs.openEdit($event)"
            @delete="dialogs.askDelete($event)"
          />
          <tr v-if="store.isLoading && getSearch.length === 0">
            <td colspan="7" class="empty-state"><i class="pi pi-spin pi-spinner"></i>Loading employees…</td>
          </tr>
          <tr v-else-if="store.error">
            <td colspan="7" class="empty-state"><i class="pi pi-exclamation-triangle"></i>{{ store.error }}</td>
          </tr>
          <tr v-else-if="getSearch.length === 0">
            <td colspan="7" class="empty-state"><i class="pi pi-search"></i>No employees match your search</td>
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
        <span>of {{ getSearch.length }} employees</span>
      </div>
    </div>

    <EmployeeDialogs ref="dialogs" @created="onCreated" @updated="flash($event.id)" />
  </section>
</template>
