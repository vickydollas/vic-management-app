<script setup>
import { ref, watch, nextTick } from "vue";
import BaseModal from "./BaseModal.vue";

// "Are you sure?" dialog. Cancel gets focus first, so Enter doesn't confirm by accident.
const props = defineProps({
  open: Boolean,
  title: { type: String, default: "Are you sure?" },
  message: { type: String, default: "" },
  confirmLabel: { type: String, default: "Confirm" },
  danger: Boolean,
});
const emit = defineEmits(["confirm", "cancel"]);

const cancelBtn = ref(null);
watch(
  () => props.open,
  async (isOpen) => {
    if (!isOpen) return;
    await nextTick();
    cancelBtn.value?.focus();
  }
);
</script>

<template>
  <BaseModal :open="open" size="sm" labelledby="confirm-title" @close="emit('cancel')">
    <div class="confirm">
      <span class="confirm-icon" :class="{ danger }">
        <i class="pi" :class="danger ? 'pi-trash' : 'pi-question'"></i>
      </span>
      <h2 id="confirm-title">{{ title }}</h2>
      <p>
        <slot>{{ message }}</slot>
      </p>
      <div class="confirm-actions">
        <button ref="cancelBtn" class="btn btn-outline" @click="emit('cancel')">Cancel</button>
        <button class="btn" :class="danger ? 'btn-danger' : 'btn-primary'" @click="emit('confirm')">
          {{ confirmLabel }}
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
.confirm {
  padding: 28px 24px 22px;
  text-align: center;
}
.confirm-icon {
  display: inline-grid;
  place-items: center;
  width: 52px;
  height: 52px;
  margin-bottom: 14px;
  border-radius: 50%;
  background: var(--accent-soft);
  color: var(--accent-text);
  font-size: 1.25rem;
}
.confirm-icon.danger {
  background: var(--danger-soft);
  color: var(--danger);
}
h2 {
  font-size: var(--fs-lg);
  font-weight: 600;
  color: var(--text);
}
p {
  margin-top: 6px;
  color: var(--text-muted);
  font-size: var(--fs-base);
}
p :deep(strong) {
  color: var(--text);
  font-weight: 600;
}
.confirm-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 22px;
}
@media (max-width: 560px) {
  .confirm {
    padding-bottom: 24px;
  }
}
</style>
