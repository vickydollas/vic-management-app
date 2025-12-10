<script setup>
import AttendanceList from "./attendance_overview/AttendanceList.vue";
import BodyContentOne from "./body/BodyContentOne.vue";
import FixedHeader from "./body/FixedHeader.vue"
import profile1 from '../assets/profile1.jpg'
</script>

<template>
    <div class="container">
        <div>
            <FixedHeader name="Hello Victor" greeting="Good Morning" />
        </div>
        <div class="bodycontentone"><BodyContentOne /></div>
        <div class="attendance"><AttendanceList :shuffle="false" /></div>
    </div>
</template>
<style scoped>

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
</style>