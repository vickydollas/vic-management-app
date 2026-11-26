<script setup>
import { computed } from "vue";
import BaseModal from "../ui/BaseModal.vue";
import { JOB_STATUSES } from "../../stores/jobs";

// read-only job details
const props = defineProps({
  open: Boolean,
  job: { type: Object, default: null },
  // only jobs added in the app can be deleted
  canDelete: Boolean,
});
const emit = defineEmits(["close", "edit", "delete"]);

const statusLabel = computed(() => JOB_STATUSES.find((s) => s.value === props.job?.status)?.label ?? "—");
const statusClass = computed(() => {
  switch (props.job?.status) {
    case "active": return "badge-success";
    case "inactive": return "badge-warning";
    case "completed": return "badge-accent";
    default: return "";
  }
});

const money = (v) => `$${Number(v).toLocaleString()}`;
const salaryRange = computed(() => {
  const { salary_min: min, salary_max: max } = props.job ?? {};
  if (!max) return "—";
  return min && min !== max ? `${money(min)} – ${money(max)}` : money(max);
});

const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "";
</script>

<template>
  <BaseModal :open="open" labelledby="job-view-title" @close="emit('close')">
    <template v-if="job">
      <header class="job-view-head">
        <span class="icon-tile big"><i class="pi pi-briefcase"></i></span>
        <div class="job-id">
          <h2 id="job-view-title">{{ job.title }}</h2>
          <p>{{ job.department }}</p>
          <div class="tags">
            <span class="badge" :class="statusClass"><span class="dot"></span>{{ statusLabel }}</span>
            <span v-if="job.scope" class="chip">{{ job.scope }}</span>
            <span v-if="job.employment_type" class="chip">{{ job.employment_type }}</span>
            <span v-if="job.work_station" class="chip">{{ job.work_station }}</span>
          </div>
        </div>
        <button class="btn-icon borderless btn-sm close" aria-label="Close" @click="emit('close')">
          <i class="pi pi-times"></i>
        </button>
      </header>

      <div class="job-view-body">
        <dl>
          <div>
            <dt><i class="pi pi-map-marker"></i> Location</dt>
            <dd>{{ job.location || "—" }}</dd>
          </div>
          <div>
            <dt><i class="pi pi-wallet"></i> Salary / month</dt>
            <dd>{{ salaryRange }}</dd>
          </div>
        </dl>

        <section class="desc">
          <h3>Description</h3>
          <p v-if="job.description">{{ job.description }}</p>
          <p v-else class="subtle">No description yet.</p>
        </section>

        <p v-if="job.createdAt || job.updatedAt" class="meta">
          <i class="pi pi-info-circle"></i>
          <span>
            <template v-if="job.createdAt">Added in the app on {{ formatDate(job.createdAt) }}</template>
            <template v-if="job.createdAt && job.updatedAt"> · </template>
            <template v-if="job.updatedAt">{{ job.createdAt ? "last" : "Last" }} edited {{ formatDate(job.updatedAt) }}</template>
          </span>
        </p>
      </div>

      <footer class="job-view-foot">
        <button v-if="canDelete" class="btn btn-outline danger-text" @click="emit('delete', job)">
          <i class="pi pi-trash"></i> Delete
        </button>
        <div class="spacer"></div>
        <button class="btn btn-outline" @click="emit('close')">Close</button>
        <button class="btn btn-primary" @click="emit('edit', job)"><i class="pi pi-pencil"></i> Edit</button>
      </footer>
    </template>
  </BaseModal>
</template>

<style scoped>
.job-view-head {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(135deg, var(--accent-soft), transparent 70%);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}
.icon-tile.big {
  width: 56px;
  height: 56px;
  font-size: 1.4rem;
  border-radius: 14px;
}
.job-id {
  flex: 1;
  min-width: 0;
}
.job-id h2 {
  font-size: var(--fs-xl);
  font-weight: 600;
  color: var(--text);
}
.job-id p {
  color: var(--text-muted);
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}
.badge .dot {
  width: 6px;
  height: 6px;
}
.close {
  margin: -6px -6px 0 0;
}

.job-view-body {
  padding: 20px 24px 8px;
}
dl {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
dl > div {
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--surface-2);
  border: 1px solid var(--border);
}
dt {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--fs-sm);
  color: var(--text-muted);
}
dt .pi {
  font-size: var(--fs-xs);
}
dd {
  margin-top: 4px;
  font-weight: 600;
  color: var(--text);
}
.desc {
  margin-top: 20px;
}
.desc h3 {
  margin-bottom: 6px;
  font-size: var(--fs-xs);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-subtle);
}
.desc p {
  color: var(--text);
  line-height: 1.6;
  white-space: pre-line;
}
.meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 18px 0 8px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--surface-2);
  font-size: var(--fs-sm);
  color: var(--text-muted);
}

.job-view-foot {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 24px;
  margin-top: 12px;
  border-top: 1px solid var(--border);
}
.spacer {
  flex: 1;
}
.danger-text,
.danger-text .pi {
  color: var(--danger);
}
.danger-text:hover {
  background: var(--danger-soft);
  border-color: var(--danger);
}

@media (max-width: 560px) {
  .job-view-head {
    padding: 20px 16px;
    border-radius: 20px 20px 0 0;
  }
  .job-view-body {
    padding: 16px 16px 4px;
  }
  dl {
    grid-template-columns: minmax(0, 1fr);
  }
  .job-view-foot {
    position: sticky;
    bottom: 0;
    flex-wrap: wrap;
    padding: 14px 16px;
    background: var(--surface);
  }
  .job-view-foot .spacer {
    display: none;
  }
  .job-view-foot .btn {
    flex: 1;
  }
}
</style>
