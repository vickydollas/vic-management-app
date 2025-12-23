<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const isLoading = ref(false)
const error = ref(null)
const holiday = ref([])

const getHoliday = async () => {
    isLoading.value = true
    error.value = null
    try {
        const response = await axios.get('/holidays.json')
        if (!response) {
            throw new Error("Link Error");
        }
        holiday.value = response.data
    } catch (error) {
        console.error('error loading', error)
        error.value = 'loading failed'
    }finally {
        isLoading.value = false
    }
}
onMounted(() => {
    getHoliday()
})
const isActive = (status) => {
    // if (status === 'true') {
    //     return {
    //         borderLeft: '5px solid #7152F3'
    //     }
    // }
    if (status === 'true') {
        return false
    }
    return true
}
</script>
<template>
  <div class="holidays-record border border-width border-[#323138] rounded-[7px] px-3 py-4">
    <div class="div1 flex justify-between ">
      <div class="search-1">
        <i class="pi pi-search" style="color: #ffffff"></i>
        <input type="text" placeholder="Search..." />
      </div>
      <button class="rounded-[8px] bg-[#7152F3] text-white text-[16px] border-none py-4 px-5"><i class="pi text-[15px] mr-2 pi-plus-circle" style="color: #ffffff"></i>Add New Holiday</button>
    </div>
    <div class="div2 mt-5 ">
        <div class="flex border-b border-[#323138] py-2">
            <h3 class="txt1">Date</h3>
            <h3 class="txt2">Day</h3>
            <h3 class="txt3">Holiday Name</h3>
        </div>
        <div class="flex border-b border-[#323138] " v-for="holidays in holiday" :key="holidays.id">
            <p class="txt1-1 py-3 pl-2 my-3 " :class="[isActive(holidays.status) ? 'bg-active' : 'bg-not']">{{ holidays.date }}</p>
            <p class="txt2 py-3 my-3">{{ holidays.day_of_week }}</p>
            <p class="txt3 py-3 my-3">{{ holidays.holiday_name }}</p>
        </div>
    </div>
  </div>
</template>
<style scoped>
.search-1 {
  position: relative;
  z-index: 0 !important;
}
.pi-search {
  position: absolute;
  top: 11px;
  left: 5px;
}
input[type="text"] {
  background-color: inherit;
  border: 1px solid #ffffff;
  padding-left: 25px;
  width: 290px;
  height: 5.2vh;
  border-radius: 8px;
}
button{
    font-family: "roboto", sans-serif;
    cursor: pointer;
}
.txt1{
    flex: 0 0 20%;
}
.bg-not{
    border-left: 5px solid #322F37;
}
.bg-active{
    border-left: 5px solid #7152F3;
}
.txt1-1{
    flex: 0 0 20%;
    /* border-left: 5px solid #322F37; */
}
.txt2{
    flex: 0 0 15%;
}
.txt3{
    flex: 0 0 35%;
}
h3{
    color: #A2A1A8;
    font-family: "roboto", sans-serif;
}
p{
    color: #ffffff;
    font-family: "roboto", sans-serif;
}
</style>