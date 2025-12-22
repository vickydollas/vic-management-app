<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const isActive = (routePath) => {
    return route.path === routePath
}
</script>
<template>
    <div class="sidebar">
        <div class="header"><i class="pi pi-bitcoin"></i><h1>SLOTS</h1></div>
        <div class="container2">
            <router-link :class="[isActive('/') ? 'bg-active' : 'bg-not']" to="/"><i class="pi pi-th-large"></i>Dashboard</router-link>
            <router-link :class="[isActive('/employee') ? 'bg-active' : 'bg-not']" to="/employee"><i class="pi pi-users"></i>All Employees</router-link>
            <router-link :class="[isActive('/department') ? 'bg-active' : 'bg-not']" to="/department"><i class="pi pi-microsoft"></i>All Departments</router-link>
            <router-link :class="[isActive('/attendance') ? 'bg-active' : 'bg-not']" to="/attendance"><i class="pi pi-calendar-clock"></i>Attendance</router-link>
            <router-link :class="[isActive('/payroll') ? 'bg-active' : 'bg-not']" to="/payroll"><i class="pi pi-dollar"></i>Payroll</router-link>
            <router-link :class="[isActive('/jobs') ? 'bg-active' : 'bg-not']" to="/jobs"><i class="pi pi-briefcase"></i>Jobs</router-link>
            <router-link :class="[isActive('/candidate') ? 'bg-active' : 'bg-not']" to="/candidate"><i class="pi pi-user"></i>Candidate</router-link>
            <router-link :class="[isActive('/leaves') ? 'bg-active' : 'bg-not']" to="/leaves"><i class="pi pi-calendar-plus"></i>Leaves</router-link>
            <router-link :class="[isActive('/holiday') ? 'bg-active' : 'bg-not']" to="/holiday"><i class="pi pi-calendar"></i>Holidays</router-link>
            <router-link to="/about"><i class="pi pi-cog"></i>Settings</router-link>
        </div>
    </div>
</template>
<style scoped>
.sidebar{
    max-width: 90%;
    padding: 15px 15px 0 15px;
}
.header{
    /* margin: 20px 30px 20px 30px; */
    display: flex;
    align-items: center;
    font-size: 25px;
    color: #ffffff;
}
.header h1{
    font-size: 23px;
    font-weight: 800;
    font-family: "roboto", sans-serif;
}
.container2{
    /* margin: 0 0 0 30px; */
    /* align-content: center; */
}
a{
    text-decoration: none;
    color: #ffffff;
    display: block;
    font-family: "roboto", sans-serif;
    /* background-color: red; */
    padding: 10px 0;
    margin: 5px 20px 0 0;
    font-size: 16px;
    /* width: 100%; */
    /* border-color: #ffffff;
    border-width: 2px; */
    /* margin: 20px; */
}
.pi{
    text-align: center;
    font-size: 18px;
    padding-right: 20px;
    padding-left: 5px;
}
.pi-bitcoin{
    /* display: block; */
    font-size: 30px;
    /* flex: 0 0 2%; */
    /* padding: 0; */
}
.bg-active {
  background-color: #ffffff;
  color: #374151;
  border-radius: 6px;
  border-left: 4px solid #7152F3;
}
</style>