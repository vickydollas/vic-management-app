<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import profile1 from "../../assets/profile1.jpg";
import LogoutDisplay from "./LogoutDisplay.vue";
import { useAuth } from "../../composables/auth";

const props = defineProps({
  title: String,
  subtitle: String,
});
defineEmits(["toggle-sidebar"]);

const auth = useAuth();
const displayName = computed(() => auth.state.user?.name ?? "Guest");
const displayRole = computed(() => auth.state.user?.title ?? "");
const avatar = computed(() => auth.state.user?.imagePath || profile1);

// profile dropdown: closes on outside click and on Escape
const menuOpen = ref(false);
const profileRef = ref(null);
const onDocClick = (e) => {
  if (profileRef.value && !profileRef.value.contains(e.target)) menuOpen.value = false;
};
const onKey = (e) => {
  if (e.key === "Escape") menuOpen.value = false;
};
onMounted(() => {
  document.addEventListener("click", onDocClick);
  document.addEventListener("keydown", onKey);
});
onUnmounted(() => {
  document.removeEventListener("click", onDocClick);
  document.removeEventListener("keydown", onKey);
});
</script>

<template>
  <header class="topbar">
    <button class="btn-icon menu-btn" aria-label="Open menu" @click="$emit('toggle-sidebar')">
      <i class="pi pi-bars"></i>
    </button>

    <div class="heading">
      <h1>{{ props.title }}</h1>
      <p v-if="props.subtitle">{{ props.subtitle }}</p>
    </div>

    <div class="actions">
      <label class="search header-search">
        <i class="pi pi-search"></i>
        <input class="input" type="text" placeholder="Search..." />
      </label>

      <button class="btn-icon bell" aria-label="Notifications">
        <i class="pi pi-bell"></i>
        <span class="bell-dot"></span>
      </button>

      <div ref="profileRef" class="profile">
        <button class="profile-btn" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">
          <img class="avatar" :src="avatar" alt="" />
          <span class="profile-text">
            <span class="profile-name">{{ displayName }}</span>
            <span class="profile-role">{{ displayRole }}</span>
          </span>
          <i class="pi pi-angle-down chevron" :class="{ flipped: menuOpen }"></i>
        </button>
        <Transition name="pop">
          <LogoutDisplay v-if="menuOpen" class="menu" @select="menuOpen = false" />
        </Transition>
      </div>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px var(--gutter);
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  backdrop-filter: blur(10px);
}
.menu-btn {
  display: none;
}
.heading {
  min-width: 0;
}
.heading h1 {
  font-size: var(--fs-xl);
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.heading p {
  margin-top: 2px;
  font-size: var(--fs-sm);
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
}
.header-search {
  width: 260px;
}
.bell {
  position: relative;
}
.bell-dot {
  position: absolute;
  top: 9px;
  right: 10px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--danger);
  border: 2px solid var(--surface);
}

/* profile */
.profile {
  position: relative;
}
.profile-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 48px;
  padding: 0 12px 0 6px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
  text-align: left;
  transition: background-color 0.15s ease;
}
.profile-btn:hover {
  background: var(--surface-2);
}
.profile-btn .avatar {
  width: 36px;
  height: 36px;
  border-radius: 9px;
}
.profile-text {
  display: flex;
  flex-direction: column;
  line-height: 1.25;
}
.profile-name {
  font-size: var(--fs-base);
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
}
.profile-role {
  font-size: var(--fs-xs);
  color: var(--text-muted);
  white-space: nowrap;
}
.chevron {
  font-size: var(--fs-sm);
  color: var(--text-muted);
  transition: transform 0.2s ease;
}
.chevron.flipped {
  transform: rotate(180deg);
}
.menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
}
.pop-enter-active,
.pop-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (max-width: 1200px) {
  .header-search {
    width: 200px;
  }
}
@media (max-width: 1024px) {
  .menu-btn {
    display: inline-grid;
  }
}
@media (max-width: 860px) {
  .header-search {
    display: none;
  }
}
@media (max-width: 640px) {
  .topbar {
    gap: 10px;
    padding: 12px 16px;
  }
  .heading h1 {
    font-size: var(--fs-lg);
  }
  .profile-text,
  .chevron,
  .bell {
    display: none;
  }
  .profile-btn {
    height: 40px;
    padding: 0 3px;
    border-radius: 10px;
  }
  .profile-btn .avatar {
    width: 32px;
    height: 32px;
    border-radius: 8px;
  }
}
</style>
