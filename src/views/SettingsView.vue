<script setup>
import { useTheme } from '../composables/useTheme'
import SideBar from "../components/SideBar.vue";
import FixedHeader from '../components/body/FixedHeader.vue'
import SettingsDetail from '../components/setting/SettingsDetail.vue'

const { isLight, toggleTheme } = useTheme()
</script>
<template>
    <div class="home" :class="[isLight ? 'dark-theme' : 'light-theme']">
        <div class="home-sidebar">
            <SideBar @toggle-theme="toggleTheme" :isDark="isLight" />
        </div>
        <div class="main-content">
            <FixedHeader name="Candidates" greeting="All Candidate Record" />
        </div>
        <div class=" candidate">
            <SettingsDetail />
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
  margin:0 15px 0 280px;
}
.candidate{
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

  .candidate {
    margin: 0 15px;
    padding: 20px 0;
  }
}
</style>