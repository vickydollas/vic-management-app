<script setup>
import { defineProps, computed } from "vue"

const props = defineProps({
  details: String,
  numbering: Number,
  icon: String,
  percentage: Number
})
const percentageState = computed(() => {
  if (props.percentage <= 5 ){
    return{ backgroundColor: '#2C1B21', color: '#f45b69'}
  }
})
</script>

<template>
  <div class="container">
    <div class="div1">
        <i class="pi" :class="`${props.icon}`"></i>
        <h3>{{ props.details }}</h3>
    </div>  
    <div class="div2">
        <p class="txt1">{{ props.numbering }}</p>
        <p class="txt2" :style="percentageState">{{ props.percentage }} %</p>
    </div>
    <p class="txt3">Update: November 21, 2025</p>
  </div>
</template>
<style scoped>
.container{
  border: 1px solid var(--border-color);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  width: 100%;
}
.div1{
  display: flex;
  padding: 20px 0px 0 20px;
}
.div1 h3{
  color: var(--text-color);
  align-content: center;
  padding: 0 0 0 10px;
  font-family: "roboto", sans-serif;
  font-weight: 300;
  font-size: 15px;
}
.pi{
  border: 1px solid var(--icon-color);
  padding: 10px;
  border-radius: 10px;
  color: #7152F3;
  background-color: var(--icon-bg);
  font-size: 25px;
}
/* second div styling */
.div2{
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}
.txt1{
  font-family: "roboto", sans-serif;
  font-size: 25px;
  font-weight: 700;
  color: var(--text-color);
}
.txt2{
  background-color: var(--percent-bg);
  color: var(--percent-color);
  padding: 10px 25px;
  border-radius: 10px;
}
.txt3{
  padding: 10px 0 10px 10px;
  color: var(--text-color);
  font-family: "roboto", sans-serif;
  font-size: 15px;
  font-weight: 100;
  border-top: 3px solid var(--border-top);
}
</style>