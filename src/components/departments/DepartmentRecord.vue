<script setup>
import DepartmentCard from './DepartmentCard.vue'
</script>
<template>
  <div class="department">
    <div class="div1">
      <i class="pi pi-search" style="color: #ffffff"></i>
      <input type="text" placeholder="Search..." />
    </div>
    <div class="div2">
        <DepartmentCard />
        <DepartmentCard />
        <DepartmentCard />
        <DepartmentCard />
        <DepartmentCard />
    </div>
  </div>
</template>
<style scoped>
.div2{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}
.department{
    border: 1px solid #323138;
    border-radius: 8px;
    padding-bottom: 25px;
}
.div1 {
  position: relative;
  z-index: 0 !important;
  margin: 20px 0 0 10px;
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
</style>