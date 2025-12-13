<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const isActive = (routePath) => {
    return route.path === routePath
}
</script>
<template>
    <div class="sidebar">
        <h1 class="header"><i class="pi pi-bitcoin"></i>SLOTS</h1>
        <div class="container2">
            <router-link :class="[isActive('/') ? 'bg-active' : 'bg-not']" to="/"><i class="pi pi-th-large"></i>Dashboard</router-link>
            <router-link :class="[isActive('/employee') ? 'bg-active' : 'bg-not']" to="/employee"><i class="pi pi-users"></i>All Employees</router-link>
            <router-link :class="[isActive('/department') ? 'bg-active' : 'bg-not']" to="/department"><i class="pi pi-microsoft"></i>All Departments</router-link>
            <router-link :class="[isActive('/attendance') ? 'bg-active' : 'bg-not']" to="/attendance"><i class="pi pi-calendar-clock"></i>Attendance</router-link>
            <router-link :class="[isActive('/payroll') ? 'bg-active' : 'bg-not']" to="/payroll"><i class="pi pi-dollar"></i>Payroll</router-link>
            <router-link to="/about"><i class="pi pi-briefcase"></i>Jobs</router-link>
            <router-link to="/about"><i class="pi pi-user"></i>Candidate</router-link>
            <router-link to="/about"><i class="pi pi-calendar-plus"></i>Leaves</router-link>
            <router-link to="/about"><i class="pi pi-calendar"></i>Holidays</router-link>
            <router-link to="/about"><i class="pi pi-cog"></i>Settings</router-link>
        </div>
    </div>
</template>
<style scoped>
.bg-active {
  background-color: #ffffff;
  color: #374151;
  border-radius: 6px;
  border-left: 4px solid #7152F3;
}
.container2{
    margin: 0 0 0 30px;
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
.header{
    margin: 20px 30px 20px 30px;
    /* font-size: 25px; */
    color: #ffffff;
}
.pi{
    text-align: center;
    font-size: 18px;
    padding-right: 20px;
    padding-left: 5px;
}
.pi-bitcoin{
    font-size: 30px;
    /* padding: 0; */
}
</style>