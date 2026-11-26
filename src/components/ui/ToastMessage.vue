<script setup>
import { watch, onUnmounted } from "vue";

// shows `message` for a few seconds, then emits "clear"
const props = defineProps({
  message: { type: String, default: "" },
  duration: { type: Number, default: 3500 },
});
const emit = defineEmits(["clear"]);

let timer = null;
watch(
  () => props.message,
  (msg) => {
    clearTimeout(timer);
    if (msg) timer = setTimeout(() => emit("clear"), props.duration);
  }
);
onUnmounted(() => clearTimeout(timer));
</script>

<template>
  <Teleport to="body">
    <Transition name="toast">
      <div v-if="message" class="toast" role="status" aria-live="polite">
        <span class="toast-icon"><i class="pi pi-check"></i></span>
        <span>{{ message }}</span>
        <button class="btn-icon borderless btn-sm" aria-label="Dismiss" @click="emit('clear')">
          <i class="pi pi-times"></i>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.toast {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 110;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: calc(100vw - 32px);
  padding: 10px 10px 10px 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  color: var(--text);
  font-size: var(--fs-base);
}
.toast-icon {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--success-soft);
  color: var(--success);
  font-size: var(--fs-xs);
}
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
@media (max-width: 560px) {
  .toast {
    left: 16px;
    right: 16px;
    bottom: 16px;
  }
}
</style>
