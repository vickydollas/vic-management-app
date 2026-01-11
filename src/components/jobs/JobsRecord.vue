<script setup>
import axios from 'axios'
import { onMounted, ref, computed } from 'vue'

const results = ref([])
onMounted(async() => {
  try {
    const response = await axios.get('/openings.json')
    results.value = response.data
  } catch (error) {
    console.log(error)
  }
})

const active = ref('active')
const inActive = ref('inactive')
const completd = ref('completed')

const getActiveJobs = computed(() => {
  return results.value.filter(available => {
    return available.status === active.value
  })
})
const getInActiveJobs = computed(() => {
  return results.value.filter(available => {
    return available.status === inActive.value
  })
})
const getCompletedJobs = computed(() => {
  return results.value.filter(available => {
    return available.status === completd.value
  })
})
</script>
<template>
  <div class="jobs-record">
    <div class="jobs-record-1">
      <div class="div1">
        <i class="pi pi-search"></i>
        <input type="text" placeholder="Search..." />
      </div>
      <button>
        <i class="pi pi-plus-circle" ></i>Add New Job
      </button>
    </div>
    <div class="jobs-record-2">
      <div class="div-01">
        <h2><i class="pi pi-circle" style="background-color: #FF304F; color: #FF304F;"></i>Active Jobs</h2>
        <div v-for="available in getActiveJobs" :key="available.id">
          <div class="segment-1">
            <i class="pi pi-briefcase"></i>
            <div>
              <h4>{{ available.title }}</h4>
              <p>Design</p>
            </div>
          </div>
          <div class="segment-2">
            <span>Design</span>
            <span>{{ available.employment_type }}</span>
            <span>{{ available.work_station }}</span>
          </div>
          <div class="segment-3">
            <p><i class="pi pi-map-marker" ></i>{{ available.location }}</p>
            <p>${{available.salary_max }} / Month</p>
          </div>
        </div>
      </div>
      <div class="div-02">
        <h2><i class="pi pi-circle" style="background-color: #D39A07; color: #D39A07;"></i>Inactive Jobs</h2>
        <div v-for="available in getInActiveJobs.slice(0, 3)" :key="available.id">
          <div class="segment-1">
            <i class="pi pi-briefcase"></i>
            <div>
              <h4>{{ available.title }}</h4>
              <p>Design</p>
            </div>
          </div>
          <div class="segment-2">
            <span>Design</span>
            <span>{{ available.employment_type }}</span>
            <span>{{ available.work_station }}</span>
          </div>
          <div class="segment-3">
            <p><i class="pi pi-map-marker" ></i>{{ available.location }}</p>
            <p>${{available.salary_max }} / Month</p>
          </div>
        </div>
      </div>
      <div class="div-03">
        <h2><i class="pi pi-circle" style="background-color: #03A12F; color: #03A12F;"></i>Completed Jobs</h2>
        <div v-for="available in getCompletedJobs" :key="available.id">
          <div class="segment-1">
            <i class="pi pi-briefcase"></i>
            <div>
              <h4>{{ available.title }}</h4>
              <p>Design</p>
            </div>
          </div>
          <div class="segment-2">
            <span>Design</span>
            <span>{{ available.employment_type }}</span>
            <span>{{ available.work_station }}</span>
          </div>
          <div class="segment-3">
            <p><i class="pi pi-map-marker"></i>{{ available.location }}</p>
            <p>${{available.salary_max }} / Month</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.div-01 > div, .div-02 > div, .div-03 > div {
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  margin: 0 10px 20px 10px;
  border-radius: 10px;
}
.div-01 > h2, .div-02 > h2, .div-03 > h2{
  margin: 30px 0px 10px 10px;
}
.jobs-record {
  border: 1px solid var(--border-color);
  /* box-shadow: 0 0 15px rgba(0, 0, 0, 0.2); */
  border-radius: 10px;
  margin: 0 10px 0 0;
  padding: 0 20px;
}
.jobs-record-1 {
  display: flex;
  justify-content: space-between;
  margin: 30px 0 25px 10px;
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
.pi-search { position: absolute; top: 11px; color: var(--text-color); left: 5px; }
button{
  background-color: #5B41CC;
  color: #ffffff;
  padding: 15px 10px;
  border-radius: 8px;
  border: none;
  font-family: "roboto", sans-serif;
  font-size: 15px;
}
.pi-map-marker{ margin: 0 10px 0 0;}
.pi-circle{ font-size: 15px; border-radius: 50px; margin-right: 10px; }
.pi-briefcase{
  background-color: var(--briefcase-bg);
  color: #6A7282;
  padding: 15px;
  border-radius: 10px;
}
.jobs-record-2 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 10px 10px;
}
.div-01, .div-02, .div-03 {
  border: 1px solid var(--border-color);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
.div-01 h2, .div-02 h2, .div-03 h2{
  color: var(--text-color);
  font-family: "roboto", sans-serif;
  font-size: 17px;
}
/* segment 1 design */
.segment-1{
  display: flex;
  align-items: center;
  padding: 10px 0 0 10px;
}
.segment-1 > div > h4{
  color: var(--text-color);
  font-size: 17px;
  font-family: "roboto", sans-serif;
}
.segment-1 > div { margin-left: 10px;}
.segment-1 > div > p{
  color: #9AA1A8;
  font-family: "roboto", sans-serif;
  font-size: 14px;
  font-weight: 300;
}
.segment-2{
  margin: 30px 0 0 0;
  padding: 10px 0 0 10px;
}
span {
  color: var(--text-color);
  font-family: "roboto", sans-serif;
  font-size: 13px;
  font-weight: 200;
  background-color: #7152F3;
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: 6px;
}
/* segment 3 design  */
.segment-3 {
  display: flex;
  justify-content: space-between;
  margin: 20px 0 0 0;
  padding: 10px 10px 10px 10px;
}
.segment-3 > p{ color: var(--text-color); font-family: "roboto", sans-serif; font-size: 13px; font-weight: 300;}
</style>