<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const salary = ref([])
const options = ref(5)
onMounted(async() => {
  try {
    const response = await axios.get('/jobs2.json')
    salary.value = response.data
  } catch (error) {
    console.log(error)
  }
})
const buttonKey = (status) => {
  if (status === "Pending"){
    return {
      backgroundColor: '#312927',
      color: '#EFBE12'
    }
  }
}
</script>
<template>
  <div class="payroll">
    <div class="payroll-1">
      <div>
        <i class="pi pi-search" style="color: #ffffff"></i>
        <input type="text" placeholder="Search..." />
      </div>
      <button class="btn-1"><i class="pi pi-file-export" style="color: #ffffff, padding-right: 10px"></i>Export</button>
    </div>
    <div class="payroll-2">
      <div class="div3">
        <h2 class="txt1">Employee Name</h2>
        <h2 class="txt2">CTC</h2>
        <h2 class="txt3">Salary Per Month</h2>
        <h2 class="txt4">Deduction</h2>
        <h2 class="txt5">Status</h2>
      </div>
      <div class="div4" v-for="salaries in salary.slice(0, options)" :key="salaries.id">
        <div class="txt1 adjust"><img :src="`${salaries.imagePath}`" alt=""><h2>{{ salaries.name }}</h2></div>
        <h2 class="txt2">{{ salaries.salary.perYear }}</h2>
        <h2 class="txt3">{{ salaries.salary.amount }}</h2>
        <h2 class="txt4">{{ salaries.salary.deduction }}</h2>
        <h2 class="txt5"><button class="button" :style="buttonKey(salaries.salary.transaction)">{{ salaries.salary.transaction }}</button></h2>
      </div>
    </div>
    <div class="payroll-3">
      <label for="" style="color: #A2A1A8; margin-right: 20px;">Showing</label>
      <select name="" id="" v-model="options">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
    </div>
  </div>
</template>
<style scoped>
.button{
  background-color: #1F2A33;
  border: none;
  border-radius: 10px;
  color: #3DBD87;
  padding: 12px 20px;
  z-index: 1;
}
.btn-1{
  background-color: #5B41CC;
  border: none;
  padding: 5px 20px;
  font-size: 17px;
  color: #ffffff;
  /* margin: 0 10px 0 0; */
  border-radius: 10px;
}
.payroll {
  padding: 0;
  margin: 0 20px 0 0;
  border: 1px solid #323138;
  border-radius: 10px;
}
.payroll-1 {
  margin: 10px 10px 0 10px;
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 0 !important;
}
input[type="text"] {
  background-color: inherit;
  border: 1px solid #ffffff;
  padding-left: 25px;
  width: 290px;
  height: 5.2vh;
  border-radius: 8px;
}
.pi-search {
  position: absolute;
  top: 11px;
  left: 5px;
}
.div3 { display: flex; border-bottom: 1px solid #ffffff; padding-bottom: 20px; }
.div4 { display: flex; border-bottom: 1px solid #323138; }
.div4 img{
  width: 13%;
  height: 6vh;
  border-radius: 50px;
  margin-right: 10px;
}
.div4 div{
  display: flex;
}
.div3 h2 {
  color: #A2A1A8;
  font-size: 17px;
  font-family: "roboto", sans-serif;
  font-weight: 300;
}
.payroll-2{
  margin: 30px 15px 0 15px;
}
.txt1{
  flex: 0 0 30%;
} .adjust{
  align-items: center;
}
.txt2{
  flex: 0 0 20%;
}
.txt3{
  flex: 0 0 15%;
}
.txt4{
  flex: 0 0 15%;
}
.txt5{
  flex: 0 0 20%;
}
.div4 h2, .adjust{
  color: #ffffff;
  font-size: 17px;
  font-family: "roboto", sans-serif;
  font-weight: 400;
  padding: 12px 0;
}
.payroll-3{
  margin: 10px 20px;
}
</style>