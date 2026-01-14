<script setup>
import axios from "axios";
import { ref, onMounted, computed } from 'vue'

const searchQuery = ref('')
const options = ref(10)
const employee = ref([])
const isLoading = ref(false)
const error = ref(null)

const getEmployee = async () => {
    isLoading.value = true
    error.value = null
    try {
        const response = await axios.get('/candidate.json')
        if(!response){
            throw new Error(`Couldn't fetch link ${response.status}`);
        }
        employee.value = response.data
    } catch (err) {
        console.error('404 error', err)
        error.value('Could not Fetc data')
    } finally{
        isLoading.value = false
    }
}
onMounted(() => {
    getEmployee()
})
const getSearch = computed(() => {
    if (!searchQuery.value) {
        return employee.value
    }
    return employee.value.filter(result => {
        const search = searchQuery.value.toLowerCase()
        return result.name?.toLowerCase().includes(search)
    })
})
const statusUpdate = (status) => {
    if(status === 'Rejected'){
        return {
            backgroundColor: 'var(--rejected-bg)',
            color: 'var(--rejected-color)'
        }
    }
    else if (status === 'In Progress') {
        return {
            backgroundColor: 'var(--pending-bg)',
            color: 'var(--pending-color)'
        }
    }
}
</script>
<template>
  <div class="candidate-record">
    <div class="candidate-record-1">
      <i class="pi pi-search" ></i>
      <input type="text" v-model="searchQuery" placeholder="Search..." />
    </div>
    <div class="candidate-record-2">
        <div class="record-1">
            <input class="candidate-1" type="checkbox">
            <h2 class="candidate-2">Candidate Name</h2>
            <h2 class="candidate-3">Applied For</h2>
            <h2 class="candidate-4">Applied Date</h2>
            <h2 class="candidate-5">Email Address</h2>
            <h2 class="candidate-6">Mobile Number</h2>
            <h2 class="candidate-7">Status</h2>
        </div>
        <div class="record-2" v-for="employees in getSearch.slice(0, options)" :key="employees.id">
            <input class="candidate-1" type="checkbox">
            <h2 class="candidate-2"><img :src="`${employees.imagePath}`" alt="">{{ employees.name }}</h2>
            <h2 class="candidate-3">{{ employees.position_applied }}</h2>
            <h2 class="candidate-4">{{ employees.application_date }}</h2>
            <h2 class="candidate-5">{{ employees.email }}</h2>
            <h2 class="candidate-6">{{ employees.phone_number }}</h2>
            <h6 class="candidate-7 status" :style="statusUpdate(employees.status)">{{ employees.status }}</h6>
        </div>
        <div class="record-3">
            <label for="" style="color: #A2A1A8; margin-right: 20px;">Showing</label>
            <select name="" id="" v-model="options">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
            </select>
        </div>
    </div>
  </div>
</template>
<style scoped>
.status{
    background-color: var(--percent-bg);
    color: var(--percent-color);
    padding: 7px 10px;
    border-radius: 10px;
    font-size: 10px;
}
.candidate-record{
    border: 1px solid var(--border-color);
    padding: 0 20px;
    margin: 0 10px 0 0;
    border-radius: 10px;
}
.candidate-record-1 {
  position: relative;
  z-index: 0 !important;
  margin: 30px 0 10px 0;
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
.pi-search { position: absolute; top: 11px; left: 5px; color: var(--text-color);}
.record-1, .record-2{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #323138;
}
.record-1 h2, .record-2 h2{
    padding: 12px 0;
    font-size: 17px;
    font-family: "roboto", sans-serif;
    color: #A2A1A8;
    font-weight: 300;
}
.record-2 h6{
    font-family: "roboto", sans-serif;
    font-weight: 300;
}
.record-2 h2 { color: var(--text-color) !important; font-size: 15px;}
.record-2 img{
    width: 15%;
    border-radius: 50px;
    margin-right: 10px;
}
.candidate-1{ flex: 0 0 6%;}
.candidate-2{ flex: 0 0 18%; display: flex; align-items: center;}
.candidate-3{ flex: 0 0 18%;}
.candidate-4{ flex: 0 0 12%;}
.candidate-5{ flex: 0 0 20%;}
.candidate-6{ flex: 0 0 15%;}
/* .candidate-7{ flex: 0 0 10%;} */
.record-3{
  margin: 10px 20px;
}
</style>