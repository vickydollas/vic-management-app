<script setup>
import { ref } from "vue";
import AttendanceList from "../attendance_overview/AttendanceList.vue";

const searching = ref("");
</script>

<template>
  <section class="card">
    <div class="toolbar">
      <label class="search">
        <i class="pi pi-search"></i>
        <input class="input" type="text" v-model="searching" placeholder="Search employee..." />
      </label>
    </div>
    <AttendanceList :received="searching" :showDiv="false" />
  </section>
</template>
