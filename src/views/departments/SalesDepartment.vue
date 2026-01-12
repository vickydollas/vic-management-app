<script setup>
import { useTheme } from '../../composables/useTheme.js'
import SideBar from "../../components/SideBar.vue";
import FixedHeader from '../../components/body/FixedHeader.vue'
import DesignWorker from '../../components/grouped_department/DesignWorker.vue'

const { isLight, toggleTheme } = useTheme()
</script>
<template>
    <div class="home" :class="[isLight ? 'dark-theme' : 'light-theme']">
        <div class="home-sidebar">
            <SideBar @toggle-theme="toggleTheme" :isDark="isLight" />
        </div>
        <div class="main-content">
            <FixedHeader name="All Departments" greeting="All Departments > Sales Department" />
        </div>
        <div class="main-content department-record">
            <DesignWorker department="Sales" />
        </div>
    </div>
</template>
<style scoped>
.home{
  background-color: var(--bg-color);
  min-height: 100vh;
  /* padding-bottom: 20px; */
}
.home-sidebar{
  /* display: none; */
  margin: 10px 0 0 15px;
  border-radius: 10px;
  width: 250px;
  position: fixed;
  background-color: var(--bg-color);
  height: 100vh;
  z-index: 10000;
}
.main-content{
  margin-left: 280px;
  /* width: calc(100% - 250px); */
  /* background-color: #1D1C24; */
}
.department-record{
    padding: 100px 0 20px 0;
}
</style>