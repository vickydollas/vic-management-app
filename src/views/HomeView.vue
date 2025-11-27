<script setup>
import SideBar from "../components/SideBar.vue";
import HeaderSection from "../components/HeaderSection.vue"
</script>

<template>
  <div class="home">
    <div class="home-sidebar">
      <SideBar />
    </div>
    <div class="main-content">
      <div class="header-section">
        <HeaderSection />
      </div>
    </div>
  </div>
</template>

<style scoped>
.home{
  background-color: #16151C;
}
.home-sidebar{
  /* display: none; */
  margin: 10px 0 0 15px;
  border-radius: 10px;
  width: 250px;
  position: fixed;
  background-color: #1D1C24;
  height: 100vh;
  z-index: 10000;
}
.main-content{
  margin-left: 280px;
  /* width: calc(100% - 250px); */
  
}
</style>