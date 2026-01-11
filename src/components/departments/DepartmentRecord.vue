<script setup>
import DepartmentCard from './DepartmentCard.vue'
</script>
<template>
  <div class="department">
    <div class="div1">
      <i class="pi pi-search"></i>
      <input type="text" placeholder="Search..." />
    </div>
    <div class="div2">
        <DepartmentCard segment="Design" path="/department/design" department="Design Department" />
        <DepartmentCard segment="Engineering" path="/department/engineering" department="Engineering Department" />
        <DepartmentCard segment="Sales" path="/department/sales" department="Sales Department" />
        <DepartmentCard segment="Project Management" path="/department/management" department="Project management Department" />
        <DepartmentCard segment="Marketing" path="/department/marketing" department="Marketing Department" />
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
    border: 1px solid var(--border-color);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
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
</style>