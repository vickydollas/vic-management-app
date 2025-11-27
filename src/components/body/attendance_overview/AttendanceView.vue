<script setup>
import AttendanceCard from './AttendanceCard.vue'
</script>

<template>
    <div class="container">
        <div class="div1">
            <h2>Attendance Overview</h2>
            <router-link>View</router-link>
        </div>
        <div class="div2">
            <h1 class="txt1">Employee Name</h1>
            <h1 class="txt2">Designation</h1>
            <h1 class="txt3">Type</h1>
            <h1 class="txt4">Check-In-Time</h1>
            <h1 class="txt5">Status</h1>
        </div>
    </div>
    <div class="div3">
        <AttendanceCard />
        <AttendanceCard />
        <AttendanceCard />
        <AttendanceCard />
        <AttendanceCard />
        <AttendanceCard />
        <AttendanceCard />
        <AttendanceCard />
    </div>
</template>
<style scoped>
.container{
    margin: 30px 30px;
}
.div1{
    display: flex;
    justify-content: space-between;
}
.div1 a{
    text-decoration: none;
    padding: 10px 20px;
    color: #ffffff;
    background-color: inherit;
    border: 1px solid #323138;
    border-radius: 10px;
}
.div1 h2{
    color: #ffffff;
    font-family: "roboto", sans-serif;
    font-size: 25px;
    font-weight: 400;
    /* margin: 10px 0 0 10px; */
}
.div2{
    display: flex;
    width: 100%;
    margin: 10px 0 0 0;
}
.div2 h1{
    color: #ffffff;
    font-size: 17px;
    font-family: "roboto", sans-serif;
    font-weight: 100;
}
.txt1{ flex: 0 0 30%;}
.txt2{ flex-grow: 2;}
.txt3{ flex-grow: 1;}
.txt4{ flex-grow: 1;}
.txt5{ flex-grow: 2;}
</style>