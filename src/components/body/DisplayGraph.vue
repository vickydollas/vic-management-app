<script setup>
import { computed } from "vue";
import { useTheme } from "../../composables/useTheme";

const { isDark } = useTheme();

const series = [
  {
    name: "Attendance",
    data: [30, 40, 50, 60, 70, 30, 55],
  },
];

// chart colours follow the active theme
const options = computed(() => {
  const muted = isDark.value ? "#a6a5b0" : "#605f6b";
  const grid = isDark.value ? "#2a2931" : "#e7e6ee";
  return {
    chart: {
      id: "attendance-overview",
      toolbar: { show: false },
      fontFamily: "Lexend, system-ui, sans-serif",
      foreColor: muted,
      background: "transparent",
      parentHeightOffset: 0,
    },
    theme: { mode: isDark.value ? "dark" : "light" },
    colors: [isDark.value ? "#7c5ff5" : "#7152f3"],
    plotOptions: {
      bar: { borderRadius: 6, borderRadiusApplication: "end", columnWidth: "42%" },
    },
    fill: {
      type: "gradient",
      // accent at the top fading to a lighter violet at the base
      gradient: { type: "vertical", shadeIntensity: 0, gradientToColors: ["#a48bff"], opacityFrom: 1, opacityTo: 0.9, stops: [0, 100] },
    },
    dataLabels: { enabled: false },
    grid: { borderColor: grid, strokeDashArray: 4, padding: { left: 8, right: 8 } },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { labels: { formatter: (v) => `${v}%` } },
    tooltip: { theme: isDark.value ? "dark" : "light", y: { formatter: (v) => `${v}%` } },
    states: { hover: { filter: { type: "darken", value: 0.9 } } },
  };
});
</script>

<template>
  <section class="card">
    <div class="card-header">
      <div>
        <h2 class="card-title">Attendance Overview</h2>
        <p class="card-subtitle">Daily attendance rate this week</p>
      </div>
      <button class="btn btn-outline btn-sm">
        <i class="pi pi-calendar"></i> This Week
      </button>
    </div>
    <div class="chart">
      <apexchart type="bar" height="290" width="100%" :options="options" :series="series" />
    </div>
  </section>
</template>

<style scoped>
.chart {
  padding: 12px 12px 4px;
}
</style>
