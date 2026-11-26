<script setup>
import { reactive, ref, computed, watch, nextTick } from "vue";
import BaseModal from "../ui/BaseModal.vue";
import { useJobStore, JOB_STATUSES, EMPLOYMENT_TYPES, WORK_STATIONS } from "../../stores/jobs";

// one form for adding and editing: pass `job` to edit
const props = defineProps({
  open: Boolean,
  job: { type: Object, default: null },
});
const emit = defineEmits(["close", "created", "updated"]);

const store = useJobStore();
const isEdit = computed(() => !!props.job);

// match a stored value to a select option, ignoring case ("remote" -> "Remote");
// an unknown value is kept as-is and added to the options
const matchOption = (list, value) =>
  list.find((o) => o.toLowerCase() === String(value ?? "").toLowerCase()) ?? value ?? list[0];

const formFromJob = (j) => ({
  title: j.title ?? "",
  department: j.department ?? "",
  status: j.status ?? "active",
  employmentType: matchOption(EMPLOYMENT_TYPES, j.employment_type),
  workStation: matchOption(WORK_STATIONS, j.work_station),
  scope: j.scope ?? "",
  location: j.location ?? "",
  salaryMin: j.salary_min ?? "",
  salaryMax: j.salary_max ?? "",
  description: j.description ?? "",
});

const emptyForm = () => ({
  title: "",
  department: "",
  status: "active",
  employmentType: EMPLOYMENT_TYPES[0],
  workStation: WORK_STATIONS[0],
  scope: "",
  location: "",
  salaryMin: "",
  salaryMax: "",
  description: "",
});

const form = reactive(emptyForm());
const errors = reactive({});
const submitted = ref(false);
const titleInput = ref(null);

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k]);
  if (form.title.trim().length < 2) errors.title = "Enter a job title.";
  if (!form.department.trim()) errors.department = "Enter or pick a department.";
  if (!form.location.trim()) errors.location = "Enter a location.";

  const min = form.salaryMin === "" ? null : Number(form.salaryMin);
  const max = form.salaryMax === "" ? null : Number(form.salaryMax);
  if (max === null || !(max > 0)) errors.salaryMax = "Enter the maximum salary.";
  if (min !== null && !(min > 0)) errors.salaryMin = "Must be a positive number.";
  else if (min !== null && max > 0 && min > max) errors.salaryMin = "Can't be more than the maximum.";

  return Object.keys(errors).length === 0;
}

// re-check while typing, but only after the first submit attempt
watch(form, () => { if (submitted.value) validate(); });

const typeOptions = computed(() =>
  EMPLOYMENT_TYPES.includes(form.employmentType) ? EMPLOYMENT_TYPES : [...EMPLOYMENT_TYPES, form.employmentType]
);
const stationOptions = computed(() =>
  WORK_STATIONS.includes(form.workStation) ? WORK_STATIONS : [...WORK_STATIONS, form.workStation]
);

function submit() {
  submitted.value = true;
  if (!validate()) return;
  if (isEdit.value) {
    emit("updated", store.updateJob(props.job.id, { ...form }));
  } else {
    emit("created", store.addJob({ ...form }));
  }
  emit("close");
}

// fill the form each time the dialog opens
watch(
  () => props.open,
  async (isOpen) => {
    if (!isOpen) return;
    Object.assign(form, isEdit.value ? formFromJob(props.job) : emptyForm());
    Object.keys(errors).forEach((k) => delete errors[k]);
    submitted.value = false;
    await nextTick();
    titleInput.value?.focus();
  }
);
</script>

<template>
  <BaseModal :open="open" labelledby="job-form-title" @close="emit('close')">
    <header class="dialog-head">
      <div>
        <h2 id="job-form-title">{{ isEdit ? "Edit Job" : "Add New Job" }}</h2>
        <p>{{ isEdit ? "Update this opening on the jobs board" : "Post a new opening to the jobs board" }}</p>
      </div>
      <button class="btn-icon borderless btn-sm" aria-label="Close" @click="emit('close')">
        <i class="pi pi-times"></i>
      </button>
    </header>

    <form class="dialog-body" novalidate @submit.prevent="submit">
      <div class="form-grid">
        <div class="field span-2">
          <label class="field-label" for="job-title">Job title <span class="req">*</span></label>
          <input
            id="job-title"
            ref="titleInput"
            class="input"
            :class="{ invalid: errors.title }"
            v-model="form.title"
            type="text"
            placeholder="e.g. Senior Product Designer"
            autocomplete="off"
          />
          <p v-if="errors.title" class="field-error">{{ errors.title }}</p>
        </div>

        <div class="field">
          <label class="field-label" for="job-dept">Department <span class="req">*</span></label>
          <input
            id="job-dept"
            class="input"
            :class="{ invalid: errors.department }"
            v-model="form.department"
            type="text"
            list="job-dept-options"
            placeholder="e.g. Design"
            autocomplete="off"
          />
          <datalist id="job-dept-options">
            <option v-for="d in store.departments" :key="d" :value="d" />
          </datalist>
          <p v-if="errors.department" class="field-error">{{ errors.department }}</p>
        </div>

        <div class="field">
          <label class="field-label" for="job-status">Board column</label>
          <select id="job-status" class="select" v-model="form.status">
            <option v-for="s in JOB_STATUSES" :key="s.value" :value="s.value">{{ s.label }}</option>
          </select>
        </div>

        <div class="field">
          <label class="field-label" for="job-type">Employment type</label>
          <select id="job-type" class="select" v-model="form.employmentType">
            <option v-for="t in typeOptions" :key="t" :value="t">{{ t }}</option>
          </select>
        </div>

        <div class="field">
          <label class="field-label" for="job-station">Work station</label>
          <select id="job-station" class="select" v-model="form.workStation">
            <option v-for="w in stationOptions" :key="w" :value="w">{{ w }}</option>
          </select>
        </div>

        <div class="field">
          <label class="field-label" for="job-location">Location <span class="req">*</span></label>
          <input
            id="job-location"
            class="input"
            :class="{ invalid: errors.location }"
            v-model="form.location"
            type="text"
            placeholder="e.g. Remote - Texas"
          />
          <p v-if="errors.location" class="field-error">{{ errors.location }}</p>
        </div>

        <div class="field">
          <label class="field-label" for="job-scope">Skill tag</label>
          <input
            id="job-scope"
            class="input"
            v-model="form.scope"
            type="text"
            list="job-scope-options"
            placeholder="e.g. Designer"
            autocomplete="off"
          />
          <datalist id="job-scope-options">
            <option v-for="s in store.scopes" :key="s" :value="s" />
          </datalist>
        </div>

        <div class="field">
          <label class="field-label" for="job-min">Min salary / month (USD)</label>
          <input
            id="job-min"
            class="input"
            :class="{ invalid: errors.salaryMin }"
            v-model="form.salaryMin"
            type="number"
            min="0"
            step="1000"
            placeholder="e.g. 40000"
          />
          <p v-if="errors.salaryMin" class="field-error">{{ errors.salaryMin }}</p>
        </div>

        <div class="field">
          <label class="field-label" for="job-max">Max salary / month (USD) <span class="req">*</span></label>
          <input
            id="job-max"
            class="input"
            :class="{ invalid: errors.salaryMax }"
            v-model="form.salaryMax"
            type="number"
            min="0"
            step="1000"
            placeholder="e.g. 50000"
          />
          <p v-if="errors.salaryMax" class="field-error">{{ errors.salaryMax }}</p>
          <p v-else class="field-hint">Shown on the job card</p>
        </div>

        <div class="field span-2">
          <label class="field-label" for="job-desc">Description</label>
          <textarea
            id="job-desc"
            class="input"
            v-model="form.description"
            rows="3"
            placeholder="What will this person work on?"
          ></textarea>
        </div>
      </div>

      <footer class="dialog-foot">
        <button type="button" class="btn btn-outline" @click="emit('close')">Cancel</button>
        <button type="submit" class="btn btn-primary">
          <i class="pi pi-check"></i> {{ isEdit ? "Save Changes" : "Add Job" }}
        </button>
      </footer>
    </form>
  </BaseModal>
</template>
