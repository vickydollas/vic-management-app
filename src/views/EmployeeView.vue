<script setup>
import FixedHeader from '../components/body/FixedHeader.vue'
import SideBar from '../components/SideBar.vue'
import EmployeeRecord from '../components/employees/EmployeeRecord.vue'
import { onMounted, ref } from 'vue'

const isLight = ref(false)
const toggleTheme = () => {
  isLight.value = !isLight.value

  if (isLight.value) {
    localStorage.setItem('theme', 'light')
  }else{
    localStorage.setItem('theme', 'dark')
  }
}
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  // const previousTheme = window.matchMedia('(prefers-color-scheme: light)')
  if (savedTheme === 'light') {
    isLight.value = true
  }
})
</script>
<template>
    <div class="home" :class="[isLight ? 'dark-theme' : 'light-theme']">
        <div class="home-sidebar"><SideBar @toggle-theme="toggleTheme" :isDark="isLight" /></div>
        <div class="main-content"><FixedHeader name="Employees" greeting="All Employee" /></div>
        <div class="main-content employee-record"><EmployeeRecord /></div>
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
  width: 250px;
  position: fixed;
  background-color: var(--sidebar-bg);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  height: 100vh;
  z-index: 10000;
}
.main-content{
  margin:0 15px 0 280px;
  /* min-height: 10vh; */
  /* width: calc(100% - 250px); */
  /* background-color: #1D1C24; */
}
.employee-record{
    padding: 100px 0 20px 0;
}
</style>