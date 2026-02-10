<script setup>
import { RouterLink, useRoute } from "vue-router";
import { useAuth } from '../composables/auth'
import { ref } from 'vue'

const auth = useAuth()
const route = useRoute();
const isActive = (routePath) => {
  return route.path === routePath;
};
defineProps({
  isDark: Boolean,
});
const emit = defineEmits(["toggle-theme"]);
const handleToggle = () => {
  emit("toggle-theme");
};
// nav menu 
const navMenu = ref([
  {name: 'Dashboard', path: '/'},
  {name: 'Employee', path: '/employee'},
  {name: 'All Department', path: '/department'},
  {name: 'Attendance', path: '/attendance'},
  {name: 'Payroll', path: '/payroll'},
  {name: 'Jobs', path: '/jobs'},
  {name: 'Candidate', path: '/candidate'},
  {name: 'Leaves', path: '/leaves'},
  {name: 'Holidays', path: '/holiday'},
  {name: 'Settings', path: '/settings'}
])
</script>
<template>
  <div class="sidebar">
    <div class="header">
      <i class="pi pi-bitcoin"></i>
      <h1>SLOTS</h1>
    </div>
    <div class="container2">
      <router-link v-for="item in navMenu" :key="item"  :class="[isActive(item.path) ? 'bg-active' : 'bg-not']" :to="item.path"
        ><i class="pi pi-th-large"></i>{{ item.name }}</router-link
      >
      
    </div>
    <div class="theme-toggle" @click="handleToggle">
      <div class="slider" :class="{ 'is-dark': !isLight }"></div>

      <div class="toggle-option" :class="{ active: isLight }">
        <span class="icon">☀️</span> Light
      </div>

      <div class="toggle-option" :class="{ active: !isLight }">
        <span class="icon">🌙</span> Dark
      </div>
    </div>
  </div>
</template>
<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  max-width: 90%;
  padding: 15px 15px 0 15px;
}
.header {
  margin: 0 0 20px 0;
  display: flex;
  /* flex-direction: colu; */
  align-items: center;
  /* font-size: 25px; */
  color: var(--text-color);
}
.header h1 {
  font-size: var(--fs-xl);
  font-weight: 800;
  font-family: "roboto", sans-serif;
}
.container2 {
  /* margin: 0 0 0 30px; */
  /* align-content: center; */
}
a {
  text-decoration: none;
  color: var(--text-color);
  display: block;
  font-family: "roboto", sans-serif;
  /* background-color: red; */
  padding: 10px 0;
  margin: 5px 20px 0 0;
  font-size: var(--fs-sm);
  /* width: 100%; */
  /* border-color: #ffffff;
    border-width: 2px; */
  /* margin: 20px; */
}
.pi {
  text-align: center;
  font-size: var(--fs-md);
  padding-right: 20px;
  padding-left: 5px;
}
.pi-bitcoin {
  /* display: block; */
  font-size: 30px;
  /* flex: 0 0 2%; */
  /* padding: 0; */
}
.bg-active {
  background-color: var(--sidebar-hover);
  color: #7152f3;
  border-radius: 6px;
  border-left: 4px solid #7152f3;
  font-weight: 600;
  font-family: "roboto", sans-serif;
}

.theme-toggle {
  position: absolute;
  bottom: 50px;
  display: flex;
  width: 200px;
  height: 45px;
  background-color: white;
  border: 1px solid #000;
  border-radius: 10px; /* Rounded corners like your image */
  cursor: pointer;
  overflow: hidden; /* Keeps the slider inside the rounded corners */
}

/* The purple sliding box */
.slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%; /* Covers half the toggle */
  height: 100%;
  background-color: #7b5cfa; /* Purple color */
  transition: transform 0.3s ease; /* Makes it slide smoothly */
  z-index: 1;
}

/* Move the purple box to the right when in Dark mode */
.slider.is-dark {
  transform: translateX(100%);
}

/* Styling the text and icons */
.toggle-option {
  position: relative;
  z-index: 2; /* Keeps text on top of the purple slider */
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
  font-weight: 500;
  transition: color 0.3s;
}

/* Change text color based on which side is active */
.toggle-option.active {
  color: white;
}

.toggle-option:not(.active) {
  color: #000;
}
@media (max-width: 768px) {
  .sidebar {
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: 0%;
    padding: 12px 0;
  }
  .header{ display: none;}
  .pi{ font-size: var(--fs-aaa); display: inline; padding: 0 3px 0 0; margin: 0 2px 0 0;}
  .container2{
    display: flex;
  }
  a {
  text-decoration: none;
  color: var(--text-color);
  display: block;
  font-family: "roboto", sans-serif;
  /* background-color: red; */
  padding: 5px 5px 0 5px;
  margin: 0;
  font-size: var(--fs-aaa);
  /* width: 100%; */
  /* border-color: #ffffff;
    border-width: 2px; */
  /* margin: 20px; */
}
.theme-toggle {
  position: relative;
  bottom: 50px;
  display: none;
  width: 150px;
  height: 25px;
}
}
</style>