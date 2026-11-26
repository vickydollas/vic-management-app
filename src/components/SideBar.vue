<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAuth } from '../composables/auth'
import { useTheme } from '../composables/useTheme'

defineProps({
  open: Boolean,
})
defineEmits(['close'])

const auth = useAuth()
const route = useRoute()
const { isDark, setMode } = useTheme()

// one source of truth for the menu; `role` limits an item to that role
const navMenu = [
  { name: 'Dashboard', path: '/', icon: 'pi-th-large' },
  { name: 'All Employees', path: '/employee', icon: 'pi-users', role: 'hr_head' },
  { name: 'All Departments', path: '/department', icon: 'pi-sitemap' },
  { name: 'Attendance', path: '/attendance', icon: 'pi-calendar-clock', role: 'hr_head' },
  { name: 'Payroll', path: '/payroll', icon: 'pi-wallet', role: 'hr_head' },
  { name: 'Jobs', path: '/jobs', icon: 'pi-briefcase', role: 'hr_head' },
  { name: 'Candidates', path: '/candidate', icon: 'pi-user-plus', role: 'hr_head' },
  { name: 'Leaves', path: '/leaves', icon: 'pi-calendar-plus' },
  { name: 'Holidays', path: '/holiday', icon: 'pi-calendar' },
  { name: 'Settings', path: '/settings', icon: 'pi-cog' },
]

const visibleMenu = computed(() =>
  navMenu.filter((item) => !item.role || auth.state.user?.role === item.role)
)

// "/" only matches itself; other items also match their sub-pages (e.g. /department/design)
const isActive = (path) => (path === '/' ? route.path === '/' : route.path.startsWith(path))
</script>

<template>
  <aside class="sidebar" :class="{ open }">
    <div class="brand">
      <span class="brand-mark"><i class="pi pi-bolt"></i></span>
      <span class="brand-name">SLOTS</span>
      <button class="btn-icon borderless btn-sm close-btn" aria-label="Close menu" @click="$emit('close')">
        <i class="pi pi-times"></i>
      </button>
    </div>

    <nav class="nav">
      <RouterLink
        v-for="item in visibleMenu"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :class="{ active: isActive(item.path) }"
      >
        <i class="pi" :class="item.icon"></i>
        <span>{{ item.name }}</span>
      </RouterLink>
    </nav>

    <div class="theme-switch" role="group" aria-label="Theme">
      <button :class="{ active: !isDark }" @click="setMode('light')">
        <i class="pi pi-sun"></i> Light
      </button>
      <button :class="{ active: isDark }" @click="setMode('dark')">
        <i class="pi pi-moon"></i> Dark
      </button>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 16px;
  bottom: 16px;
  left: 16px;
  z-index: 50;
  width: var(--sidebar-w);
  display: flex;
  flex-direction: column;
  padding: 20px 16px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow-sm);
  overflow-y: auto;
}

/* brand */
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 8px 24px;
}
.brand-mark {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--accent), #a48bff);
  color: #fff;
  box-shadow: 0 6px 16px -6px rgba(113, 82, 243, 0.7);
}
.brand-name {
  font-size: var(--fs-lg);
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--text);
}
.close-btn {
  display: none;
  margin-left: auto;
}

/* nav */
.nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  height: 42px;
  padding: 0 14px;
  border-radius: 10px;
  color: var(--text-muted);
  font-size: var(--fs-base);
  font-weight: 400;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.nav-item .pi {
  width: 18px;
  font-size: 1rem;
  text-align: center;
}
.nav-item:hover {
  background: var(--surface-2);
  color: var(--text);
}
.nav-item.active {
  background: var(--accent-soft);
  color: var(--accent-text);
  font-weight: 600;
}
.nav-item.active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 10px;
  bottom: 10px;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: var(--accent);
}

/* theme switch */
.theme-switch {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  margin-top: auto;
  padding: 4px;
  border-radius: 12px;
  background: var(--surface-2);
  border: 1px solid var(--border);
}
.theme-switch button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 38px;
  border-radius: 9px;
  color: var(--text-muted);
  font-size: var(--fs-sm);
  font-weight: 500;
  transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}
.theme-switch button:hover {
  color: var(--text);
}
.theme-switch button.active {
  background: var(--accent);
  color: var(--on-accent);
  box-shadow: 0 4px 12px -4px rgba(113, 82, 243, 0.7);
}

/* drawer on tablets / phones */
@media (max-width: 1024px) {
  .sidebar {
    top: 0;
    bottom: 0;
    left: 0;
    border-radius: 0 20px 20px 0;
    box-shadow: var(--shadow-md);
    transform: translateX(-105%);
    transition: transform 0.25s ease;
  }
  .sidebar.open {
    transform: translateX(0);
  }
  .close-btn {
    display: inline-grid;
  }
  .nav {
    margin-bottom: 24px;
  }
}
</style>
