<script setup>
import { ref, computed, watch, onMounted, nextTick } from "vue";
import { useCandidateStore, CANDIDATE_STATUSES } from "../../stores/candidates";
import { useEmployeeStore } from "../../stores/employees";
import CandidateFormModal from "./CandidateFormModal.vue";
import CandidateViewModal from "./CandidateViewModal.vue";
import EmployeeFormModal from "../employees/EmployeeFormModal.vue";
import ConfirmDialog from "../ui/ConfirmDialog.vue";
import ToastMessage from "../ui/ToastMessage.vue";

const store = useCandidateStore();
const employeeStore = useEmployeeStore();

onMounted(() => {
  store.fetchCandidates();
  employeeStore.fetchEmployees(); // needed for the Hire form's department list
});

/* ---------- search, filter, sort, pagination ---------- */
const searchQuery = ref("");
const statusFilter = ref("all");
const sortBy = ref("newest");
const pageSize = ref(10);
const page = ref(1);

const searched = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return store.candidates;
  return store.candidates.filter(
    (c) =>
      c.name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.position_applied?.toLowerCase().includes(q)
  );
});

const tabs = computed(() => [
  { value: "all", label: "All", count: searched.value.length },
  ...CANDIDATE_STATUSES.map((s) => ({
    value: s,
    label: s,
    count: searched.value.filter((c) => c.status === s).length,
  })),
]);

const SORTERS = {
  newest: (a, b) => (b.application_date ?? "").localeCompare(a.application_date ?? ""),
  oldest: (a, b) => (a.application_date ?? "").localeCompare(b.application_date ?? ""),
  name: (a, b) => (a.name ?? "").localeCompare(b.name ?? ""),
};

const filtered = computed(() => {
  const list =
    statusFilter.value === "all" ? searched.value : searched.value.filter((c) => c.status === statusFilter.value);
  return [...list].sort(SORTERS[sortBy.value]);
});

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize.value)));
const pageRows = computed(() => filtered.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value));
const rangeLabel = computed(() => {
  if (!filtered.value.length) return "0 of 0";
  const start = (page.value - 1) * pageSize.value + 1;
  const end = Math.min(page.value * pageSize.value, filtered.value.length);
  return `${start}–${end} of ${filtered.value.length}`;
});

// back to page 1 when the list changes shape; never sit on an empty page
watch([searchQuery, statusFilter, sortBy, pageSize], () => { page.value = 1; });
watch(totalPages, (n) => { if (page.value > n) page.value = n; });

/* ---------- selection ---------- */
const selectedIds = ref([]);
const selectedSet = computed(() => new Set(selectedIds.value));
const selected = computed(() => store.candidates.filter((c) => selectedSet.value.has(c.id)));
const deletableSelected = computed(() => selected.value.filter((c) => store.isAdded(c.id)));

const isSelected = (id) => selectedSet.value.has(id);
function toggle(id) {
  selectedIds.value = isSelected(id) ? selectedIds.value.filter((x) => x !== id) : [...selectedIds.value, id];
}
const pageAllSelected = computed(() => pageRows.value.length > 0 && pageRows.value.every((c) => isSelected(c.id)));
const pageSomeSelected = computed(() => !pageAllSelected.value && pageRows.value.some((c) => isSelected(c.id)));
function togglePage() {
  const ids = pageRows.value.map((c) => c.id);
  selectedIds.value = pageAllSelected.value
    ? selectedIds.value.filter((id) => !ids.includes(id))
    : [...new Set([...selectedIds.value, ...ids])];
}
const clearSelection = () => { selectedIds.value = []; };

// forget selections for candidates that no longer exist (e.g. deleted)
watch(
  () => store.candidates,
  (list) => {
    const ids = new Set(list.map((c) => c.id));
    if (selectedIds.value.some((id) => !ids.has(id))) selectedIds.value = selectedIds.value.filter((id) => ids.has(id));
  }
);

/* ---------- row helpers ---------- */
const STATUS_BADGE = { "In Progress": "badge-warning", Selected: "badge-success", Rejected: "badge-danger" };
const formatDate = (value) =>
  value ? new Date(`${value}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

const highlightId = ref(null);
async function flash(id) {
  highlightId.value = null;
  await nextTick();
  highlightId.value = id;
}

const toast = ref("");

/* ---------- dialogs ---------- */
// the selected record is kept after closing so the closing animation still has content
const formOpen = ref(false);
const editing = ref(null);
const viewOpen = ref(false);
const viewing = ref(null);
const confirmOpen = ref(false);
const deleting = ref([]); // candidates to delete (one or many)
const hireOpen = ref(false);
const hiring = ref(null);

const viewingLive = computed(() =>
  viewing.value ? store.candidates.find((c) => c.id === viewing.value.id) ?? null : null
);

function openAdd() {
  editing.value = null;
  formOpen.value = true;
}
function openEdit(candidate) {
  viewOpen.value = false;
  editing.value = candidate;
  formOpen.value = true;
}
function openView(candidate) {
  viewing.value = candidate;
  viewOpen.value = true;
}

function onCreated(candidate) {
  searchQuery.value = "";
  statusFilter.value = "all";
  sortBy.value = "newest";
  page.value = 1;
  flash(candidate.id);
  toast.value = `${candidate.name} was added to candidates`;
}
function onUpdated(candidate) {
  flash(candidate.id);
  toast.value = `${candidate.name}'s application was updated`;
}

function setStatus(candidate, status) {
  store.setStatus([candidate.id], status);
  flash(candidate.id);
  toast.value = `${candidate.name} moved to ${status}`;
}

// hired candidates stay "Selected"
function bulkSetStatus(status) {
  const movable = selected.value.filter((c) => status === "Selected" || !c.hiredEmployeeId);
  const skipped = selected.value.length - movable.length;
  store.setStatus(movable.map((c) => c.id), status);
  toast.value =
    `${movable.length} candidate${movable.length === 1 ? "" : "s"} moved to ${status}` +
    (skipped ? ` (${skipped} hired candidate${skipped === 1 ? "" : "s"} skipped)` : "");
  clearSelection();
}

function askDelete(candidates) {
  const list = candidates.filter((c) => store.isAdded(c.id));
  if (!list.length) return;
  viewOpen.value = false;
  deleting.value = list;
  confirmOpen.value = true;
}
function confirmDelete() {
  const removed = store.deleteCandidates(deleting.value.map((c) => c.id));
  confirmOpen.value = false;
  // a bulk delete finishes the bulk action, so drop the rest of the selection too
  if (removed.length > 1) clearSelection();
  if (removed.length === 1) toast.value = `${removed[0].name} was deleted`;
  else if (removed.length > 1) toast.value = `${removed.length} candidates were deleted`;
}
const skippedOnBulkDelete = computed(() => selected.value.length - deletableSelected.value.length);

// hiring: open the employee form pre-filled from the candidate
const hireInitial = computed(() =>
  hiring.value
    ? { name: hiring.value.name, title: hiring.value.position_applied, imagePath: hiring.value.imagePath }
    : null
);
function openHire(candidate) {
  viewOpen.value = false;
  hiring.value = candidate;
  hireOpen.value = true;
}
function onHired(employee) {
  store.markHired(hiring.value.id, employee.id);
  flash(hiring.value.id);
  toast.value = `${employee.name} was hired and added to ${employee.department}`;
}

/* ---------- export ---------- */
function exportCsv() {
  const rows = selected.value.length ? selected.value : filtered.value;
  const header = ["Name", "Applied For", "Applied Date", "Email", "Mobile", "Status", "Hired"];
  const cell = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [
    header.map(cell).join(","),
    ...rows.map((c) =>
      [c.name, c.position_applied, c.application_date, c.email, c.phone_number, c.status, c.hiredEmployeeId ? "Yes" : "No"]
        .map(cell)
        .join(",")
    ),
  ];
  const blob = new Blob([lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `candidates-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  toast.value = `Exported ${rows.length} candidate${rows.length === 1 ? "" : "s"} to CSV`;
}
</script>

<template>
  <section class="card">
    <!-- toolbar -->
    <div class="toolbar">
      <label class="search">
        <i class="pi pi-search"></i>
        <input class="input" type="text" v-model="searchQuery" placeholder="Search name, email or position..." />
      </label>
      <div class="toolbar-actions">
        <select class="select" v-model="sortBy" aria-label="Sort candidates">
          <option value="newest">Newest applied</option>
          <option value="oldest">Oldest applied</option>
          <option value="name">Name A–Z</option>
        </select>
        <button class="btn btn-outline" :disabled="!filtered.length" @click="exportCsv">
          <i class="pi pi-download"></i> Export{{ selected.length ? ` (${selected.length})` : "" }}
        </button>
        <button class="btn btn-primary" @click="openAdd"><i class="pi pi-plus"></i> Add Candidate</button>
      </div>
    </div>

    <!-- status tabs -->
    <div class="tabs" role="tablist" aria-label="Filter by status">
      <button
        v-for="t in tabs"
        :key="t.value"
        role="tab"
        class="tab"
        :class="{ active: statusFilter === t.value }"
        :aria-selected="statusFilter === t.value"
        @click="statusFilter = t.value"
      >
        {{ t.label }} <span class="tab-count">{{ t.count }}</span>
      </button>
    </div>

    <!-- bulk actions -->
    <Transition name="bulk">
      <div v-if="selected.length" class="bulk-bar">
        <span class="bulk-count">{{ selected.length }} selected</span>
        <div class="bulk-actions">
          <span class="bulk-label">Move to</span>
          <button v-for="s in CANDIDATE_STATUSES" :key="s" class="btn btn-outline btn-sm" @click="bulkSetStatus(s)">
            {{ s }}
          </button>
          <button
            class="btn btn-outline btn-sm danger-text"
            :disabled="!deletableSelected.length"
            :title="deletableSelected.length ? '' : 'Only candidates added in the app can be deleted'"
            @click="askDelete(selected)"
          >
            <i class="pi pi-trash"></i> Delete{{ deletableSelected.length ? ` (${deletableSelected.length})` : "" }}
          </button>
          <button class="btn btn-ghost btn-sm" @click="clearSelection">Clear</button>
        </div>
      </div>
    </Transition>

    <!-- table -->
    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th class="check">
              <input
                type="checkbox"
                aria-label="Select all on this page"
                :checked="pageAllSelected"
                :indeterminate.prop="pageSomeSelected"
                :disabled="!pageRows.length"
                @change="togglePage"
              />
            </th>
            <th>Candidate Name</th>
            <th>Applied For</th>
            <th>Applied Date</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="c in pageRows"
            :key="c.id"
            :class="{ 'row-selected': isSelected(c.id), 'row-new': c.id === highlightId }"
          >
            <td class="check">
              <input type="checkbox" :aria-label="`Select ${c.name}`" :checked="isSelected(c.id)" @change="toggle(c.id)" />
            </td>
            <td>
              <button class="person person-link" @click="openView(c)">
                <img class="avatar" :src="c.imagePath" alt="" />
                <span class="person-name">{{ c.name }}</span>
                <i v-if="c.hiredEmployeeId" class="pi pi-verified hired-icon" title="Hired"></i>
              </button>
            </td>
            <td>{{ c.position_applied }}</td>
            <td class="muted">{{ formatDate(c.application_date) }}</td>
            <td>
              <div class="contact">
                <a class="email" :href="`mailto:${c.email}`">{{ c.email }}</a>
                <span class="phone">{{ c.phone_number || "No phone" }}</span>
              </div>
            </td>
            <td><span class="badge" :class="STATUS_BADGE[c.status]">{{ c.status }}</span></td>
            <td>
              <div class="actions">
                <button class="btn-icon borderless btn-sm" title="View" :aria-label="`View ${c.name}`" @click="openView(c)">
                  <i class="pi pi-eye"></i>
                </button>
                <button class="btn-icon borderless btn-sm" title="Edit" :aria-label="`Edit ${c.name}`" @click="openEdit(c)">
                  <i class="pi pi-pencil"></i>
                </button>
                <button
                  class="btn-icon borderless btn-sm danger"
                  :title="store.isAdded(c.id) ? 'Delete' : 'Only candidates added in the app can be deleted'"
                  :aria-label="`Delete ${c.name}`"
                  :disabled="!store.isAdded(c.id)"
                  @click="askDelete([c])"
                >
                  <i class="pi pi-trash"></i>
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="store.isLoading && !filtered.length">
            <td colspan="7" class="empty-state"><i class="pi pi-spin pi-spinner"></i>Loading candidates…</td>
          </tr>
          <tr v-else-if="store.error">
            <td colspan="7" class="empty-state"><i class="pi pi-exclamation-triangle"></i>{{ store.error }}</td>
          </tr>
          <tr v-else-if="!filtered.length">
            <td colspan="7" class="empty-state">
              <i class="pi pi-search"></i>
              {{ searchQuery || statusFilter !== "all" ? "No candidates match these filters" : "No candidates yet" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- pagination -->
    <div class="card-footer">
      <div class="pager">
        <span>Rows per page</span>
        <select class="select select-sm" v-model.number="pageSize" aria-label="Rows per page">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="15">15</option>
        </select>
      </div>
      <div class="pager">
        <span>{{ rangeLabel }}</span>
        <button class="btn-icon btn-sm" aria-label="Previous page" :disabled="page <= 1" @click="page--">
          <i class="pi pi-angle-left"></i>
        </button>
        <span class="page-num">Page {{ page }} of {{ totalPages }}</span>
        <button class="btn-icon btn-sm" aria-label="Next page" :disabled="page >= totalPages" @click="page++">
          <i class="pi pi-angle-right"></i>
        </button>
      </div>
    </div>

    <!-- dialogs -->
    <CandidateFormModal
      :open="formOpen"
      :candidate="editing"
      @close="formOpen = false"
      @created="onCreated"
      @updated="onUpdated"
    />
    <CandidateViewModal
      :open="viewOpen"
      :candidate="viewingLive"
      :can-delete="!!viewingLive && store.isAdded(viewingLive.id)"
      @close="viewOpen = false"
      @edit="openEdit"
      @delete="askDelete([$event])"
      @set-status="setStatus"
      @hire="openHire"
    />
    <EmployeeFormModal
      :open="hireOpen"
      :initial="hireInitial"
      :heading="hiring ? `Hire ${hiring.name}` : ''"
      @close="hireOpen = false"
      @created="onHired"
    />
    <ConfirmDialog
      :open="confirmOpen"
      :title="deleting.length > 1 ? `Delete ${deleting.length} candidates?` : 'Delete candidate?'"
      confirm-label="Delete"
      danger
      @cancel="confirmOpen = false"
      @confirm="confirmDelete"
    >
      <template v-if="deleting.length === 1">
        <strong>{{ deleting[0].name }}</strong>'s application for {{ deleting[0].position_applied }} will be
        permanently removed. This can't be undone.
      </template>
      <template v-else>
        <strong>{{ deleting.length }} candidates</strong> will be permanently removed. This can't be undone.
        <template v-if="skippedOnBulkDelete">
          {{ skippedOnBulkDelete }} candidate{{ skippedOnBulkDelete === 1 ? "" : "s" }} from the original list will be kept.
        </template>
      </template>
    </ConfirmDialog>
    <ToastMessage :message="toast" @clear="toast = ''" />
  </section>
</template>

<style scoped>
.toolbar-actions .select {
  min-width: 160px;
}

/* status tabs */
.tabs {
  display: flex;
  gap: 4px;
  padding: 0 20px;
  border-bottom: 1px solid var(--border);
  overflow-x: auto;
}
.tab {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px 12px;
  color: var(--text-muted);
  font-size: var(--fs-base);
  font-weight: 500;
  white-space: nowrap;
  transition: color 0.15s ease;
}
.tab:hover {
  color: var(--text);
}
.tab.active {
  color: var(--accent-text);
}
.tab.active::after {
  content: "";
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: -1px;
  height: 2px;
  border-radius: 2px;
  background: var(--accent);
}
.tab-count {
  min-width: 22px;
  padding: 1px 7px;
  border-radius: var(--radius-pill);
  background: var(--neutral-soft);
  color: var(--text-muted);
  font-size: var(--fs-xs);
  text-align: center;
}
.tab.active .tab-count {
  background: var(--accent-soft);
  color: var(--accent-text);
}

/* bulk bar */
.bulk-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 20px;
  background: var(--accent-soft);
  border-bottom: 1px solid var(--border);
}
.bulk-count {
  font-weight: 600;
  color: var(--accent-text);
}
.bulk-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}
.bulk-label {
  margin-right: 2px;
  font-size: var(--fs-sm);
  color: var(--text-muted);
}
.danger-text,
.danger-text .pi {
  color: var(--danger);
}
.danger-text:hover:not(:disabled) {
  background: var(--danger-soft);
  border-color: var(--danger);
}
.bulk-enter-active,
.bulk-leave-active {
  transition: opacity 0.15s ease;
}
.bulk-enter-from,
.bulk-leave-to {
  opacity: 0;
}

/* table */
.data-table .check {
  width: 48px;
  padding-right: 0;
}
.person-link {
  text-align: left;
  border-radius: 8px;
}
.person-link:hover .person-name {
  color: var(--accent-text);
}
.hired-icon {
  color: var(--accent-text);
  font-size: var(--fs-sm);
}
.contact {
  display: flex;
  flex-direction: column;
  line-height: 1.35;
}
.email {
  color: var(--text);
}
.email:hover {
  color: var(--accent-text);
  text-decoration: underline;
}
.phone {
  font-size: var(--fs-sm);
  color: var(--text-muted);
}
.data-table tbody tr.row-selected {
  background: var(--accent-soft);
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

/* pagination */
.page-num {
  min-width: 90px;
  text-align: center;
}

@media (max-width: 640px) {
  .toolbar-actions {
    width: 100%;
  }
  .toolbar-actions .select {
    flex: 1;
    min-width: 0;
  }
  .tabs {
    padding: 0 12px;
  }
  .bulk-bar {
    padding: 10px 16px;
  }
  .page-num {
    display: none;
  }
}
</style>
