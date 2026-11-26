<script setup>
import { computed } from "vue";
import BaseModal from "../ui/BaseModal.vue";

// read-only employee profile
const props = defineProps({
  open: Boolean,
  employee: { type: Object, default: null },
  // only employees added in the app can be deleted
  canDelete: Boolean,
});
const emit = defineEmits(["close", "edit", "delete"]);

const statusClass = computed(() => {
  switch (props.employee?.status) {
    case "Permanent": return "badge-accent";
    case "Contract": return "badge-warning";
    case "Probation": return "badge-danger";
    default: return "";
  }
});
const attendanceClass = computed(() => {
  if (props.employee?.truth === "Late") return "badge-danger";
  if (props.employee?.truth === "On Time") return "badge-success";
  return "";
});
const payrollClass = computed(() => {
  if (props.employee?.salary?.transaction === "Completed") return "badge-success";
  if (props.employee?.salary?.transaction === "Pending") return "badge-warning";
  return "";
});

const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "";

const show = (value) => (value && value !== "-" ? value : "—");
</script>

<template>
  <BaseModal :open="open" labelledby="employee-view-title" @close="emit('close')">
    <template v-if="employee">
      <header class="profile-head">
        <button class="btn-icon borderless btn-sm close" aria-label="Close" @click="emit('close')">
          <i class="pi pi-times"></i>
        </button>
        <img class="profile-avatar" :src="employee.imagePath" alt="" />
        <div class="profile-id">
          <h2 id="employee-view-title">{{ employee.name }}</h2>
          <p>{{ employee.title }}</p>
          <div class="tags">
            <span class="badge" :class="statusClass">{{ employee.status }}</span>
            <span class="chip">#{{ employee.identityNum }}</span>
          </div>
        </div>
      </header>

      <div class="sections">
        <section>
          <h3>Work</h3>
          <dl>
            <div><dt>Department</dt><dd>{{ show(employee.department) }}</dd></div>
            <div><dt>Work type</dt><dd>{{ show(employee.type) }}</dd></div>
            <div><dt>Location</dt><dd>{{ show(employee.location) }}</dd></div>
            <div>
              <dt>Today's attendance</dt>
              <dd>
                <span class="badge" :class="attendanceClass">{{ employee.truth || "No record" }}</span>
                <span v-if="employee.time" class="muted"> · {{ employee.time }}</span>
              </dd>
            </div>
          </dl>
        </section>

        <section>
          <h3>Payroll</h3>
          <dl>
            <div><dt>Annual salary (CTC)</dt><dd>{{ show(employee.salary?.perYear) }}</dd></div>
            <div><dt>Monthly salary</dt><dd>{{ show(employee.salary?.amount) }}</dd></div>
            <div><dt>Deduction</dt><dd>{{ show(employee.salary?.deduction) }}</dd></div>
            <div>
              <dt>Payment status</dt>
              <dd><span class="badge" :class="payrollClass">{{ employee.salary?.transaction || "—" }}</span></dd>
            </div>
          </dl>
        </section>

        <p v-if="employee.createdAt" class="meta">
          <i class="pi pi-info-circle"></i>
          Added in the app on {{ formatDate(employee.createdAt) }}
          <template v-if="employee.updatedAt"> · last edited {{ formatDate(employee.updatedAt) }}</template>
        </p>
        <p v-else-if="employee.updatedAt" class="meta">
          <i class="pi pi-info-circle"></i> Last edited {{ formatDate(employee.updatedAt) }}
        </p>
      </div>

      <footer class="profile-foot">
        <button v-if="canDelete" class="btn btn-outline danger-text" @click="emit('delete', employee)">
          <i class="pi pi-trash"></i> Delete
        </button>
        <div class="spacer"></div>
        <button class="btn btn-outline" @click="emit('close')">Close</button>
        <button class="btn btn-primary" @click="emit('edit', employee)">
          <i class="pi pi-pencil"></i> Edit
        </button>
      </footer>
    </template>
  </BaseModal>
</template>

<style scoped>
.profile-head {
  position: relative;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 24px;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(135deg, var(--accent-soft), transparent 70%);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}
.close {
  position: absolute;
  top: 14px;
  right: 14px;
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
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.sections {
  padding: 8px 24px 4px;
}
section {
  padding: 16px 0;
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
}
.meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px 0 12px;
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

@media (max-width: 560px) {
  .profile-head {
    padding: 20px 16px;
    border-radius: 20px 20px 0 0;
  }
  .profile-avatar {
    width: 60px;
    height: 60px;
  }
  .sections {
    padding: 4px 16px;
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
