<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
    <div class="sidebar">
        <h1 class="header"><i class="pi pi-bitcoin"></i>SLOTS</h1>
        <div class="container2">
            <router-link to="/about"><i class="pi pi-th-large"></i>Dashboard</router-link>
            <router-link to="/about"><i class="pi pi-users"></i>All Employees</router-link>
            <router-link to="/about"><i class="pi pi-microsoft"></i>All Departments</router-link>
            <router-link to="/about"><i class="pi pi-calendar-clock"></i>Attendance</router-link>
            <router-link to="/about"><i class="pi pi-dollar"></i>Payroll</router-link>
            <router-link to="/about"><i class="pi pi-briefcase"></i>Jobs</router-link>
            <router-link to="/about"><i class="pi pi-user"></i>Candidate</router-link>
            <router-link to="/about"><i class="pi pi-calendar-plus"></i>Leaves</router-link>
            <router-link to="/about"><i class="pi pi-calendar"></i>Holidays</router-link>
            <router-link to="/about"><i class="pi pi-cog"></i>Settings</router-link>
        </div>
    </div>
</template>
<style scoped>
.container2{
    margin: 0 0 0 30px;
}
a{
    text-decoration: none;
    color: #ffffff;
    display: block;
    /* background-color: red; */
    padding: 10px 0;
    margin: 10px 20px 0 0;
    font-size: 18px;
    /* width: 100%; */
    /* border-color: #ffffff;
    border-width: 2px; */
    /* margin: 20px; */
}
.header{
    margin: 30px 30px 0 30px;
    font-size: 25px;
}
.pi{
    text-align: center;
    padding-right: 20px;
}
</style>