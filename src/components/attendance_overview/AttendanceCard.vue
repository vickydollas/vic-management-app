<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  data: Object,
});
const onTimeFunc = computed(() => {
  if (props.data.truth === "Late") {
    console.log("truth")
    return { backgroundColor: "var(--puntual-bg)", color: "var(--puntual-color)" };
  }
});
</script>

<template>
  <div class="attendance-card">
    <div class="txt1-1">
      <img :src="`${props.data.imagePath}`" alt="" />
      <p>{{ props.data.name }}</p>
    </div>
    <p class="txt2-2">{{ props.data.title }}</p>
    <p class="txt3-3">{{ props.data.type }}</p>
    <p class="txt4-4">{{ props.data.time }}</p>
    <i class="txt6-6" :style="onTimeFunc">{{ props.data.truth }}</i>
  </div>
</template>
<style scoped>
.attendance-card {
  border-top: 1px solid #323138;
  display: flex;
  margin: 0px 30px;
  padding: 15px 0;
}
.attendance-card p {
  color: var(--text-color);
  font-size: var(--fs-v);
  font-family: "roboto", sans-serif;
  font-weight: 300;
  align-self: center;
}
.txt1-1 {
  display: flex;
  /* padding: 0; */
  /* margin: 0; */
  flex: 0 0 30%;
}
.txt1-1 p {
  align-self: center;
  padding-left: 10px;
}
.txt1-1 img {
  width: 40px;
  border-radius: 50px;
  display: block;
}
.txt2-2 {
  flex: 0 0 23%;
}
.txt3-3 {
  flex: 0 0 11%;
}
.txt4-4 {
  flex: 0 0 16.5%;
}
.txt5-5 {
  flex: 20%;
  background-color: inherit;
  align-content: center;
  /* color: #3FA558; */
  border-radius: 10px;
  border: none !important;
  /* width: 10px !important; */
}
.txt6-6 {
  display: inline;
  justify-items: left;
  background-color: var(--percent-bg);
  color: var(--percent-color);
  padding: 10px 20px;
  border-radius: 8px;
  font-style: normal;
  font-size: var(--fs-sm);
  font-family: "roboto", sans-serif;
}
@media (max-width: 768px) {
  .attendance-card p{
  font-size: var(--fs-aaa);
  }
  .txt2-2, .txt3-3, .txt6-6{
    display: inline-block;
    margin: 10px 10px 0 0;
  }
  .txt6-6 { padding: 5px 8px; border-radius: 4px; font-size: var(--fs-aaa);}
  .txt1-1 img {
  width: 15%;
  height: 2vh;
}
}
</style>