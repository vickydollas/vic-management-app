<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SideBar from '../SideBar.vue'
import FixedHeader from '../body/FixedHeader.vue'

defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
})

// on small screens the sidebar is a slide-in drawer
const sidebarOpen = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { sidebarOpen.value = false })
</script>

<template>
  <div class="app-shell">
    <SideBar :open="sidebarOpen" @close="sidebarOpen = false" />
    <div class="sidebar-backdrop" :class="{ show: sidebarOpen }" @click="sidebarOpen = false"></div>

    <div class="app-main">
      <FixedHeader :title="title" :subtitle="subtitle" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      <main class="app-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: var(--bg);
}
.app-main {
  margin-left: calc(var(--sidebar-w) + 16px);
  min-width: 0;
}
.app-content {
  padding: 8px var(--gutter) 32px;
}
.sidebar-backdrop {
  display: none;
}

@media (max-width: 1024px) {
  .app-main {
    margin-left: 0;
  }
  .sidebar-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 40;
    background: var(--overlay);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }
  .sidebar-backdrop.show {
    opacity: 1;
    pointer-events: auto;
  }
}
@media (max-width: 640px) {
  .app-content {
    padding: 4px 16px 24px;
  }
}
</style>
