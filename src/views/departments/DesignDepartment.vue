<script setup>
import { useTheme } from '../../composables/useTheme.js'
import SideBar from "../../components/SideBar.vue";
import FixedHeader from '../../components/body/FixedHeader.vue'
import DesignWorker from '../../components/grouped_department/DesignWorker.vue'

const { isLight } = useTheme()
const { toggleTheme } = useTheme()
</script>
<template>
    <div class="home" :class="[isLight ? 'dark-theme' : 'light-theme']">
        <div class="home-sidebar">
            <SideBar @toggle-theme="toggleTheme" :isDark="isLight" />
        </div>
        <div class="main-content">
            <FixedHeader name="Design Departments" greeting="All Departments > Design Department" />
        </div>
        <div class="department-record">
            <DesignWorker department="Design" />
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
  background-color: var(--sidebar-bg);
  height: 100vh;
  z-index: 10000;
}
.main-content{
  margin-left: 280px;
  width: calc(100% - 250px);
  /* background-color: #1D1C24; */
}
.department-record{
  padding: 100px 0 20px 0;
  margin-left: 280px;

}
@media screen and (max-width: 768px) {
  .home-sidebar {
    position: static;
    width: 100%;
    height: auto;
    margin: 70px 0 0 0;
    overflow: scroll;
  }

  .main-content {
    position: absolute;
    top: 0;
    margin: 0;
    width: 100%;
    padding: 0 10px;
  }

  .department-record {
    margin: 0 15px;
    padding: 20px 0;
  }
}
</style>