<script setup>
import { reactive, ref, computed, watch, nextTick } from "vue";
import BaseModal from "../ui/BaseModal.vue";
import AvatarPicker from "../ui/AvatarPicker.vue";
import { useCandidateStore, CANDIDATE_STATUSES } from "../../stores/candidates";
import { useJobStore } from "../../stores/jobs";
import { AVATARS } from "../../stores/employees";

// one form for adding and editing: pass `candidate` to edit
const props = defineProps({
  open: Boolean,
  candidate: { type: Object, default: null },
});
const emit = defineEmits(["close", "created", "updated"]);

const store = useCandidateStore();
const jobStore = useJobStore();
const isEdit = computed(() => !!props.candidate);

const today = () => new Date().toISOString().slice(0, 10);

const emptyForm = () => ({
  imagePath: AVATARS[0],
  name: "",
  email: "",
  phone: "",
  position: "",
  applicationDate: today(),
  status: CANDIDATE_STATUSES[0],
  notes: "",
});

const formFromCandidate = (c) => ({
  imagePath: c.imagePath || AVATARS[0],
  name: c.name ?? "",
  email: c.email ?? "",
  phone: c.phone_number ?? "",
  position: c.position_applied ?? "",
  applicationDate: c.application_date ?? today(),
  status: c.status ?? CANDIDATE_STATUSES[0],
  notes: c.notes ?? "",
});

const form = reactive(emptyForm());
const errors = reactive({});
const submitted = ref(false);
const nameInput = ref(null);

// "Applied for" suggestions: positions already used + titles on the jobs board
const positionOptions = computed(() =>
  [...new Set([...store.positions, ...jobStore.jobs.map((j) => j.title)])].sort()
);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k]);
  if (form.name.trim().length < 2) errors.name = "Enter the candidate's full name.";

  const email = form.email.trim().toLowerCase();
  if (!email) errors.email = "Enter an email address.";
  else if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  else if (store.candidates.some((c) => c.email?.toLowerCase() === email && c.id !== props.candidate?.id)) {
    errors.email = "Another candidate already uses this email.";
  }

  const digits = form.phone.replace(/\D/g, "");
  if (form.phone.trim() && (digits.length < 7 || /[^\d\s()+\-.]/.test(form.phone))) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!form.position.trim()) errors.position = "Enter the position applied for.";
  if (!form.applicationDate) errors.applicationDate = "Choose the application date.";
  else if (form.applicationDate > today()) errors.applicationDate = "The date can't be in the future.";

  return Object.keys(errors).length === 0;
}

// re-check while typing, but only after the first submit attempt
watch(form, () => { if (submitted.value) validate(); });

function submit() {
  submitted.value = true;
  if (!validate()) return;
  if (isEdit.value) {
    emit("updated", store.updateCandidate(props.candidate.id, { ...form }));
  } else {
    emit("created", store.addCandidate({ ...form }));
  }
  emit("close");
}

// fill the form each time the dialog opens
watch(
  () => props.open,
  async (isOpen) => {
    if (!isOpen) return;
    jobStore.fetchJobs();
    Object.assign(form, isEdit.value ? formFromCandidate(props.candidate) : emptyForm());
    Object.keys(errors).forEach((k) => delete errors[k]);
    submitted.value = false;
    await nextTick();
    nameInput.value?.focus();
  }
);
</script>

<template>
  <BaseModal :open="open" labelledby="candidate-form-title" @close="emit('close')">
    <header class="dialog-head">
      <div>
        <h2 id="candidate-form-title">{{ isEdit ? "Edit Candidate" : "Add New Candidate" }}</h2>
        <p>{{ isEdit ? "Update this candidate's application" : "Record a new application" }}</p>
      </div>
      <button class="btn-icon borderless btn-sm" aria-label="Close" @click="emit('close')">
        <i class="pi pi-times"></i>
      </button>
    </header>

    <form class="dialog-body" novalidate @submit.prevent="submit">
      <AvatarPicker v-model="form.imagePath" name="candidate-avatar" />

      <div class="form-grid">
        <div class="field span-2">
          <label class="field-label" for="cand-name">Full name <span class="req">*</span></label>
          <input
            id="cand-name"
            ref="nameInput"
            class="input"
            :class="{ invalid: errors.name }"
            v-model="form.name"
            type="text"
            placeholder="e.g. Amara Okafor"
            autocomplete="off"
          />
          <p v-if="errors.name" class="field-error">{{ errors.name }}</p>
        </div>

        <div class="field">
          <label class="field-label" for="cand-email">Email address <span class="req">*</span></label>
          <input
            id="cand-email"
            class="input"
            :class="{ invalid: errors.email }"
            v-model="form.email"
            type="email"
            placeholder="name@example.com"
            autocomplete="off"
          />
          <p v-if="errors.email" class="field-error">{{ errors.email }}</p>
        </div>

        <div class="field">
          <label class="field-label" for="cand-phone">Mobile number</label>
          <input
            id="cand-phone"
            class="input"
            :class="{ invalid: errors.phone }"
            v-model="form.phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
          />
          <p v-if="errors.phone" class="field-error">{{ errors.phone }}</p>
        </div>

        <div class="field">
          <label class="field-label" for="cand-position">Applied for <span class="req">*</span></label>
          <input
            id="cand-position"
            class="input"
            :class="{ invalid: errors.position }"
            v-model="form.position"
            type="text"
            list="cand-position-options"
            placeholder="e.g. UI/UX Designer"
            autocomplete="off"
          />
          <datalist id="cand-position-options">
            <option v-for="p in positionOptions" :key="p" :value="p" />
          </datalist>
          <p v-if="errors.position" class="field-error">{{ errors.position }}</p>
        </div>

        <div class="field">
          <label class="field-label" for="cand-date">Applied date <span class="req">*</span></label>
          <input
            id="cand-date"
            class="input"
            :class="{ invalid: errors.applicationDate }"
            v-model="form.applicationDate"
            type="date"
            :max="today()"
          />
          <p v-if="errors.applicationDate" class="field-error">{{ errors.applicationDate }}</p>
        </div>

        <div class="field span-2">
          <label class="field-label">Status</label>
          <div class="segmented" role="radiogroup" aria-label="Status">
            <label v-for="s in CANDIDATE_STATUSES" :key="s" :class="{ active: form.status === s }">
              <input type="radio" name="cand-status" :value="s" v-model="form.status" />
              {{ s }}
            </label>
          </div>
        </div>

        <div class="field span-2">
          <label class="field-label" for="cand-notes">Notes</label>
          <textarea
            id="cand-notes"
            class="input"
            v-model="form.notes"
            rows="3"
            placeholder="Interview feedback, availability, salary expectations…"
          ></textarea>
        </div>
      </div>

      <footer class="dialog-foot">
        <button type="button" class="btn btn-outline" @click="emit('close')">Cancel</button>
        <button type="submit" class="btn btn-primary">
          <i class="pi pi-check"></i> {{ isEdit ? "Save Changes" : "Add Candidate" }}
        </button>
      </footer>
    </form>
  </BaseModal>
</template>

<style scoped>
.segmented {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  padding: 4px;
  border-radius: 12px;
  background: var(--surface-2);
  border: 1px solid var(--border);
}
.segmented label {
  position: relative;
  display: grid;
  place-items: center;
  height: 34px;
  border-radius: 9px;
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--text-muted);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.segmented label:hover {
  color: var(--text);
}
.segmented input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.segmented label.active {
  background: var(--surface);
  color: var(--text);
  box-shadow: var(--shadow-sm);
}
.segmented label:has(input:focus-visible) {
  box-shadow: var(--ring);
}
</style>
