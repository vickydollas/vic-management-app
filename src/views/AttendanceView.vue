<script setup>
import SideBar from "../components/SideBar.vue";
import FixedHeader from '../components/body/FixedHeader.vue'
import AttendanceRecord from "../components/attendance/AttendanceRecord.vue";
import { onMounted, ref } from "vue";

const isLight = ref(false)
const toggleTheme = () => {
  isLight.value = !isLight.value
  if (isLight.value) {
    localStorage.setItem('theme', 'light')
  } else {
    localStorage.setItem('theme', 'dark')
  }
}
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'light') {
    isLight.value = true
  }
})
</script>
<template>
    <div class="home" :class="[isLight ? 'dark-theme' : 'light-theme']">
        <div class="home-sidebar">
            <SideBar @toggle-theme="toggleTheme" :isDark="isLight" />
        </div>
        <div class="main-content">
            <FixedHeader name="Attendance" greeting="All Employee Attendance" />
        </div>
        <div class="attendance-record">
            <AttendanceRecord />
        </div>
    </div>
</template>
<style scoped>
.home{
  background-color: var(--bg-color);
  min-height: 100vh;
}
.home-sidebar{
  /* display: none; */
  margin: 10px 0 0 15px;
  border-radius: 10px;
  /* width: 250px; */
  position: fixed;
  background-color: var(--sidebar-bg);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  height: 100vh;
  z-index: 10000;
}
.main-content{
  margin:0 15px 0 280px;
}
.attendance-record{
    padding: 100px 0 20px 0;
    margin:0 15px 0 280px;
}
@media screen and (max-width: 768px) {
  .home-sidebar {
    position: static;
    width: 100%;
    height: auto;
    margin: 80px 0 0 0;
    overflow: scroll;
  }

  .main-content {
    position: absolute;
    top: 0;
    margin: 0;
    width: 100%;
    padding: 0 10px;
  }

  .attendance-record {
    margin: 0 15px;
    padding: 20px 0;
  }
}
</style>