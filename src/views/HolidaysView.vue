<script setup>
import SideBar from "../components/SideBar.vue";
import FixedHeader from '../components/body/FixedHeader.vue'
import HolidaysRecord from "../components/holidays/HolidaysRecord.vue";
</script>
<template>
    <div class="home">
        <div class="home-sidebar">
            <SideBar />
        </div>
        <div class="main-content">
            <FixedHeader name="Holidays" greeting="Company Holidays" />
        </div>
        <div class="main-content holidays">
            <HolidaysRecord />
        </div>
    </div>
</template>
<style scoped>
.home{
  background-color: #16151C;
  min-height: 100vh;
  /* padding-bottom: 20px; */
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
  margin:0 15px 0 280px;
}
.holidays{
    padding: 100px 0 20px 0;
}
</style>