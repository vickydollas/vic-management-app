<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import jobs2 from "../jobs2.json";
import { useAuth } from "../composables/auth";
import { useTheme } from "../composables/useTheme";
import { useEmployeeStore } from "../stores/employees";

const auth = useAuth();
const employeeStore = useEmployeeStore();
const router = useRouter();
const { isDark, toggleTheme } = useTheme();

const inputName = ref("");
const inputRole = ref("");
const errorMessage = ref("");

const findUser = () => {
  // employees added in the app can log in too (role "employee")
  const user = [...employeeStore.addedEmployees, ...jobs2].find(
    (u) =>
      u.role?.toLowerCase() === inputRole.value.trim().toLowerCase() &&
      u.name.toLowerCase() === inputName.value.trim().toLowerCase()
  );

  if (!user) {
    errorMessage.value = "Invalid name or role. Please try again.";
    auth.logout();
    return;
  }
  errorMessage.value = "";
  auth.login({ name: user.name, role: user.role, title: user.title, imagePath: user.imagePath });
  router.push("/");
};
</script>

<template>
  <div class="login-page">
    <button class="btn-icon theme-btn" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'" @click="toggleTheme">
      <i class="pi" :class="isDark ? 'pi-sun' : 'pi-moon'"></i>
    </button>

    <div class="login-card card">
      <div class="brand">
        <span class="brand-mark"><i class="pi pi-bolt"></i></span>
        <span class="brand-name">SLOTS</span>
      </div>

      <h1>Welcome back 👋</h1>
      <p class="lead">Please log in to continue</p>

      <form @submit.prevent="findUser" novalidate>
        <div class="field">
          <label class="field-label" for="login-name">Name</label>
          <input id="login-name" class="input" type="text" placeholder="e.g. Victor John" v-model="inputName" autocomplete="username" required />
        </div>
        <div class="field">
          <label class="field-label" for="login-role">Role</label>
          <input id="login-role" class="input" type="text" placeholder="e.g. hr_head" v-model="inputRole" required />
        </div>

        <p v-if="errorMessage" class="error" role="alert">
          <i class="pi pi-exclamation-circle"></i> {{ errorMessage }}
        </p>

        <button class="btn btn-primary btn-block login-btn" type="submit">Login</button>
      </form>

      <div class="demo">
        <i class="pi pi-info-circle"></i>
        <div>
          <p class="demo-title">Demo account</p>
          <p>Name: <strong>Victor John</strong> · Role: <strong>hr_head</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  position: relative;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px 16px;
  background:
    radial-gradient(600px circle at 15% 10%, var(--accent-soft), transparent 60%),
    radial-gradient(500px circle at 90% 90%, var(--accent-soft), transparent 60%),
    var(--bg);
}
.theme-btn {
  position: absolute;
  top: 20px;
  right: 20px;
}
.login-card {
  width: 100%;
  max-width: 420px;
  padding: 36px 32px 28px;
  box-shadow: var(--shadow-md);
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 28px;
}
.brand-mark {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--accent), #a48bff);
  color: #fff;
}
.brand-name {
  font-size: var(--fs-lg);
  font-weight: 700;
  letter-spacing: 0.06em;
}
h1 {
  font-size: var(--fs-2xl);
  font-weight: 600;
  color: var(--text);
}
.lead {
  margin: 4px 0 24px;
  color: var(--text-muted);
}
.field {
  margin-bottom: 16px;
}
.field .input {
  height: 46px;
}
.error {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--danger-soft);
  color: var(--danger);
  font-size: var(--fs-sm);
}
.login-btn {
  height: 46px;
  margin-top: 4px;
  font-size: var(--fs-md);
}
.demo {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--accent-soft);
  color: var(--text-muted);
  font-size: var(--fs-sm);
}
.demo .pi {
  margin-top: 2px;
  color: var(--accent-text);
}
.demo-title {
  font-weight: 600;
  color: var(--text);
}
.demo strong {
  color: var(--text);
  font-weight: 500;
}

@media (max-width: 480px) {
  .login-card {
    padding: 28px 20px 22px;
  }
}
</style>
