<script setup>
import { reactive, ref, computed, watch, nextTick } from "vue";
import BaseModal from "../ui/BaseModal.vue";
import AvatarPicker from "../ui/AvatarPicker.vue";
import {
  useEmployeeStore,
  parseMoney,
  AVATARS,
  WORK_TYPES,
  EMPLOYMENT_STATUSES,
} from "../../stores/employees";

// one form for both adding and editing: pass `employee` to edit
const props = defineProps({
  open: Boolean,
  employee: { type: Object, default: null },
  // pre-select a department when adding (e.g. from a department page)
  defaultDepartment: { type: String, default: "" },
  // pre-fill fields when adding (e.g. hiring a candidate: { name, title, imagePath })
  initial: { type: Object, default: null },
  // replaces the "Add New Employee" heading when adding
  heading: { type: String, default: "" },
});
const emit = defineEmits(["close", "created", "updated"]);

const store = useEmployeeStore();
const isEdit = computed(() => !!props.employee);

const emptyForm = () => ({
  identityNum: store.generateIdentityNum(),
  imagePath: AVATARS[0],
  name: "",
  department: props.defaultDepartment,
  title: "",
  type: WORK_TYPES[0],
  status: EMPLOYMENT_STATUSES[0],
  location: "",
  annualSalary: "",
  ...(props.initial ?? {}),
});

const formFromEmployee = (e) => ({
  identityNum: e.identityNum,
  imagePath: e.imagePath,
  name: e.name ?? "",
  department: e.department ?? "",
  title: e.title ?? "",
  type: e.type ?? WORK_TYPES[0],
  status: e.status ?? EMPLOYMENT_STATUSES[0],
  location: e.location ?? "",
  annualSalary: parseMoney(e.salary?.perYear),
});

const form = reactive(emptyForm());
const errors = reactive({});
const submitted = ref(false);
const nameInput = ref(null);

// keep a record's existing value selectable even if it isn't in the default list
// (the file has types like "Full-time")
const withCurrent = (list, value) => (value && !list.includes(value) ? [...list, value] : list);
const departmentOptions = computed(() => {
  const list = new Set(store.departments);
  if (props.defaultDepartment) list.add(props.defaultDepartment);
  return [...list].sort();
});
const typeOptions = computed(() => withCurrent(WORK_TYPES, form.type));
const statusOptions = computed(() => withCurrent(EMPLOYMENT_STATUSES, form.status));

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k]);
  if (form.name.trim().length < 2) errors.name = "Enter the employee's full name.";
  if (!form.department) errors.department = "Choose a department.";
  if (!form.title.trim()) errors.title = "Enter a designation.";
  if (form.annualSalary !== "" && !(Number(form.annualSalary) > 0)) {
    errors.annualSalary = "Salary must be a positive number.";
  }
  return Object.keys(errors).length === 0;
}

// re-check while typing, but only after the first submit attempt
watch(form, () => { if (submitted.value) validate(); });

function submit() {
  submitted.value = true;
  if (!validate()) return;
  if (isEdit.value) {
    emit("updated", store.updateEmployee(props.employee.id, { ...form }));
  } else {
    emit("created", store.addEmployee({ ...form }));
  }
  emit("close");
}

// fill the form each time the dialog opens
watch(
  () => props.open,
  async (isOpen) => {
    if (!isOpen) return;
    Object.assign(form, isEdit.value ? formFromEmployee(props.employee) : emptyForm());
    Object.keys(errors).forEach((k) => delete errors[k]);
    submitted.value = false;
    await nextTick();
    nameInput.value?.focus();
  }
);
</script>

<template>
  <BaseModal :open="open" labelledby="employee-form-title" @close="emit('close')">
    <header class="dialog-head">
      <div>
        <h2 id="employee-form-title">{{ isEdit ? "Edit Employee" : heading || "Add New Employee" }}</h2>
        <p v-if="isEdit">Employee ID <strong>#{{ form.identityNum }}</strong></p>
        <p v-else>Employee ID <strong>#{{ form.identityNum }}</strong> will be assigned</p>
      </div>
      <button class="btn-icon borderless btn-sm" aria-label="Close" @click="emit('close')">
        <i class="pi pi-times"></i>
      </button>
    </header>

    <form class="dialog-body" novalidate @submit.prevent="submit">
      <AvatarPicker v-model="form.imagePath" />

      <div class="form-grid">
        <div class="field span-2">
          <label class="field-label" for="emp-name">Full name <span class="req">*</span></label>
          <input
            id="emp-name"
            ref="nameInput"
            class="input"
            :class="{ invalid: errors.name }"
            v-model="form.name"
            type="text"
            placeholder="e.g. Jane Cooper"
            autocomplete="off"
          />
          <p v-if="errors.name" class="field-error">{{ errors.name }}</p>
        </div>

        <div class="field">
          <label class="field-label" for="emp-dept">Department <span class="req">*</span></label>
          <select id="emp-dept" class="select" :class="{ invalid: errors.department }" v-model="form.department">
            <option value="" disabled>Select department</option>
            <option v-for="d in departmentOptions" :key="d" :value="d">{{ d }}</option>
          </select>
          <p v-if="errors.department" class="field-error">{{ errors.department }}</p>
        </div>

        <div class="field">
          <label class="field-label" for="emp-title">Designation <span class="req">*</span></label>
          <input
            id="emp-title"
            class="input"
            :class="{ invalid: errors.title }"
            v-model="form.title"
            type="text"
            placeholder="e.g. Product Designer"
          />
          <p v-if="errors.title" class="field-error">{{ errors.title }}</p>
        </div>

        <div class="field">
          <label class="field-label" for="emp-type">Work type</label>
          <select id="emp-type" class="select" v-model="form.type">
            <option v-for="t in typeOptions" :key="t" :value="t">{{ t }}</option>
          </select>
        </div>

        <div class="field">
          <label class="field-label" for="emp-status">Employment status</label>
          <select id="emp-status" class="select" v-model="form.status">
            <option v-for="s in statusOptions" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>

        <div class="field">
          <label class="field-label" for="emp-location">Location</label>
          <input id="emp-location" class="input" v-model="form.location" type="text" placeholder="e.g. Austin, TX" />
        </div>

        <div class="field">
          <label class="field-label" for="emp-salary">Annual salary (USD)</label>
          <input
            id="emp-salary"
            class="input"
            :class="{ invalid: errors.annualSalary }"
            v-model="form.annualSalary"
            type="number"
            min="0"
            step="1000"
            placeholder="e.g. 60000"
          />
          <p v-if="errors.annualSalary" class="field-error">{{ errors.annualSalary }}</p>
        </div>
      </div>

      <footer class="dialog-foot">
        <button type="button" class="btn btn-outline" @click="emit('close')">Cancel</button>
        <button type="submit" class="btn btn-primary">
          <i class="pi pi-check"></i> {{ isEdit ? "Save Changes" : "Add Employee" }}
        </button>
      </footer>
    </form>
  </BaseModal>
</template>

