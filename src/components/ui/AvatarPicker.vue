<script setup>
import { computed } from "vue";
import { AVATARS } from "../../stores/employees";

// round photo picker, used with v-model
const model = defineModel({ type: String, default: "" });
const props = defineProps({
  label: { type: String, default: "Profile photo" },
  name: { type: String, default: "avatar" },
});

// keep a record's current photo selectable even if it isn't one of the defaults
const options = computed(() =>
  model.value && !AVATARS.includes(model.value) ? [...AVATARS, model.value] : AVATARS
);
</script>

<template>
  <fieldset class="avatars">
    <legend class="field-label">{{ props.label }}</legend>
    <label v-for="src in options" :key="src" class="avatar-option" :class="{ selected: model === src }">
      <input type="radio" :name="props.name" :value="src" v-model="model" />
      <img :src="src" alt="" />
    </label>
  </fieldset>
</template>

<style scoped>
.avatars {
  border: none;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}
.avatars legend {
  margin-bottom: 8px;
}
.avatar-option {
  position: relative;
  cursor: pointer;
  border-radius: 50%;
  padding: 2px;
  border: 2px solid transparent;
  transition: border-color 0.15s ease, transform 0.15s ease;
}
.avatar-option:hover {
  transform: translateY(-1px);
}
.avatar-option input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.avatar-option img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  background: var(--surface-3);
}
.avatar-option.selected {
  border-color: var(--accent);
}
.avatar-option:has(input:focus-visible) {
  box-shadow: var(--ring);
}
</style>
