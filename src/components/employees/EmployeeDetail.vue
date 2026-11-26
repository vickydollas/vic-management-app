<script setup>
import { computed } from "vue";

const props = defineProps({
  job: Object,
  // hide the department column (used on a single-department page)
  hideDepartment: Boolean,
  // briefly highlight a row that was just added or edited
  highlight: Boolean,
  // only employees added in the app can be deleted
  canDelete: Boolean,
});
const emit = defineEmits(["view", "edit", "delete"]);

const statusClass = computed(() => {
  switch (props.job.status) {
    case "Permanent": return "badge-accent";
    case "Contract": return "badge-warning";
    case "Probation": return "badge-danger";
    default: return "";
  }
});
</script>

<template>
  <tr :class="{ 'row-new': props.highlight }">
    <td class="muted">{{ props.job.identityNum }}</td>
    <td>
      <button class="person person-link" @click="emit('view', props.job)">
        <img class="avatar" :src="props.job.imagePath" alt="" />
        <span class="person-name">{{ props.job.name }}</span>
      </button>
    </td>
    <td v-if="!props.hideDepartment">{{ props.job.department }}</td>
    <td class="muted">{{ props.job.title }}</td>
    <td class="muted">{{ props.job.type }}</td>
    <td><span class="badge" :class="statusClass">{{ props.job.status }}</span></td>
    <td>
      <div class="actions">
        <button
          class="btn-icon borderless btn-sm"
          :aria-label="`View ${props.job.name}`"
          title="View"
          @click="emit('view', props.job)"
        >
          <i class="pi pi-eye"></i>
        </button>
        <button
          class="btn-icon borderless btn-sm"
          :aria-label="`Edit ${props.job.name}`"
          title="Edit"
          @click="emit('edit', props.job)"
        >
          <i class="pi pi-pencil"></i>
        </button>
        <button
          class="btn-icon borderless btn-sm danger"
          :aria-label="`Delete ${props.job.name}`"
          :title="props.canDelete ? 'Delete' : 'Only employees added in the app can be deleted'"
          :disabled="!props.canDelete"
          @click="emit('delete', props.job)"
        >
          <i class="pi pi-trash"></i>
        </button>
      </div>
    </td>
  </tr>
</template>

<style scoped>
.person-link {
  text-align: left;
  border-radius: 8px;
}
.person-link:hover .person-name {
  color: var(--accent-text);
}
.row-new {
  animation: row-flash 2.4s ease-out;
}
@keyframes row-flash {
  0%,
  40% {
    background: var(--accent-soft);
  }
  100% {
    background: transparent;
  }
}
</style>
