<script setup>
import { RouterLink } from "vue-router";
import EmployeeDetail from './EmployeeDetail.vue'
import profile3 from '../../assets/profile3.png'
import profile1 from '../../assets/profile1.jpg'
import profile2 from '../../assets/profile2.jpg'
import profile4 from '../../assets/profile4.png'
import profile5 from '../../assets/profile5.jpg'
import profile6 from '../../assets/profile6.jpg'
import profile7 from '../../assets/profile7.jpg'
</script>
<template>
  <div class="container">
    <div class="container1">
      <div class="div1">
        <i class="pi pi-search" style="color: #ffffff; "></i>
        <input type="text" placeholder="Search..." />
      </div>
      <div class="div2">
        <div class="sub1">
            <i class="pi pi-plus-circle" style="color: #ddd; font-size:17px; margin-right: 10px;"></i>
            <router-link to="/">Add New Employee</router-link>
        </div>
        <div class="sub2">
            <i class="pi pi-list" style="color: #ddd; font-size: 13px; margin-right: 10px;"></i>
            <span>Filter</span>
        </div>
      </div>
    </div>
    <div class="container2">
      <div class="div3">
        <h2 class="txt1">Employee ID</h2>
        <h2 class="txt2">Employee Name</h2>
        <h2 class="txt3">Department</h2>
        <h2 class="txt4">Designation</h2>
        <h2 class="txt5">Type</h2>
        <h2 class="txt6">Status</h2>
        <h2 class="txt7">Action</h2>
      </div>
      <div class="div4">
        <EmployeeDetail idNum="65743214" :src="profile5" name="Victor john" department="Manager" designation="HR Manager" type="Hybrid" status="Permanent"/>
        <EmployeeDetail idNum="74925462" :src="profile6" name="Innoocent Joy" department="Sales" designation="Sales Rep" type="Office" status="Contract"/>
        <EmployeeDetail idNum="12085832" :src="profile7" name="Sccot parker" department="Design" designation="Product Manager" type="Hybrid" status="Permanent"/>
        <EmployeeDetail idNum="55739856" :src="profile4" name="Kai hatverz" department="Design" designation="UI/UX designer" type="Office" status="Permanent"/>
        <EmployeeDetail idNum="00963417" :src="profile3" name="Gabriel Jesus" department="Design" designation="Front End Developer" type="Hybird" status="Permanent"/>
        <EmployeeDetail idNum="22885563" :src="profile2" name="Mikel Johnsom" department="Design" designation="Backend Dev" type="Hybrid" status="Permanent"/>
        <EmployeeDetail idNum="00667564" :src="profile7" name="Ben White" department="Design" designation="Full Stack Dev" type="Hybrid" status="Permanent"/>
        <EmployeeDetail idNum="33445198" :src="profile6" name="Lewis Skelly" department="security" designation="Cyber security" type="Hybrid" status="Permanent"/>
        <EmployeeDetail idNum="11220076" :src="profile5" name="Bukayo Saka" department="Design" designation="Asst product Manager" type="Remote" status="Contract"/>
        <EmployeeDetail idNum="65836451" :src="profile1" name="John Stones" department="Design" designation="Asst Backend" type="Remote" status="Contract"/>
        <EmployeeDetail idNum="09123109" :src="profile2" name="Jude Bellingham" department="Design" designation="Asst Fronend Dev" type="Remote" status="Contract"/>
        <EmployeeDetail idNum="12095638" :src="profile3" name="Ruben Dias" department="Customer Care" designation="Front End desk" type="Office" status="Contract"/>
        <!-- <EmployeeDetail idNum="74539123" :src="profile4" name="Areola Dave"/> -->
        <!-- <EmployeeDetail idNum="12098789" :src="profile7" name="Jarrod Bowen"/> -->
        <!-- <EmployeeDetail idNum="09894312" :src="profile6" name="Harry maguire"/> -->
        <!-- <EmployeeDetail idNum="34561209" :src="profile5" name="Recce James"/> -->
        <!-- <EmployeeDetail idNum="90897867" :src="profile4" name="Declan Rice"/> -->
        <!-- <EmployeeDetail idNum="56432321" :src="profile3" name="Martin Zubimendi"/> -->
        <!-- <EmployeeDetail idNum="878653261" :src="profile1" name="Noni Mandueke"/> -->
        <!-- <EmployeeDetail idNum="469263548" :src="profile2" name="Micheal Richard"/> -->
      </div>
    </div>
  </div>
</template>
<style scoped>
.container{
    border: 1px solid #323138;
    border-radius: 10px;
    margin: 0 15px 0 0;
}
.container1{
    display: flex;
    justify-content: space-between;
    margin: 30px 15px 0 10px;
}
.div1{
    position: relative;
}
input[type="text"]{
    background-color: inherit;
    border: 1px solid #ffffff;
    padding-left: 25px;
    width: 290px;
    height: 5.2vh;
    border-radius: 8px;
}
.pi-search{
    position: absolute;
    top: 11px;
    left: 5px;
}
.div2{
    display: flex;
}
.sub1{
    background-color: #5B41CC;
    border-radius: 8px;
    width: 200px;
    height: 6.3vh;
    align-content: center;
    font-family: "roboto", sans-serif;
    font-size: 17px;
    padding: 0 0 0 10px;
    margin-right: 20px;
}
.sub1 a{
    text-decoration: none;
    color: white;
}
.sub2{
    border: 1px solid #323138;
    width: 100px;
    align-content: center;
    border-radius: 8px;
    padding: 0 0 0 10px;
}
.sub2 span{
    font-style: normal;
    color: #ffffff;
}
.container2{
    margin: 30px 15px 0 15px;
}
.div3{
    display: flex;
    margin-bottom: 20px;
}
.div3 h2{
    color: #655B9E;
    font-size: 17px;
    font-family: "roboto", sans-serif;
    font-weight: 300;
}
.txt1{
    flex: 0 0 12%;
}
.txt2{
    flex: 0 0 20%;
}
.txt3{
    flex: 0 0 13%;
}
.txt4{
    flex: 0 0 20%;
}
.txt5{
    flex: 0 0 10%;
}
.txt6{
    flex: 0 0 12%;
    /* text-align: center; */
}
.txt7{
    flex: 0 0 12%;
}
</style>