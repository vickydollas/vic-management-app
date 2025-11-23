<script setup>
import { ref } from 'vue'

const lineChartSeries = ref([
    {
        name: "sales",
        date: [30, 40, 50, 60, 70]
    }
])

const lineChartOptions = ref({
    xaxis: {
        categories: ["jan", "feb", "mar", "apr", "may", "june", "july"]
    }
})
</script>

<template>
  <div>
    <apexchart 
    type="line"
    :series="lineChartSeries"
    :options="lineChartOptions"
    />
  </div>
</template>