<script setup>
import SideBar from "../components/SideBar.vue";
import FixedHeader from '../components/body/FixedHeader.vue'
import PayrollRecord from "../components/payroll/PayrollRecord.vue";
</script>
<template>
    <div class="home">
        <div class="home-sidebar">
            <SideBar />
        </div>
        <div class="main-content">
            <FixedHeader name="Payroll" greeting="All Employee Record" />
        </div>
        <div class="main-content payroll-record">
            <PayrollRecord />
            <!-- <h1>halleluyah</h1> -->
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
.payroll-record{
    padding: 100px 0 20px 0;
}
</style>