<script setup>
import { useAuth } from '../../composables/auth'
import { useRouter } from 'vue-router'

const emit = defineEmits(['select'])
const router = useRouter()
const auth = useAuth()

const goToSettings = () => {
  emit('select')
  router.push('/settings')
}
const handleLogout = () => {
  emit('select')
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="dropdown" role="menu">
    <button class="dropdown-item" role="menuitem" @click="goToSettings">
      <i class="pi pi-user"></i> My Profile
    </button>
    <div class="divider"></div>
    <button class="dropdown-item danger" role="menuitem" @click="handleLogout">
      <i class="pi pi-sign-out"></i> Logout
    </button>
  </div>
</template>

<style scoped>
.dropdown {
  z-index: 60;
  min-width: 200px;
  padding: 6px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--shadow-md);
}
.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border-radius: 8px;
  color: var(--text);
  font-size: var(--fs-base);
  text-align: left;
  transition: background-color 0.12s ease;
}
.dropdown-item .pi {
  font-size: var(--fs-base);
  color: var(--text-muted);
}
.dropdown-item:hover {
  background: var(--surface-2);
}
.dropdown-item.danger,
.dropdown-item.danger .pi {
  color: var(--danger);
}
.dropdown-item.danger:hover {
  background: var(--danger-soft);
}
.divider {
  height: 1px;
  margin: 4px 0;
  background: var(--border);
}
</style>
