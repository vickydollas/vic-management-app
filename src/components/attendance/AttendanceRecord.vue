<script setup>
import { ref } from 'vue'
import AttendanceList from "../attendance_overview/AttendanceList.vue";
const searching = ref('')
</script>
<template>
  <div class="department">
    <div class="div1">
      <i class="pi pi-search"></i>
      <input type="text" v-model="searching" placeholder="Search..." />
    </div>
    <div>
      <AttendanceList :received="searching" :showDiv="false"/>
    </div>
  </div>
</template>
<style scoped>
.department {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding-bottom: 25px;
}
.div1 {
  position: relative;
  z-index: 0 !important;
  margin: 20px 0 0 10px;
}
input[type="text"] {
  background-color: inherit;
  border: 1px solid var(--border-color);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  color: var(--text-color);
  padding-left: 25px;
  width: 290px;
  height: 5.2vh;
  border-radius: 8px;
}
.pi-search {
  position: absolute;
  color: var(--text-color);
  top: 11px;
  left: 5px;
}
</style>