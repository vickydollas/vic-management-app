<script setup>
import { onMounted, ref } from "vue";
import SideBar from "../components/SideBar.vue";
import HeaderSection from "../components/HeaderSection.vue";
import FixedHeader from "../components/body/FixedHeader.vue"

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
            <SideBar @toggle-theme="toggleTheme" :isDark="isLight" />
        </div>
        <div class="main-content">
            <FixedHeader name="Hello Victor 🙋‍♂️" greeting="Good Morning" />
        </div>
        <div class="attendance-record">
            <HeaderSection />
        </div>
    </div>
</template>
<style scoped>
*{
  box-sizing: border-box;
}
.home{
  background-color: var(--bg-color);
  min-height: 100vh;
  width: 100%;
}
.home-sidebar{
  /* display: none; */
  margin: 10px 0 0 15px;
  border-radius: 10px;
  width: 250px;
  position: fixed;
  background-color: var(--sidebar-bg);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  height: 100vh;
  z-index: 10000;
}
.main-content{
  margin:0 15px 0 280px;
}
.attendance-record{
    padding: 100px 0 20px 0;
    margin: 0 15px 0 280px;
}
@media screen and (max-width: 768px) {
  .home-sidebar {
    position: static;
    width: 100%;
    height: auto;
    margin: 70px 0 0 0;
    overflow: scroll;
    /* display: none; */
  }

  .main-content {
    position: absolute;
    top: 0;
    margin: 0;
    width: 100%;
    padding: 0 10px;
    /* display: none; */
  }

  .attendance-record {
    margin: 0 0px;
    padding: 0px 0;
  }
}
</style>