<script setup>
import { computed } from "vue";
import AppLayout from "../components/layout/AppLayout.vue";
import HeaderSection from "../components/HeaderSection.vue";
import { useAuth } from "../composables/auth";

const auth = useAuth();
const firstName = computed(() => auth.state.user?.name?.split(" ")[0] ?? "there");
const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
});
</script>

<template>
  <AppLayout :title="`Hello ${firstName} 👋`" :subtitle="greeting">
    <HeaderSection />
  </AppLayout>
</template>
