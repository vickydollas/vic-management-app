<script setup>
import { ref } from "vue";
import { useTheme } from "../composables/useTheme";
import jobs2 from "../jobs2.json";
import { useAuth } from "../composables/auth";
import { useRouter } from "vue-router";

const auth = useAuth();
const router = useRouter()
const { isLight, toggleTheme } = useTheme();
const inputName = ref("");
const inputRole = ref("");

const findUser = () => {
  const user = jobs2.find(
    (u) =>
      u.role?.toLowerCase() === inputRole.value.toLowerCase() && u.name.toLowerCase() === inputName.value.toLowerCase()
  );

  if (!user) {
    alert("invalid username");
    auth.logout();
    router.push('/login')
    return
  }
  console.log(user)
  auth.login({ name: user.name, role: user.role, title: user.title });
  router.push('/')
};
</script>
<template>
  <div class="home" :class="[isLight ? 'dark-theme' : 'dark-theme']">
    <div
      class="border border-width border-[var(--border-color)] rounded-[10px] p-[50px]"
    >
      <h1 class="text-[#ffffff]">Welcome 👋</h1>
      <p class="text-[#323138] my-3">Please Login Here {{ inputName }}</p>
      <form @submit.prevent="findUser">
        <div>
          <input
            type="text"
            placeholder="Name"
            v-model="inputName"
            name=""
            id=""
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Role"
            v-model="inputRole"
            name=""
            id=""
          />
        </div>
        <div class="button">
          <button
            class="my-4 py-3 px-20 cursor-pointer rounded-[10px]"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
.home {
  background-color: var(--bg-color);
  color: var(--text-color);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
input[type="text"] {
  width: 500px;
  height: 50px;
  margin: 0 0 10px 0;
  color: var(--text-color);
  background-color: var(--bg-color);
  border: 1px solid #fff;
  border-radius: 8px;
  padding: 0 0 0 10px;
}
.button {
  justify-self: center;
  color: var(--text-color);
  background-color: var(--bg-color);
}
.h1,
p,
input[type="text"],
button {
  font-family: "roboto", sans-serif;
}
@media (max-width: 768px) {
  .home > div{
    padding: 20px;
  }
  input[type="text"] {
    width: 350px;
  }
}
</style>