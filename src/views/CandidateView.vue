<script setup>
import SideBar from "../components/SideBar.vue";
import FixedHeader from '../components/body/FixedHeader.vue'
import CandidateRecord from "../components/candidate/CandidateRecord.vue";
</script>
<template>
    <div class="home">
        <div class="home-sidebar">
            <SideBar />
        </div>
        <div class="main-content">
            <FixedHeader name="Candidates" greeting="All Candidate Record" />
        </div>
        <div class="main-content candidate">
            <CandidateRecord />
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
  margin-left: 280px;
  /* width: calc(100% - 250px); */
  /* background-color: #1D1C24; */
}
.candidate{
    padding: 100px 0 20px 0;
}
</style>