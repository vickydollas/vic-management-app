<script setup>
import { defineProps } from 'vue'

defineProps({
  name: String,
  designation: String,
  type: String,
  time: String,
  status: Boolean,
  image: String
})
</script>

<template>
  <div class="container">
    <div class="txt1">
      <img :src="image" alt="">
      <p>{{ name }}</p>
    </div>
    <p class="txt2">{{ designation }}</p>
    <p class="txt3">{{ type }}</p>
    <p class="txt4">{{ time }}</p>
    <button class="txt5">On Time</button>
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
  background-color: #1F2A33;
  color: #3FA558;
  border-radius: 10px;
  border: none !important;
  width: 20px !important;
}
</style>