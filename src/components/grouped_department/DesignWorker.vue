<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted, computed, defineProps } from 'vue'
import axios from 'axios'
import GroupDetail from './GroupDetail.vue'

const props = defineProps({
  department: {
    type: String,
    required: true
  }
})
const jobs = ref([])
const limitNumber = ref(5)
const updateLimit = computed(() => {
  return limitNumber.value
})
onMounted(async() => {
    try {
        const response = await axios.get('/jobs2.json')
        jobs.value = response.data
        const well = jobs.value
        console.log(well)
    } catch (error) {
        console.log(error, "error here")
    }
})
const targetDepartment = ref(props.department)
const marketingEmployees = computed(() => {
    if (!jobs.value || jobs.value.length === 0) {
    return [];
  }
    return jobs.value.filter(employee => {
        return employee.department === targetDepartment.value
    })
})
</script>
<template>
  <div class="container">
    <div class="container1">
      <div class="div1">
        <i class="pi pi-search"></i>
        <input type="text" placeholder="Search..." />
      </div>
      <div class="div2">
        <div class="sub1">
          <i
            class="pi pi-plus-circle"
            style="color: #ddd; font-size: 17px; margin-right: 10px"
          ></i>
          <router-link to="/">Add New Employee</router-link>
        </div>
        <div class="sub2">
          <i
            class="pi pi-list"
            style="font-size: 13px; margin-right: 10px"
          ></i>
          <span>Filter</span>
        </div>
      </div>
    </div>
    <div class="container2">
      <div class="div3">
        <h2 class="txt1">Employee ID</h2>
        <h2 class="txt2">Employee Name</h2>
        <!-- <h2 class="txt3">Department</h2> -->
        <h2 class="txt4">Designation</h2>
        <h2 class="txt5">Type</h2>
        <h2 class="txt6">Status</h2>
        <h2 class="txt7">Action</h2>
      </div>
      <div class="div4">
        <GroupDetail class="listings" v-for="employee in marketingEmployees.slice(0, updateLimit)" :key="employee.id" :job="employee" />
      </div>
    </div>
    <div class="container3">
      <div>
        <label>Showing</label>
        <select name="" v-model="limitNumber" id="">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  border: 1px solid var(--border-color);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin: 0 15px 0 0;
}
.container1 {
  display: flex;
  justify-content: space-between;
  margin: 30px 15px 0 10px;
}
.div1 {
  position: relative;
  z-index: 0 !important;
}
input[type="text"] {
  background-color: inherit;
  border: 1px solid var(--border-color);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  padding-left: 25px;
  width: 290px;
  height: 5.2vh;
  border-radius: 8px;
}
.pi-search {
  position: absolute;
  color: var(--text-color);
  top: 11px;
  left: 5px;
}.pi-list { color: var(--text-color);}
.div2 {
  display: flex;
}
.sub1 {
  background-color: #5b41cc;
  border-radius: 8px;
  width: 200px;
  height: 6.3vh;
  align-content: center;
  font-family: "roboto", sans-serif;
  font-size: 17px;
  padding: 0 0 0 10px;
  margin-right: 20px;
}
.sub1 a {
  text-decoration: none;
  color: var(--text-color);
}
.sub2 {
  border: 1px solid var(--border-color);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  width: 100px;
  align-content: center;
  border-radius: 8px;
  padding: 0 0 0 10px;
}
.sub2 span {
  font-style: normal;
  color: var(--text-color);
}
.container2 {
  margin: 30px 15px 0 15px;
}
.div3 {
  display: flex;
  margin-bottom: 20px;
}
.div3 h2 {
  color: #655b9e;
  font-size: 17px;
  font-family: "roboto", sans-serif;
  font-weight: 300;
}
.txt1 {
  flex: 0 0 12%;
}
.txt2 {
  flex: 0 0 20%;
}
.txt3 {
  flex: 0 0 13%;
}
.txt4 {
  flex: 0 0 22%;
}
.txt5 {
  flex: 0 0 11%;
}
.txt6 {
  flex: 0 0 14%;
  /* text-align: center; */
}
.txt7 {
  flex: 0 0 12%;
}
.container3{
    display: flex;
    margin: 30px 0 20px 20px;
}
label{
    color: #879DA8;
    font-family: "roboto", sans-serif;
    font-size: 16px;
    margin: 0 10px 0 0;
}
</style>