<script setup>
import { CalendarComponent as EjsCalendar } from '@syncfusion/ej2-vue-calendars'
</script>

<template>
  <div class="container">
    <div class="div1">
        <h4>My Schedule</h4>
        <i class="pi pi-calendar"></i>
    </div>
    <div class="wrap"><EjsCalendar></EjsCalendar></div>
    <div>
      <div class="div3">
        <p>Wednesday, 6TH June 2025</p>
        <i class="pi pi-ellipsis-v"></i>
      </div>
      <div class="div4">
        <p>9:30</p>
        <div>
          <h2>UI/UX Designer</h2>
          <p>Practical Task Review</p>
        </div>
      </div>
      <div class="div4">
        <p>9:30</p>
        <div>
          <h2>UI/UX Designer</h2>
          <p>Practical Task Review</p>
        </div>
      </div>
      <div class="div4">
        <p>9:30</p>
        <div>
          <h2>UI/UX Designer</h2>
          <p>Practical Task Review</p>
        </div>
      </div>
      <div>
      <div class="div3">
        <p>Wednesday, 6TH June 2025</p>
        <i class="pi pi-ellipsis-v"></i>
      </div>
      <div class="div4">
        <p>9:30</p>
        <div>
          <h2>UI/UX Designer</h2>
          <p>Practical Task Review</p>
        </div>
      </div>
      </div>
    </div>
    <div>
      
    </div>
  </div>
</template>
<style scoped>
@import "~@syncfusion/ej2-base/styles/material.css";
@import "~@syncfusion/ej2-buttons/styles/material.css";
@import "~@syncfusion/ej2-vue-calendars/styles/material.css";
.wrap {
 margin: 0px auto;
 width: 240px;
}
.e-calendar{
 /* background-color: #16151C; */
}
.wrap :deep(.e-calendar .e-content .e-cell) {
  /* This targets the individual date cells (td elements) */
  /* color: red; */
}
.container{
  border: 1px solid #323138;
  border-radius: 10px;
  /* justify-content: center; */
}
.div1{
  display: flex;
  justify-content: space-between;
  margin: 10px 20px 20px 20px;
}
.div1 h4{
  font-family: "roboto", sans-serif;
  color: #ffffff;
  font-size: 20px;
  align-self: center;
}
.pi-calendar{
  font-size: 28px;
  color: #7152F3;
  background-color: #201B32;
  padding: 15px;
  border-radius: 10px;
}
/* div 3 styling */
.div3{
  display: flex;
  justify-content: space-between;
  margin: 22px 0 0 17px;
}
.div3 p{
  color: #ffffff;
  font-family: "roboto", sans-serif;
  font-size: 15px;
  align-self: center;
}
.pi-ellipsis-v{
  font-size: 18px;
  color: #ffffff;
  margin-right: 10px;
}
/* div 4 styling  */
.div4{
  display: flex;

  /* justify-content: space; */
  margin: 20px 20px;
}
.div4 div{
  padding-left: 30px;
}
.div4 > p{
  color: #ffffff;
  font-family: "roboto", sans-serif;
  font-size: 18px;
  font-weight: 800;
  padding: 10px 30px 10px 0px;
  border-right: 3px solid #5E45C4;
  align-self: center
}
.div4 > div > h2, .div4 > div > p{
  color: #ffffff;
  font-family: "roboto", sans-serif;
  font-size: 18px;
  font-weight: 200;
}
.div4 > div > h2{ font-weight: 200}
.div4 > div > p{ font-weight: 500}
</style>