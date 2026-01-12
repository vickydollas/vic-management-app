<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import EmployeeDetail from "./EmployeeDetail.vue";

const jobs = ref([])
const searchQuery = ref('')
const limitNumber = ref(5)
const updateLimit = computed(() => {
  return limitNumber.value
})
onMounted(async() => {
    try {
        const response = await axios.get('/jobs2.json')
        jobs.value = response.data
        const well = jobs.value
        // console.log(well.department)
    } catch (error) {
        // console.log(error, "error here")
    }
})
const getSearch = computed(() => {
  if (!searchQuery.value) {
    return jobs.value
  }
  return jobs.value.filter(job => {
    const search = searchQuery.value.toLowerCase()
    return job.name?.toLowerCase().includes(search) || job.department?.toLowerCase().includes(search)
  })
})
// console.log('happy')
</script>
<template>
  <div class="container">
    <div class="container1">
      <div class="div1">
        <i class="pi pi-search"></i>
        <input type="text" v-model="searchQuery" placeholder="Search..." />
      </div>
      <div class="div2">
        <div class="sub1">
          <i
            class="pi pi-plus-circle"
            style="color: #ddd; margin-right: 10px"
          ></i>
          <router-link to="/">Add New Employee</router-link>
        </div>
        <div class="sub2">
          <i
            class="pi pi-list"
            style="color: var(--text-color);font-size: var(--fs-xs); margin-right: 10px"
          ></i>
          <span>Filter</span>
        </div>
      </div>
    </div>
    <div class="container2">
      <div class="div3">
        <h2 class="txt1">Employee ID</h2>
        <h2 class="txt2">Employee Name</h2>
        <h2 class="txt3">Department</h2>
        <h2 class="txt4">Designation</h2>
        <h2 class="txt5">Type</h2>
        <h2 class="txt6">Status</h2>
        <h2 class="txt7">Action</h2>
      </div>
      <div class="div4">
        <EmployeeDetail class="listings" v-for="job in getSearch.slice(0, updateLimit)" :key="job.id" :job="job" />
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
  color: var(--text-color);
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
}
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
  color: white;
  font-size: var(--fs-v);
}
.sub2 {
  border: 1px solid #323138;
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
  font-size: var(--fs-v);
  font-family: "roboto", sans-serif;
  font-weight: 50;
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
  flex: 0 0 20%;
}
.txt5 {
  flex: 0 0 10%;
}
.txt6 {
  flex: 0 0 12%;
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