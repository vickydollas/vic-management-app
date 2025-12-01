<script setup>
import BodyDetails from "./BodyDetails.vue";
import DisplayCalendar from "./DisplayCalendar.vue"
import DisplayGraph from "./DisplayGraph.vue"
</script>

<template>
  <div class="home">
    <div class="div1"><BodyDetails :icon="'pi-users'" details="Total Employee" numbering="560" percentage="16%" /></div>
    <div class="div2"><BodyDetails :icon="'pi-th-large'" details="Total Applicant" numbering="1060" percentage="8%" /></div>
    <div class="div3"><BodyDetails :icon="'pi-calendar'" details="Total Attendance" numbering="420" percentage="10%" /></div>
    <div class="div4"><BodyDetails :icon="'pi-building-columns'" details="Total Projects" numbering="600" percentage="2%" /></div>
    <div class="div5"><DisplayGraph /></div>
    <div class="div6"><DisplayCalendar /></div>
  </div>
</template>

<style scoped>
.home{
display: grid;
grid-template-columns: 6.5fr 6.5fr 3fr 1fr 1fr;
grid-column-gap: 20px;
grid-row-gap: 10px;
margin-right: 20px;
}
.div1, .div2, .div3, .div4{

}
.div1 { grid-area: 1 / 1 / 2 / 2; }
.div2 { grid-area: 1 / 2 / 2 / 3; }
.div3 { grid-area: 2 / 1 / 3 / 2; }
.div4 { grid-area: 2 / 2 / 3 / 3; }
.div5 { grid-area: 3 / 1 / 5 / 3; }
.div6 { grid-area: 1 / 3 / 5 / 6; }
</style>