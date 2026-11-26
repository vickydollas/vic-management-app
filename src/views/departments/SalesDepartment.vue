<script setup>
import AppLayout from "../../components/layout/AppLayout.vue";
import DesignWorker from "../../components/grouped_department/DesignWorker.vue";
</script>

<template>
  <AppLayout title="Sales Department" subtitle="All Departments › Sales">
    <DesignWorker department="Sales" />
  </AppLayout>
</template>
