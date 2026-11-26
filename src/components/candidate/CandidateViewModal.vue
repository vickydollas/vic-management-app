<script setup>
import { computed } from "vue";
import BaseModal from "../ui/BaseModal.vue";
import { CANDIDATE_STATUSES } from "../../stores/candidates";

// candidate profile with quick status changes
const props = defineProps({
  open: Boolean,
  candidate: { type: Object, default: null },
  // only candidates added in the app can be deleted
  canDelete: Boolean,
});
const emit = defineEmits(["close", "edit", "delete", "set-status", "hire"]);

const STATUS_STYLE = {
  "In Progress": { badge: "badge-warning", icon: "pi-clock" },
  Selected: { badge: "badge-success", icon: "pi-check-circle" },
  Rejected: { badge: "badge-danger", icon: "pi-times-circle" },
};
const statusBadge = computed(() => STATUS_STYLE[props.candidate?.status]?.badge ?? "");

const formatDate = (value) =>
  value
    ? new Date(value.length === 10 ? `${value}T00:00:00` : value).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";
const telHref = (phone) => `tel:${String(phone).replace(/[^\d+]/g, "")}`;
</script>

<template>
  <BaseModal :open="open" labelledby="candidate-view-title" @close="emit('close')">
    <template v-if="candidate">
      <header class="profile-head">
        <img class="profile-avatar" :src="candidate.imagePath" alt="" />
        <div class="profile-id">
          <h2 id="candidate-view-title">{{ candidate.name }}</h2>
          <p>Applied for <strong>{{ candidate.position_applied }}</strong></p>
          <div class="tags">
            <span class="badge" :class="statusBadge">{{ candidate.status }}</span>
            <span v-if="candidate.hiredEmployeeId" class="badge badge-accent">
              <i class="pi pi-verified"></i> Hired
            </span>
          </div>
        </div>
        <button class="btn-icon borderless btn-sm close" aria-label="Close" @click="emit('close')">
          <i class="pi pi-times"></i>
        </button>
      </header>

      <div class="profile-body">
        <section>
          <h3>Pipeline status</h3>
          <div class="stages" role="group" aria-label="Change status">
            <button
              v-for="s in CANDIDATE_STATUSES"
              :key="s"
              class="stage"
              :class="[{ active: candidate.status === s }, `stage-${s.replace(' ', '-').toLowerCase()}`]"
              :aria-pressed="candidate.status === s"
              :disabled="!!candidate.hiredEmployeeId && s !== 'Selected'"
              @click="candidate.status !== s && emit('set-status', candidate, s)"
            >
              <i class="pi" :class="STATUS_STYLE[s].icon"></i> {{ s }}
            </button>
          </div>
          <p v-if="candidate.hiredEmployeeId" class="hint">
            Hired on {{ formatDate(candidate.hiredAt) }} — the status is locked to Selected.
          </p>
        </section>

        <section>
          <h3>Contact & application</h3>
          <dl>
            <div>
              <dt>Email</dt>
              <dd><a class="link" :href="`mailto:${candidate.email}`">{{ candidate.email }}</a></dd>
            </div>
            <div>
              <dt>Mobile</dt>
              <dd>
                <a v-if="candidate.phone_number" class="link" :href="telHref(candidate.phone_number)">
                  {{ candidate.phone_number }}
                </a>
                <span v-else>—</span>
              </dd>
            </div>
            <div><dt>Applied for</dt><dd>{{ candidate.position_applied }}</dd></div>
            <div><dt>Applied on</dt><dd>{{ formatDate(candidate.application_date) }}</dd></div>
          </dl>
        </section>

        <section v-if="candidate.notes">
          <h3>Notes</h3>
          <p class="notes">{{ candidate.notes }}</p>
        </section>

        <p v-if="candidate.createdAt || candidate.updatedAt" class="meta">
          <i class="pi pi-info-circle"></i>
          <span>
            <template v-if="candidate.createdAt">Added in the app on {{ formatDate(candidate.createdAt) }}</template>
            <template v-if="candidate.createdAt && candidate.updatedAt"> · </template>
            <template v-if="candidate.updatedAt">
              {{ candidate.createdAt ? "last" : "Last" }} updated {{ formatDate(candidate.updatedAt) }}
            </template>
          </span>
        </p>
      </div>

      <footer class="profile-foot">
        <button v-if="canDelete" class="btn btn-outline danger-text" @click="emit('delete', candidate)">
          <i class="pi pi-trash"></i> Delete
        </button>
        <div class="spacer"></div>
        <button
          v-if="candidate.status === 'Selected' && !candidate.hiredEmployeeId"
          class="btn btn-outline hire"
          @click="emit('hire', candidate)"
        >
          <i class="pi pi-user-plus"></i> Hire
        </button>
        <button class="btn btn-outline" @click="emit('edit', candidate)"><i class="pi pi-pencil"></i> Edit</button>
        <button class="btn btn-primary" @click="emit('close')">Done</button>
      </footer>
    </template>
  </BaseModal>
</template>

<style scoped>
.profile-head {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 24px;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(135deg, var(--accent-soft), transparent 70%);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}
.profile-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  background: var(--surface-3);
  border: 3px solid var(--surface);
  box-shadow: var(--shadow-sm);
}
.profile-id {
  flex: 1;
  min-width: 0;
}
.profile-id h2 {
  font-size: var(--fs-xl);
  font-weight: 600;
  color: var(--text);
}
.profile-id p {
  color: var(--text-muted);
}
.profile-id strong {
  color: var(--text);
  font-weight: 500;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}
.close {
  align-self: flex-start;
  margin: -6px -6px 0 0;
}

.profile-body {
  padding: 4px 24px 4px;
}
section {
  padding: 18px 0;
}
section + section {
  border-top: 1px solid var(--border);
}
h3 {
  margin-bottom: 12px;
  font-size: var(--fs-xs);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-subtle);
}

/* pipeline stages */
.stages {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.stage {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid var(--border-strong);
  background: var(--surface);
  color: var(--text-muted);
  font-size: var(--fs-sm);
  font-weight: 500;
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
.stage:hover:not(:disabled) {
  background: var(--surface-2);
  color: var(--text);
}
.stage:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.stage-in-progress.active {
  background: var(--warning-soft);
  border-color: var(--warning);
  color: var(--warning);
}
.stage-selected.active {
  background: var(--success-soft);
  border-color: var(--success);
  color: var(--success);
}
.stage-rejected.active {
  background: var(--danger-soft);
  border-color: var(--danger);
  color: var(--danger);
}
.hint {
  margin-top: 10px;
  font-size: var(--fs-sm);
  color: var(--text-muted);
}

dl {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 20px;
}
dt {
  font-size: var(--fs-sm);
  color: var(--text-muted);
}
dd {
  margin-top: 2px;
  font-weight: 500;
  color: var(--text);
  overflow-wrap: anywhere;
}
dd .link {
  font-size: var(--fs-base);
}
.notes {
  color: var(--text);
  line-height: 1.6;
  white-space: pre-line;
}
.meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px 0 14px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--surface-2);
  font-size: var(--fs-sm);
  color: var(--text-muted);
}

.profile-foot {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 24px;
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
.hire,
.hire .pi {
  color: var(--success);
}
.hire:hover {
  background: var(--success-soft);
  border-color: var(--success);
}

@media (max-width: 560px) {
  .profile-head {
    padding: 20px 16px;
    border-radius: 20px 20px 0 0;
  }
  .profile-avatar {
    width: 60px;
    height: 60px;
  }
  .profile-body {
    padding: 0 16px;
  }
  .stages {
    grid-template-columns: minmax(0, 1fr);
  }
  dl {
    grid-template-columns: minmax(0, 1fr);
  }
  .profile-foot {
    position: sticky;
    bottom: 0;
    flex-wrap: wrap;
    padding: 14px 16px;
    background: var(--surface);
  }
  .profile-foot .spacer {
    display: none;
  }
  .profile-foot .btn {
    flex: 1;
  }
}
</style>
