<script setup>
import { onMounted, ref, computed } from "vue";
import { useEmployeeStore } from "../../stores/employees";
import AttendanceCard from "./AttendanceCard.vue";

const props = defineProps({
  // show the "Attendance Overview" title row (dashboard)
  showDiv: {
    type: Boolean,
    default: true,
  },
  // show the "Showing [n] of N" footer
  shuffle: {
    type: Boolean,
    default: true,
  },
  // search text from the parent
  received: {
    type: String,
    default: "",
  },
});

const limitNumber = ref(10);
const store = useEmployeeStore();
onMounted(() => store.fetchEmployees());

const getSearch = computed(() => {
  const search = props.received.trim().toLowerCase();
  if (!search) return store.employees;
  return store.employees.filter((result) => result.name?.toLowerCase().includes(search));
});
</script>

<template>
  <div>
    <div class="card-header" v-if="props.showDiv">
      <div>
        <h2 class="card-title">Attendance Overview</h2>
        <p class="card-subtitle">Today's check-ins</p>
      </div>
      <router-link to="/attendance" class="btn btn-outline btn-sm">View All</router-link>
    </div>

    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Designation</th>
            <th>Type</th>
            <th>Check-In Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <AttendanceCard
            v-for="datas in getSearch.slice(0, limitNumber)"
            :key="datas.id"
            :data="datas"
          />
          <tr v-if="getSearch.length === 0">
            <td colspan="5" class="empty-state"><i class="pi pi-search"></i>No employees match your search</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card-footer" v-if="props.shuffle">
      <div class="pager">
        <span>Showing</span>
        <select class="select select-sm" v-model.number="limitNumber">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="15">15</option>
        </select>
        <span>of {{ getSearch.length }} records</span>
      </div>
    </div>
  </div>
</template>
