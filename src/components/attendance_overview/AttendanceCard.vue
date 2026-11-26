<script setup>
import { computed } from "vue";

const props = defineProps({
  data: Object,
});

const statusClass = computed(() => {
  if (props.data.truth === "Late") return "badge-danger";
  if (props.data.truth === "On Time") return "badge-success";
  return "";
});
</script>

<template>
  <tr>
    <td>
      <div class="person">
        <img class="avatar" :src="props.data.imagePath" alt="" />
        <span class="person-name">{{ props.data.name }}</span>
      </div>
    </td>
    <td class="muted">{{ props.data.title }}</td>
    <td class="muted">{{ props.data.type }}</td>
    <td>{{ props.data.time || "—" }}</td>
    <td>
      <span class="badge" :class="statusClass">{{ props.data.truth || "No record" }}</span>
    </td>
  </tr>
</template>
