<script setup>
import { ref } from 'vue'
const widthNo = ref()

const series = ref([
    {
        name: "sales",
        data: [30, 40, 50, 60, 70, 30, 55]
    }
])

const options = ref({
    chart: {
      id: 'vuechart-example'
    },
    xaxis: {
      categories: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"]
    }
})
</script>

<template>
  <div id="appl" class="container">
    <div class="div1">
      <h2>Attendance Overview</h2>
      <button>Today</button>
    </div>
    <div class="div2"><apexchart width="400" type="bar" :options="options" :series="series" /></div>
  </div>
</template>
<style scoped>
.container{
  border: 1px solid var(--border-color);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin-top: 10px;
}
.div2{
  justify-self: center;
}
.div1{ display: flex; justify-content: space-between; margin: 30px;}
.div1 h2{
  color: var(--text-color);
  font-family: "roboto", sans-serif;
  font-weight: 700;
  font-size: var(--fs-lg);
}
.div1 button{
  padding: 10px 25px;
  color: var(--text-color);
  background-color: inherit;
  border: 1px solid #323138;
  border-radius: 10px;
  font-family: "roboto", sans-serif;
  font-size: 15px;
}
@media screen and (max-width: 768px) {
  
}
</style>