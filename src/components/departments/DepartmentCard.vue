<script setup>
import { RouterLink } from "vue-router";
import DepartmentFetch from "./DepartmentFetch.vue";
</script>
<template>
  <div class="department-card">
    <div class="department-card-1">
      <div class="card-1">
        <h3>Design Department</h3>
        <p>12 Members</p>
      </div>
      <router-link to="/about">View All</router-link>
    </div>
    <div class="department-card-2">
      <DepartmentFetch />
      <DepartmentFetch />
      <DepartmentFetch />
      <DepartmentFetch />
      <DepartmentFetch />
    </div>
  </div>
</template>
<style scoped>
.department-card {
  border: 1px solid #323138;
  margin: 30px 10px 0 10px;
  border-radius: 8px;
}
.department-card-1 {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #323138;
  margin: 10px 15px;
  padding: 10px 0px;
}
.department-card-1 a{
    text-decoration: none;
    color: #6E52EC;
    font-size: 17px;
    font-family: "roboto", sans-serif;
}
.card-1 h3 { color: #ddd;    font-size: 20px;    font-family: "roboto", sans-serif;}
.card-1 p{ color: #A2A1A8; font-size: 14px; margin: 5px 0 0 0;}
.department-card-2{
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: space-between; */
    /* margin: 0 20px 20px 20px; */
}
</style>