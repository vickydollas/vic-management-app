<script setup>
import AttendanceView from "./body/attendance_overview/AttendanceView.vue";
import BodyContentOne from "./body/BodyContentOne.vue";
</script>

<template>
    <div class="container">
        <div class="headersection">
            <div class="headersection1">
                <h1>Hello Victor 👋</h1>
                <h3>Good morning</h3>
            </div>
            <div class="headersection2">
                <input type="text" placeholder="Search">
                <i class="pi pi-bell"></i>
                <input type="text" class="txt1">
            </div>
        </div>
        <div class="bodycontentone"><BodyContentOne /></div>
        <div class="attendance"><AttendanceView /></div>
    </div>
</template>
<style scoped>
.container{
    padding: 0 0 30px 0;
}
.bodycontentone{
    padding: 120px 0 0 0;
}
.attendance{
    border: 1px solid #323138;
    border-radius: 10px;
    margin: 20px 20px 0px 0;
    /* padding-bottom: 20px; */
}
.headersection{
    position: fixed;
    display: flex;
    justify-content: space-between;
    background-color: #16151C;
    /* margin: 0 0 80px 0; */
    /* border: 3px solid #ddd; */
    width: 80%;
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
.pi{
    font-size: 20px;
    margin: 5px 10px 0 10px;
    padding: 0 auto;
    color: #ffffff;
    padding: 10px 0px 0px 10px;
    width: 30px;
    height: 4vh;
    background-color: #25232A;
    border: 1px solid #ffffff;
    border-radius: 10px;
    /* display: block; */
    /* align-content: center; */
}
.headersection2{
    /* margin-right: 20px; */
    align-content: center;
    padding-left: 100px;
}
input[type="text"]{
    font-size: 15px;
    height: 1vh;
    width: 250px;
    padding: 15px 10px;
    background-color: inherit;
    border: 1px solid #ffffff;
    border-radius: 10px;
}
.txt1{
    height: 2.2vh !important;
}
/* input[type="text"].search-input{
    background-image: url('../');
} */
</style>