<script setup>
import { ref, onMounted, computed } from "vue";
import profile1 from "../../assets/profile1.jpg";
import LogoutDisplay from "./LogoutDisplay.vue";
import { useAuth } from "../../composables/auth"

const auth = useAuth()
const props = defineProps({
  name: String,
  greeting: String,
});
const displayName = auth.state.user?.name
const displayRole = auth.state.user?.title
console.log(displayRole)
const togglelogout = ref(false);
const openLogout = () => {
  togglelogout.value = !togglelogout.value;
};
const closeFunc = () => {
  togglelogout.value = false;
};
const closeLogout = (e) => {
  if (e.key === "Escape") {
    closeFunc();
  }
};
const clickLogout = (e) => {
  closeFunc();
};
onMounted(() => {
  document.addEventListener("keydown", closeLogout);
  // document.addEventListener('click', clickLogout)
});
</script>
<template>
  <div class="headersection flex justify-between fixed">
    <div class="headersection1">
      <h1>{{ displayName }}🙋‍♂️</h1>
      <h3>{{ props.greeting }}</h3>
    </div>
    <div class="headersection2">
      <div class="search-wrapper">
        <i class="pi pi-search"></i>
        <input type="text" placeholder="Search..." />
      </div>
      <i class="pi pi-bell"></i>
      <div class="profile-wrapper">
        <img :src="profile1" alt="" />
        <div>
          <h3>{{ displayName }}</h3>
          <p>{{ displayRole }}</p>
        </div>
        <i class="pi pi-angle-down" @click="openLogout"></i>
      </div>
    </div>
    <Teleport to="body">
      <div class="headersection3" v-show="togglelogout" @click="clickLogout">
        <div class="fade" @click.stop><LogoutDisplay /></div>
      </div>
    </Teleport>
  </div>
</template>
<style scoped>
.headersection3 {
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
}
.headersection3 div {
  position: relative;
  /* left: 300px; */
  /* bottom: 150px; */
}
.headersection1 {
  margin: 20px 0 30px 0;
}
.headersection1 h1 {
  color: var(--text-color);
  font-family: "roboto", sans-serif;
  font-size: var(--fs-lg);
}
.headersection1 h3 {
  color: #6a717f;
  font-family: "roboto", sans-serif;
  font-weight: 300;
  font-size: var(--fs-sm);
}
.headersection2 {
  display: flex;
  align-content: center;
  /* position: relative; */
}
.headersection {
  background-color: var(--bg-color);
  min-width: calc(100% - 300px);
  /* padding: 0 20px 0 0; */
}
input[type="text"] {
  font-size: 15px;
  height: 1.2vh;
  width: 14rem;
  padding: 15px 0px 15px 35px;
  background-color: inherit;
  border: 1px solid var(--border-color);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
.txt1 {
  height: 2.2vh !important;
}
.profile-wrapper {
  display: flex;
  width: 60%;
  border: 1px solid #d1d5dc;
  border-radius: 10px;
  align-self: center;
}
.profile-wrapper img {
  padding: 3px 0 3px 3px;
  width: 25%;
  height: 6vh;
  border-radius: 50px;
  align-self: center;
}
.profile-wrapper > div {
  align-self: center;
  margin-left: 8px;
}
.profile-wrapper > div > h3 {
  color: var(--text-color);
  font-family: "roboto", sans-serif;
  font-size: 17px;
  font-weight: 400;
}
.profile-wrapper > div > p {
  color: #6a717f;
  font-family: "roboto", sans-serif;
  font-size: 12px;
}
.pi-angle-down {
  align-self: center;
  margin-left: 5px;
  font-size: 20px;
  color: var(--text-color);
  font-weight: 100;
}
.search-wrapper {
  position: relative;
  display: flex;
  align-self: center;
}
.pi-bell {
  font-size: var(--fs-sm);
  margin: 0 10px;
  padding: 0 auto;
  color: var(--text-color);
  padding: 10px 10px 0px 10px;
  width: 1rem;
  height: 3.5vh;
  background-color: var(--bg-color);
  border: 1px solid #d1d5dc;
  border-radius: 10px;
  display: block;
  align-self: center;
}
.pi-search {
  font-size: var(--fs-sm);
  position: absolute;
  top: 12px;
  left: 8px;
  color: var(--text-color);
  /* font-weight: 100; */
  /* font-family: "roboto", sans-serif; */
}
@media (max-width: 768px) {
  .headersection {
    right: 0px;
    left: 0px;
    padding: 0 10px;
  }
  .headersection1 {
    flex: 0 0 40%;
  }
  .headersection2 {
    flex: 0 0 60%;
  }
  input[type="text"] {
    font-size: var(--fs-aa);
    height: 0.3vh;
    width: 4rem;
    padding: 15px 0px 15px 35px;
    background-color: inherit;
    border: 1px solid var(--border-color);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
  .pi-bell {
    padding: 5px;
    font-size: var(--fs-a);
    height: 1.5vh;
  }
  .pi-angle-down {
    font-size: var(--fs-a);
  }
  .headersection1 h1 {
    font-size: var(--fs-vvvv);
  }
  .headersection1 h3 {
    font-size: var(--fs-aa);
  }
  .profile-wrapper {
    padding: 5px;
  }
  .profile-wrapper img {
    margin: 0 0 0 0;
    width: 1rem;
    height: 2vh;
  }
  .profile-wrapper > div > h3 {
    font-size: var(--fs-aa);
  }
  .profile-wrapper > div > p {
    font-size: var(--fs-aaa);
  }
  .headersection3 div {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>