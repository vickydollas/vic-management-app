<script setup>
import BodyDetails from "./BodyDetails.vue";
import DisplayCalendar from "./DisplayCalendar.vue";
import DisplayGraph from "./DisplayGraph.vue";

const stats = [
  { icon: "pi-users", details: "Total Employee", numbering: 560, percentage: 16 },
  { icon: "pi-th-large", details: "Total Applicant", numbering: 1060, percentage: 8 },
  { icon: "pi-calendar", details: "Total Attendance", numbering: 420, percentage: 10 },
  { icon: "pi-building-columns", details: "Total Projects", numbering: 600, percentage: 2 },
];
</script>

<template>
  <div class="overview">
    <div class="main-col">
      <div class="stats">
        <BodyDetails v-for="stat in stats" :key="stat.details" v-bind="stat" />
      </div>
      <DisplayGraph />
    </div>
    <DisplayCalendar class="side-col" />
  </div>
</template>

<style scoped>
.overview {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 20px;
  align-items: start;
}
.main-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
}
.stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

@media (max-width: 1280px) {
  .overview {
    grid-template-columns: minmax(0, 1fr);
  }
  .stats {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
@media (max-width: 1100px) {
  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 520px) {
  .stats {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
  }
}
</style>
