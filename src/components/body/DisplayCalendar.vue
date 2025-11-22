<script setup>
import { CalendarComponent as EjsCalendar } from '@syncfusion/ej2-vue-calendars'
</script>

<template>
  <div>
    <div>
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
</style>