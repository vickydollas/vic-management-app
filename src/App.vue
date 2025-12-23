<script setup>
import 'primeicons/primeicons.css'
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterView } from 'vue-router'
// import SideBar from "./components/SideBar.vue";

const verify = ref(false)
const getWidth = () => {
  const minWidth = 768
  verify.value = window.innerWidth < minWidth || screen.width < minWidth
}

onMounted(() => {
  getWidth()
  document.addEventListener('resize', getWidth)
})
onUnmounted(() => {
  getWidth()
  document.removeEventListener('resize', getWidth)
})
</script>

<template>
<div v-if="verify" class="mobile-overlay">
  Try on Desktop
</div>
<div v-else>
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
 .mobile-overlay {
  position: fixed;
  inset: 0;
  background: #111;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  z-index: 9999;
 }
</style>
