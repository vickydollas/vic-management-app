<template>
  <div class="calendar-container">
    <header class="calendar-header">
      <button @click="changeMonth(-1)">&lt;</button>
      <h2>{{ monthNames[currentMonth] }} {{ currentYear }}</h2>
      <button @click="changeMonth(1)">&gt;</button>
    </header>

    <div class="calendar-grid">
      <div v-for="day in daysOfWeek" :key="day" class="weekday-label">
        {{ day }}
      </div>

      <div
        v-for="blank in firstDayOfMonth"
        :key="'blank-' + blank"
        class="calendar-day empty"
      ></div>

      <div
        v-for="date in daysInMonth"
        :key="date"
        class="calendar-day"
        :class="{ 'is-today': isToday(date) }"
        @click="selectDate(date)"
      >
        <span class="date-number">{{ date }}</span>
      </div>
    </div>
    <div>
      <div class="div3">
        <p>Wednesday, 6TH June 2025</p>
        <i class="pi pi-ellipsis-v"></i>
      </div>
      <div class="div4">
        <p>9:30</p>
        <div>
          <h2>UI/UX Designer</h2>
          <p>Practical Task Review</p>
        </div>
      </div>
      <div class="div4">
        <p>9:30</p>
        <div>
          <h2>UI/UX Designer</h2>
          <p>Practical Task Review</p>
        </div>
      </div>
      <div class="div4">
        <p>9:30</p>
        <div>
          <h2>UI/UX Designer</h2>
          <p>Practical Task Review</p>
        </div>
      </div>
      <div>
        <div class="div3">
          <p>Wednesday, 6TH June 2025</p>
          <i class="pi pi-ellipsis-v"></i>
        </div>
        <div class="div4">
          <p>9:30</p>
          <div>
            <h2>UI/UX Designer</h2>
            <p>Practical Task Review</p>
          </div>
        </div>
      </div>
      <div>
        <div class="div3">
          <p>Wednesday, 6TH June 2025</p>
          <i class="pi pi-ellipsis-v"></i>
        </div>
        <div class="div4">
          <p>9:30</p>
          <div>
            <h2>UI/UX Designer</h2>
            <p>Practical Task Review</p>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Calculate how many days are in the current month
const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});

// Find the starting weekday (0-6) of the month
const firstDayOfMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay();
});

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

const isToday = (date) => {
  return (
    today.getDate() === date &&
    today.getMonth() === currentMonth.value &&
    today.getFullYear() === currentYear.value
  );
};

const selectDate = (date) => {
  alert(
    `You clicked on ${monthNames[currentMonth.value]} ${date}, ${
      currentYear.value
    }`
  );
};
</script>

<style scoped>
.calendar-container {
  max-width: 600px;
  margin: 0px auto;
  border: 1px solid var(--border-color);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  font-family: sans-serif;
  /* background-color: inherit; */
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  /* background: #f8f9fa; */
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 50px);
  color: var(--text-color);
}

.weekday-label {
  text-align: center;
  font-weight: bold;
  padding: 10px;
  /* background: #eee; */
}

.calendar-day {
  min-height: 40px;
  /* border: 0.5px solid #eee; */
  padding: 5px;
  cursor: pointer;
  /* background: #fff; */
}

.calendar-day:hover {
  background: #f0f7ff;
  border-radius: 10px;
}

.empty {
  /* background: #fafafa; */
  cursor: default;
}

.is-today {
  background: var(--bg-color);
  border-radius: 10px;
  font-weight: bold;
  color: #007bff;
}

.date-number {
  font-size: 0.9rem;
}

/* imported */
.div1 {
  display: flex;
  justify-content: space-between;
  margin: 10px 20px 20px 20px;
}
.div1 h4 {
  font-family: "roboto", sans-serif;
  color: #ffffff;
  font-size: 20px;
  align-self: center;
}
.pi-calendar {
  font-size: 28px;
  color: #7152f3;
  background-color: #201b32;
  padding: 15px;
  border-radius: 10px;
}
/* div 3 styling */
.div3 {
  display: flex;
  justify-content: space-between;
  margin: 22px 0 0 17px;
}
.div3 p {
  color: var(--text-color);
  font-family: "roboto", sans-serif;
  font-size: 15px;
  align-self: center;
}
.pi-ellipsis-v {
  font-size: 18px;
  color: var(--text-color);
  margin-right: 10px;
}
/* div 4 styling  */
.div4 {
  display: flex;

  /* justify-content: space; */
  margin: 20px 20px;
}
.div4 div {
  padding-left: 30px;
}
.div4 > p {
  color: var(--text-color);
  font-family: "roboto", sans-serif;
  font-size: 18px;
  font-weight: 800;
  padding: 10px 30px 10px 0px;
  border-right: 3px solid #5e45c4;
  align-self: center;
}
.div4 > div > h2,
.div4 > div > p {
  color: var(--text-color);
  font-family: "roboto", sans-serif;
  font-size: 18px;
  font-weight: 200;
}
.div4 > div > h2 {
  font-weight: 200;
}
.div4 > div > p {
  font-weight: 500;
}
</style>