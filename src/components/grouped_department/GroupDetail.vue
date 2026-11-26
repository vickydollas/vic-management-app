<script setup>
import EmployeeDetail from "../employees/EmployeeDetail.vue";

const props = defineProps({
  job: Object,
});
</script>

<template>
  <!-- same row as the employee table, without the department column -->
  <EmployeeDetail :job="props.job" hide-department />
</template>
