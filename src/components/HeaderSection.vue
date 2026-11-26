<script setup>
import AttendanceList from "./attendance_overview/AttendanceList.vue";
import BodyContentOne from "./body/BodyContentOne.vue";
</script>

<template>
  <div class="dashboard">
    <BodyContentOne />
    <section class="card">
      <AttendanceList :shuffle="false" />
    </section>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
