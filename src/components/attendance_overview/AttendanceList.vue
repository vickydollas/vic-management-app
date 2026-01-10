<script setup>
import { onMounted, ref, defineProps, computed } from "vue";
import AttendanceCard from "./AttendanceCard.vue";
// import axios from 'axios'

const props = defineProps({
  showDiv: {
    type: Boolean,
    default: true,
  },
  shuffle: {
    type: Boolean,
    default: true
  }
});
const limitNumber = ref(10)
const updateLimit = computed(() => {
    return limitNumber.value
})
const data = ref([]);
onMounted(async () => {
  try {
    const response = await fetch("/jobs2.json");
    if (!response) {
      console.log("Missing link");
    }
    data.value = await response.json();
    const result = data.value;
    console.log(result.name);
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div>
    <div class="container">
      <div class="div1" v-if="props.showDiv">
        <h2>Attendance Overview</h2>
        <router-link>View</router-link>
      </div>
      <div class="div2">
        <h1 class="txt1">Employee Name</h1>
        <h1 class="txt2">Designation</h1>
        <h1 class="txt3">Type</h1>
        <h1 class="txt4">Check-In-Time</h1>
        <h1 class="txt5">Status</h1>
      </div>
    </div>
    <div class="div3">
      <AttendanceCard
        v-for="datas in data.slice(0, updateLimit)"
        :key="datas.id"
        :data="datas"
      />
    </div>
    <div class="div4" v-if="shuffle">
      <label for="">Showing</label>
      <select name="" id="" v-model="limitNumber">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
    </div>
  </div>
</template>
<style scoped>
label{
    margin-right: 10px;
    font-family: "roboto", sans-serif;
    font-weight: 200;
    color: #6A717F;
}
.div4 {
  /* align-self: center; */
  margin: 10px 30px;
}
.container {
  margin: 30px 30px 0 0px;
  /* width: 100%; */
  /* padding: 0 20px 0 0; */
}
.div1 {
  display: flex;
  justify-content: space-between;
  margin: 10px 30px;
}
.div1 a {
  text-decoration: none;
  padding: 10px 20px;
  color: var(--text-color);
  background-color: inherit;
  border: 1px solid #323138;
  border-radius: 10px;
}
.div1 h2 {
  color: var(--text-color);
  font-family: "roboto", sans-serif;
  font-size: 25px;
  font-weight: 400;
  /* margin: 10px 0 0 10px; */
}
.div2 {
  display: flex;
  width: 100%;
  margin: 10px 30px;
}
.div2 h1 {
  color: var(--text-color);
  font-size: 17px;
  font-family: "roboto", sans-serif;
  font-weight: 100;
}
.txt1 {
  flex: 0 0 30%;
}
.txt2 {
  flex-grow: 2;
}
.txt3 {
  flex-grow: 2;
}
.txt4 {
  flex-grow: 1;
}
.txt5 {
  flex-grow: 3;
}
</style>