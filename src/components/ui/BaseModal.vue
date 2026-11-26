<script setup>
import { watch, onUnmounted } from "vue";

// shared dialog shell: backdrop, Escape to close, page scroll lock, animation,
// and a bottom sheet on phones
const props = defineProps({
  open: Boolean,
  size: { type: String, default: "md" }, // "sm" | "md"
  labelledby: String,
});
const emit = defineEmits(["close"]);

// a page-wide count of open dialogs (on <body>), so closing one dialog
// doesn't re-enable scrolling while another is still open
let isLocked = false;
function lock() {
  if (isLocked) return;
  isLocked = true;
  document.body.dataset.modals = Number(document.body.dataset.modals || 0) + 1;
  document.body.style.overflow = "hidden";
}
function unlock() {
  if (!isLocked) return;
  isLocked = false;
  const remaining = Math.max(0, Number(document.body.dataset.modals || 1) - 1);
  document.body.dataset.modals = remaining;
  if (remaining === 0) document.body.style.overflow = "";
}

function onKey(e) {
  if (e.key === "Escape") emit("close");
}

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      lock();
      document.addEventListener("keydown", onKey);
    } else {
      unlock();
      document.removeEventListener("keydown", onKey);
    }
  },
  { immediate: true }
);
onUnmounted(() => {
  unlock();
  document.removeEventListener("keydown", onKey);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="backdrop" @mousedown.self="emit('close')">
        <div class="dialog card" :class="`size-${size}`" role="dialog" aria-modal="true" :aria-labelledby="labelledby">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 24px 16px;
  background: var(--overlay);
  backdrop-filter: blur(3px);
  overflow-y: auto;
}
.dialog {
  width: 100%;
  box-shadow: var(--shadow-md);
}
.size-md {
  max-width: 600px;
}
.size-sm {
  max-width: 420px;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-active .dialog,
.modal-leave-active .dialog {
  transition: transform 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .dialog,
.modal-leave-to .dialog {
  transform: translateY(12px) scale(0.98);
}

@media (max-width: 560px) {
  .backdrop {
    place-items: end center;
    padding: 0;
  }
  .dialog {
    max-width: none;
    border-radius: 20px 20px 0 0;
    max-height: 92vh;
    overflow-y: auto;
  }
}
</style>
