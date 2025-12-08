<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  name: String,
  designation: String,
  type: String,
  time: String,
  status: Boolean,
  image: String,
  truth: String
})
const onTimeFunc = computed(() => {
  if (props.truth === 'Late'){
    return{ backgroundColor: '#321F30', color: '#F45558'}
  }
})
</script>

<template>
  <div class="container">
    <div class="txt1">
      <img :src="image" alt="">
      <p>{{ props.name }}</p>
    </div>
    <p class="txt2">{{ props.designation }}</p>
    <p class="txt3">{{ props.type }}</p>
    <p class="txt4">{{ props.time }}</p>
    <button class="txt5" ><i class="txt6" :style="onTimeFunc">{{ props.truth }}</i></button>
  </div>
</template>
<style scoped>
.container{
  display: flex;
  /* width: 100%; */
  /* margin: 10px 0 0 0; */
}
.container p{
  color: #ffffff;
  font-size: 18px;
  font-family: "roboto", sans-serif;
  font-weight: 300;
  align-self: center;
}
.txt1{
  display: flex;
  padding: 0;
  margin: 0;
  flex: 0 0 30%;
  
}
.txt1 p{
  align-self: center;
  padding-left: 10px;
}
.txt1 img{ width: 40px; border-radius: 50px; display: block;}
.txt2{ flex: 0 0 23%;}
.txt3{ flex: 0 0 11%;}
.txt4{ flex: 0 0 16.5%;}
.txt5{ flex: 20%;
  background-color: inherit;
  /* color: #3FA558; */
  border-radius: 10px;
  border: none !important;
  /* width: 10px !important; */
}
.txt6{
  display: inline-block;
  justify-items: left;
  background-color: #1F2A33;
  color: #3FA558;
  padding: 15px 30px;
  border-radius: 10px;
  /* margin: 0 100px 0 0; */
}
</style>