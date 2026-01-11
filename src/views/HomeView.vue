<script setup>
import { onMounted, ref } from "vue";
import SideBar from "../components/SideBar.vue";
import HeaderSection from "../components/HeaderSection.vue";

const isLight = ref(false);
const toggleTheme = () => {
  isLight.value = !isLight.value;
  if (isLight.value) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
};
onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  // const previousTheme = window.matchMedia('(prefers-color-scheme: light)').matches
  if (savedTheme === "light") {
    isLight.value = true;
  }
});
</script>

<template>
  <div class="home" :class="[isLight ? 'dark-theme' : 'light-theme']">
    <div class="home-sidebar">
      <SideBar @toggle-theme="toggleTheme" :isDark="isLight"/>
    </div>
    <div class="main-content">
      <HeaderSection />
    </div>
  </div>
</template>

<style scoped>
body {
  padding: 0;
  margin: 0;
}
.home {
  background-color: var(--bg-color);
  min-height: 100vh;
}
.home-sidebar {
  /* display: none; */
  margin: 10px 0 0 15px;
  border-radius: 10px;
  width: 250px;
  position: fixed;
  /* background-color: #1d1c24; */
  background-color: var(--sidebar-bg);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  height: 100vh;
  z-index: 10000;
}
.main-content {
  margin: 0 15px 0 280px;
}
</style>