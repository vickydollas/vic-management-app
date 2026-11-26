<script setup>
import { ref, computed } from "vue";

const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());
const selectedDate = ref(null);

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// days in the shown month, and the weekday (0-6) it starts on
const daysInMonth = computed(() => new Date(currentYear.value, currentMonth.value + 1, 0).getDate());
const firstDayOfMonth = computed(() => new Date(currentYear.value, currentMonth.value, 1).getDay());

const changeMonth = (step) => {
  currentMonth.value += step;
  if (currentMonth.value > 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else if (currentMonth.value < 0) {
    currentMonth.value = 11;
    currentYear.value--;
  }
};

const isToday = (date) =>
  today.getDate() === date &&
  today.getMonth() === currentMonth.value &&
  today.getFullYear() === currentYear.value;

const isSelected = (date) =>
  selectedDate.value &&
  selectedDate.value.date === date &&
  selectedDate.value.month === currentMonth.value &&
  selectedDate.value.year === currentYear.value;

const selectDate = (date) => {
  selectedDate.value = { date, month: currentMonth.value, year: currentYear.value };
};

const schedule = [
  {
    day: "Wednesday, 6th June 2025",
    items: [
      { time: "09:30", role: "UI/UX Designer", task: "Practical Task Review" },
      { time: "12:00", role: "Magento Developer", task: "Resume Review" },
      { time: "01:30", role: "Sales Manager", task: "Final HR Round" },
    ],
  },
  {
    day: "Thursday, 7th June 2025",
    items: [{ time: "09:30", role: "Front End Developer", task: "Practical Task Review" }],
  },
  {
    day: "Friday, 8th June 2025",
    items: [{ time: "11:00", role: "React JS", task: "TL Meeting" }],
  },
];
</script>

<template>
  <section class="card calendar">
    <header class="cal-head">
      <button class="btn-icon btn-sm" aria-label="Previous month" @click="changeMonth(-1)">
        <i class="pi pi-angle-left"></i>
      </button>
      <h2>{{ monthNames[currentMonth] }} {{ currentYear }}</h2>
      <button class="btn-icon btn-sm" aria-label="Next month" @click="changeMonth(1)">
        <i class="pi pi-angle-right"></i>
      </button>
    </header>

    <div class="cal-grid">
      <span v-for="day in daysOfWeek" :key="day" class="weekday">{{ day }}</span>
      <span v-for="blank in firstDayOfMonth" :key="'blank-' + blank"></span>
      <button
        v-for="date in daysInMonth"
        :key="date"
        class="day"
        :class="{ today: isToday(date), selected: isSelected(date) }"
        @click="selectDate(date)"
      >
        {{ date }}
      </button>
    </div>

    <div class="schedule">
      <div v-for="group in schedule" :key="group.day" class="group">
        <div class="group-head">
          <p>{{ group.day }}</p>
          <button class="btn-icon borderless btn-sm" aria-label="More"><i class="pi pi-ellipsis-v"></i></button>
        </div>
        <div v-for="item in group.items" :key="item.time + item.role" class="event">
          <span class="time">{{ item.time }}</span>
          <div class="event-body">
            <p class="role">{{ item.role }}</p>
            <p class="task">{{ item.task }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.calendar {
  padding: 18px;
}
.cal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.cal-head h2 {
  font-size: var(--fs-md);
  font-weight: 600;
  color: var(--text);
}

.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 4px;
  text-align: center;
}
.weekday {
  padding: 4px 0 8px;
  font-size: var(--fs-xs);
  font-weight: 500;
  color: var(--text-subtle);
}
.day {
  aspect-ratio: 1;
  max-height: 40px;
  border-radius: 10px;
  color: var(--text);
  font-size: var(--fs-sm);
  transition: background-color 0.12s ease, color 0.12s ease;
}
.day:hover {
  background: var(--surface-2);
}
.day.today {
  background: var(--accent);
  color: var(--on-accent);
  font-weight: 600;
}
.day.selected:not(.today) {
  background: var(--accent-soft);
  color: var(--accent-text);
  font-weight: 600;
}

.schedule {
  margin-top: 18px;
  padding-top: 6px;
  border-top: 1px solid var(--border);
}
.group-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0 6px;
}
.group-head p {
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--text);
}
.event {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 0;
}
.time {
  width: 44px;
  flex-shrink: 0;
  font-size: var(--fs-base);
  font-weight: 600;
  color: var(--text);
}
.event-body {
  padding-left: 14px;
  border-left: 3px solid var(--accent);
}
.role {
  font-size: var(--fs-xs);
  color: var(--text-muted);
}
.task {
  font-size: var(--fs-base);
  font-weight: 500;
  color: var(--text);
}
</style>
