<script setup>
import 'primeicons/primeicons.css'
import { RouterView } from 'vue-router'
// import SideBar from "./components/SideBar.vue";
</script>

<template>
<div>
  <RouterView />
</div>
</template>

<style>
*{
  padding: 0;
  margin: 0;
}
#app {
  /* padding: 0; */
  color: #2c3e50;
  /* background-color: #16151C; */
}

/* nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
