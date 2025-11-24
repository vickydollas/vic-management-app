<script setup>
import { CalendarComponent as EjsCalendar } from '@syncfusion/ej2-vue-calendars'
</script>

<template>
  <div class="container">
    <div class="div1">
        <h4>My Schedule</h4>
        <i class="pi pi-calendar"></i>
    </div>
    <div><EjsCalendar></EjsCalendar></div>
    <div>
        
    </div>
  </div>
</template>
<style scoped>
@import "~@syncfusion/ej2-base/styles/material.css";
@import "~@syncfusion/ej2-buttons/styles/material.css";
@import "~@syncfusion/ej2-vue-calendars/styles/material.css";
.wrapper {
  max-width: 250px;
  margin: 0 auto;
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
.pi{
  font-size: 28px;
  color: #7152F3;
  background-color: #201B32;
  padding: 15px;
  border-radius: 10px;
}
</style>