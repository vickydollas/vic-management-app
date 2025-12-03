<script setup>
import AttendanceView from "./body/attendance_overview/AttendanceView.vue";
import BodyContentOne from "./body/BodyContentOne.vue";
import FixedHeader from "./body/FixedHeader.vue"
import profile1 from '../assets/profile1.jpg'
</script>

<template>
    <div class="container">
        <div>
            <FixedHeader />
        </div>
        <div class="bodycontentone"><BodyContentOne /></div>
        <div class="attendance"><AttendanceView /></div>
    </div>
</template>
<style scoped>
.profile-wrapper{
    display: flex;
    width: 60%;
    border: 1px solid #ffffff;
    border-radius: 10px;
    align-self: center;
}
.profile-wrapper img{
    padding: 3px 0 3px 3px;
    width: 25%;
    height: 6vh;
    border-radius: 50px;
    align-self: center;
}
.profile-wrapper > div{
    align-self: center;
    margin-left: 8px;
}
.profile-wrapper > div > h3{
    color: #ffffff;
    font-family: "roboto", sans-serif;
    font-size: 17px;
    font-weight: 400;
}
.profile-wrapper > div > p{
    color: #6A717F;
    font-family: "roboto", sans-serif;
    font-size: 12px;
}
.pi-angle-down{
    align-self: center;
    margin-left: 5px;
    font-size: 20px;
    color: #ffffff;
    font-weight: 100;
}
.search-wrapper{
    position: relative;
    display: flex;
    align-self: center;
}
.container{
    padding: 0 0 20px 0;
}
.bodycontentone{
    padding: 95px 0 0 0;
}
.attendance{
    border: 1px solid #323138;
    border-radius: 10px;
    margin: 20px 20px 0px 0;
    /* padding-bottom: 20px; */
}
.headersection1{
    margin: 20px 0 30px 0;
}
.headersection1 h1{
    color: #ffffff;
    font-family: "roboto", sans-serif;
    font-size: 20px;
}
.headersection1 h3{
    color: #6A717F;
    font-weight: 50;
    font-size: 15px;
}
.pi-bell{
    font-size: 20px;
    margin: 0 10px;
    padding: 0 auto;
    color: #ffffff;
    padding: 10px 10px 0px 10px;
    width: 30px;
    height: 4vh;
    background-color: #25232A;
    border: 1px solid #ffffff;
    border-radius: 10px;
    display: block;
    align-self: center;
}
.pi-search{
    font-size: 17px;
    position: absolute;
    top: 10px;
    left: 8px;
    color: #ffffff;
    /* font-weight: 100; */
    /* font-family: "roboto", sans-serif; */
}
.headersection2{
    display: flex;
    align-content: center;
}
input[type="text"]{
    font-size: 15px;
    height: 1vh;
    width: 250px;
    padding: 15px 0px 15px 35px;
    background-color: inherit;
    border: 1px solid #ffffff;
    border-radius: 10px;
}
.txt1{
    height: 2.2vh !important;
}
</style>