<script setup>
import { ref, computed } from "vue";
import { useEmployeeStore } from "../../stores/employees";
import EmployeeFormModal from "./EmployeeFormModal.vue";
import EmployeeViewModal from "./EmployeeViewModal.vue";
import ConfirmDialog from "../ui/ConfirmDialog.vue";
import ToastMessage from "../ui/ToastMessage.vue";

// all employee dialogs in one place: add / view / edit / delete (+ toast).
// Parents call the exposed open* methods, e.g. dialogs.value.openView(employee)
defineProps({
  defaultDepartment: { type: String, default: "" },
});
const emit = defineEmits(["created", "updated", "deleted"]);

const store = useEmployeeStore();

// the selected employee is kept after closing so the closing animation still has content
const formOpen = ref(false);
const editing = ref(null);
const viewOpen = ref(false);
const viewing = ref(null);
const confirmOpen = ref(false);
const deleting = ref(null);
const toast = ref("");

// always show the latest version of the record (e.g. after an edit)
const viewingLive = computed(() =>
  viewing.value ? store.employees.find((e) => e.id === viewing.value.id) ?? viewing.value : null
);

function openAdd() {
  editing.value = null;
  formOpen.value = true;
}
function openEdit(employee) {
  viewOpen.value = false;
  editing.value = employee;
  formOpen.value = true;
}
function openView(employee) {
  viewing.value = employee;
  viewOpen.value = true;
}
function askDelete(employee) {
  if (!store.isAdded(employee.id)) return;
  viewOpen.value = false;
  deleting.value = employee;
  confirmOpen.value = true;
}

function onCreated(employee) {
  toast.value = `${employee.name} was added to ${employee.department}`;
  emit("created", employee);
}
function onUpdated(employee) {
  toast.value = `${employee.name}'s details were updated`;
  emit("updated", employee);
}
function confirmDelete() {
  const removed = store.deleteEmployee(deleting.value.id);
  confirmOpen.value = false;
  if (removed) {
    toast.value = `${removed.name} was deleted`;
    emit("deleted", removed);
  }
}

defineExpose({ openAdd, openEdit, openView, askDelete });
</script>

<template>
  <EmployeeFormModal
    :open="formOpen"
    :employee="editing"
    :default-department="defaultDepartment"
    @close="formOpen = false"
    @created="onCreated"
    @updated="onUpdated"
  />

  <EmployeeViewModal
    :open="viewOpen"
    :employee="viewingLive"
    :can-delete="!!viewingLive && store.isAdded(viewingLive.id)"
    @close="viewOpen = false"
    @edit="openEdit"
    @delete="askDelete"
  />

  <ConfirmDialog
    :open="confirmOpen"
    title="Delete employee?"
    confirm-label="Delete"
    danger
    @cancel="confirmOpen = false"
    @confirm="confirmDelete"
  >
    <template v-if="deleting">
      <strong>{{ deleting.name }}</strong> (#{{ deleting.identityNum }}) will be permanently removed
      from the employee list. This can't be undone.
    </template>
  </ConfirmDialog>

  <ToastMessage :message="toast" @clear="toast = ''" />
</template>
