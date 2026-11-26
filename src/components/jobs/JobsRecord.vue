<script setup>
import { onMounted, ref, computed, nextTick } from "vue";
import { useJobStore, JOB_STATUSES } from "../../stores/jobs";
import JobFormModal from "./JobFormModal.vue";
import JobViewModal from "./JobViewModal.vue";
import ConfirmDialog from "../ui/ConfirmDialog.vue";
import ToastMessage from "../ui/ToastMessage.vue";

const store = useJobStore();
const searchQuery = ref("");
const toast = ref("");
const highlightId = ref(null);

// dialogs (the selected job is kept after closing so the closing animation has content)
const formOpen = ref(false);
const editing = ref(null);
const viewOpen = ref(false);
const viewing = ref(null);
const confirmOpen = ref(false);
const deleting = ref(null);

onMounted(() => store.fetchJobs());

const filtered = computed(() => {
  const search = searchQuery.value.trim().toLowerCase();
  if (!search) return store.jobs;
  return store.jobs.filter(
    (job) =>
      job.title?.toLowerCase().includes(search) ||
      job.department?.toLowerCase().includes(search)
  );
});

const columns = computed(() => [
  { key: "active", title: "Active Jobs", tone: "success", jobs: filtered.value.filter((j) => j.status === "active") },
  { key: "inactive", title: "Inactive Jobs", tone: "warning", jobs: filtered.value.filter((j) => j.status === "inactive") },
  { key: "completed", title: "Completed Jobs", tone: "accent", jobs: filtered.value.filter((j) => j.status === "completed") },
]);

// always show the latest version of the job being viewed (e.g. after an edit)
const viewingLive = computed(() =>
  viewing.value ? store.jobs.find((j) => j.id === viewing.value.id) ?? viewing.value : null
);

const money = (value) => `$${Number(value).toLocaleString()}`;
const columnLabel = (status) => JOB_STATUSES.find((s) => s.value === status)?.label ?? "";

// briefly highlight a card (reset first so the animation replays)
async function flash(id) {
  highlightId.value = null;
  await nextTick();
  highlightId.value = id;
}

function openAdd() {
  editing.value = null;
  formOpen.value = true;
}
function openEdit(job) {
  viewOpen.value = false;
  editing.value = job;
  formOpen.value = true;
}
function openView(job) {
  viewing.value = job;
  viewOpen.value = true;
}
function askDelete(job) {
  if (!store.isAdded(job.id)) return;
  viewOpen.value = false;
  deleting.value = job;
  confirmOpen.value = true;
}

// new jobs go to the top of their column: clear the search so they're visible
function onCreated(job) {
  searchQuery.value = "";
  flash(job.id);
  toast.value = `"${job.title}" was added to ${columnLabel(job.status)} Jobs`;
}
function onUpdated(job) {
  flash(job.id);
  toast.value = `"${job.title}" was updated`;
}
function confirmDelete() {
  const removed = store.deleteJob(deleting.value.id);
  confirmOpen.value = false;
  if (removed) toast.value = `"${removed.title}" was deleted`;
}
</script>

<template>
  <div class="jobs">
    <div class="toolbar card">
      <label class="search">
        <i class="pi pi-search"></i>
        <input class="input" type="text" v-model="searchQuery" placeholder="Search jobs..." />
      </label>
      <button class="btn btn-primary" @click="openAdd"><i class="pi pi-plus"></i> Add New Job</button>
    </div>

    <div class="board">
      <section v-for="col in columns" :key="col.key" class="column">
        <header class="column-head">
          <span class="dot" :class="`tone-${col.tone}`"></span>
          <h2>{{ col.title }}</h2>
          <span class="badge">{{ col.jobs.length }}</span>
        </header>

        <article
          v-for="job in col.jobs"
          :key="job.id"
          class="job card"
          :class="{ 'job-new': job.id === highlightId }"
          role="button"
          tabindex="0"
          :aria-label="`View ${job.title}`"
          @click="openView(job)"
          @keydown.enter.self="openView(job)"
        >
          <div class="job-head">
            <span class="icon-tile"><i class="pi pi-briefcase"></i></span>
            <div class="job-title">
              <h3>{{ job.title }}</h3>
              <p>{{ job.department }}</p>
            </div>
            <div class="job-actions" @click.stop @keydown.stop>
              <button class="btn-icon borderless btn-sm" title="View" :aria-label="`View ${job.title}`" @click="openView(job)">
                <i class="pi pi-eye"></i>
              </button>
              <button class="btn-icon borderless btn-sm" title="Edit" :aria-label="`Edit ${job.title}`" @click="openEdit(job)">
                <i class="pi pi-pencil"></i>
              </button>
              <button
                class="btn-icon borderless btn-sm danger"
                :title="store.isAdded(job.id) ? 'Delete' : 'Only jobs added in the app can be deleted'"
                :aria-label="`Delete ${job.title}`"
                :disabled="!store.isAdded(job.id)"
                @click="askDelete(job)"
              >
                <i class="pi pi-trash"></i>
              </button>
            </div>
          </div>
          <div class="chips">
            <span v-if="job.scope" class="chip">{{ job.scope }}</span>
            <span v-if="job.employment_type" class="chip">{{ job.employment_type }}</span>
            <span v-if="job.work_station" class="chip">{{ job.work_station }}</span>
          </div>
          <div class="job-foot">
            <span class="location"><i class="pi pi-map-marker"></i>{{ job.location }}</span>
            <span class="salary">{{ money(job.salary_max) }}<small> / Month</small></span>
          </div>
        </article>

        <p v-if="store.isLoading && col.jobs.length === 0" class="empty">Loading jobs…</p>
        <p v-else-if="col.jobs.length === 0" class="empty">No jobs here</p>
      </section>
    </div>

    <JobFormModal
      :open="formOpen"
      :job="editing"
      @close="formOpen = false"
      @created="onCreated"
      @updated="onUpdated"
    />
    <JobViewModal
      :open="viewOpen"
      :job="viewingLive"
      :can-delete="!!viewingLive && store.isAdded(viewingLive.id)"
      @close="viewOpen = false"
      @edit="openEdit"
      @delete="askDelete"
    />
    <ConfirmDialog
      :open="confirmOpen"
      title="Delete job?"
      confirm-label="Delete"
      danger
      @cancel="confirmOpen = false"
      @confirm="confirmDelete"
    >
      <template v-if="deleting">
        <strong>{{ deleting.title }}</strong> ({{ deleting.department }}) will be permanently removed
        from the jobs board. This can't be undone.
      </template>
    </ConfirmDialog>
    <ToastMessage :message="toast" @clear="toast = ''" />
  </div>
</template>

<style scoped>
.jobs {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.board {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  align-items: start;
}
.column {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px;
  border-radius: var(--radius-lg);
  background: var(--surface-2);
  border: 1px solid var(--border);
}
.column-head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 2px 4px 4px;
}
.column-head h2 {
  font-size: var(--fs-md);
  font-weight: 600;
  color: var(--text);
}
.column-head .badge {
  margin-left: auto;
  background: var(--surface);
}
.tone-success { color: var(--success); }
.tone-warning { color: var(--warning); }
.tone-accent  { color: var(--accent); }

.job {
  padding: 16px;
  border-radius: var(--radius);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}
.job-new {
  animation: job-flash 2.4s ease-out;
}
@keyframes job-flash {
  0%,
  40% {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
  }
  100% {
    border-color: var(--border);
    box-shadow: var(--shadow-sm);
  }
}
.job:hover {
  transform: translateY(-2px);
  border-color: var(--border-strong);
  box-shadow: var(--shadow-md);
}
.job:focus-visible {
  border-color: var(--accent);
}
.job-head {
  display: flex;
  align-items: center;
  gap: 12px;
}
.job-title {
  flex: 1;
  min-width: 0;
}
.job-title h3 {
  font-size: var(--fs-base);
  font-weight: 600;
  color: var(--text);
}
.job-title p {
  font-size: var(--fs-sm);
  color: var(--text-muted);
}
.job-actions {
  display: flex;
  align-self: flex-start;
  gap: 2px;
  margin: -4px -6px 0 0;
  cursor: default;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 16px 0;
}
.job-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid var(--border);
  font-size: var(--fs-sm);
}
.location {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.location .pi {
  font-size: var(--fs-xs);
}
.salary {
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
}
.salary small {
  font-weight: 400;
  color: var(--text-subtle);
}
.empty {
  padding: 24px 0;
  text-align: center;
  font-size: var(--fs-sm);
  color: var(--text-subtle);
}

@media (max-width: 1200px) {
  .board {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 720px) {
  .board {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
