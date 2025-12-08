<script setup>
import profile1 from '../../../assets/profile1.jpg'
import profile2 from '../../../assets/profile2.jpg'
import profile3 from '../../../assets/profile3.png'
import profile4 from '../../../assets/profile4.png'
import profile5 from '../../../assets/profile5.jpg'
import profile6 from '../../../assets/profile6.jpg'
import profile7 from '../../../assets/profile7.jpg'
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
        <AttendanceCard :image="profile1" truth="On Time" name="Leasie Watson" designation="Team Lead - Design" type="Office" time="9:00 AM" />
        <AttendanceCard :image="profile2" truth="Late" name="Darlene Robertson" designation="Web Designer" type="Remote" time="10:15 AM" />
        <AttendanceCard :image="profile3" truth="On Time" name="John Stones" designation="Medical Assistant" type="Office" time="8:45 AM" />
        <AttendanceCard :image="profile4" truth="On Time" name="Gabreil Jesus" designation="Marketing Coordinator" type="Remote" time="9:30 AM" />
        <AttendanceCard :image="profile5" truth="Late" name="Peter Parker" designation="Technical Director" type="Hybrid" time="10:05 AM" />
        <AttendanceCard :image="profile6" truth="Late" name="Phil Foden" designation="Data analyst" type="Remote" time="7:45 AM" />
        <AttendanceCard :image="profile7" truth="On Time" name="Bukayo Saka" designation="UI/UX design" type="Office" time="11:00 AM" />
        <AttendanceCard :image="profile5" truth="Late" name="Declan Rice" designation="Marketing Consultant" type="Hybrid" time="10:15 AM" />
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