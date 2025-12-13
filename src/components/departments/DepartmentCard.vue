<script setup>
import axios from 'axios'
import { computed, defineProps, ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  path: {
    type: String,
  },
  department: String,
  segment: String
});
const jobs = ref([])
onMounted(async() => {
  try {
    const response = await axios.get('/jobs2.json')
    jobs.value = response.data
  } catch (error) {
    console.log(error)
  }
})
const targetDepartment = ref(props.segment)
const getDepartment = computed(() => {
  if (!jobs.value || jobs.value.length === 0) {
    return [];
  }
  return jobs.value.filter((job) => {
    return job.department === targetDepartment.value;
  });
})
</script>
<template>
  <div class="department-card">
    <div class="department-card-1">
      <div class="card-1">
        <h3>{{ props.department }}</h3>
        <p>12 Members</p>
      </div>
      <router-link :to="`${props.path}`">View All</router-link>
    </div>
    <div class="department-card-2" v-for="job in getDepartment.slice(0, 5)" :key="job.id">
      <div class="card-2">
        <img :src="`${job.imagePath}`" alt="" />
        <div>
          <h2>{{ job.name }}</h2>
          <p>{{ job.title }}</p>
        </div>
      </div>
      <i class="pi pi-angle-right" style="color: #ddd"></i>
    </div>
  </div>
</template>
<style scoped>
.department-card {
  border: 1px solid #323138;
  margin: 30px 10px 0 10px;
  border-radius: 8px;
}
.department-card-1 {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #323138;
  margin: 10px 15px;
  padding: 10px 0px;
}
.department-card-1 a {
  text-decoration: none;
  color: #6e52ec;
  font-size: 17px;
  font-family: "roboto", sans-serif;
}
.card-1 h3 {
  color: #ddd;
  font-size: 20px;
  font-family: "roboto", sans-serif;
}
.card-1 p {
  color: #a2a1a8;
  font-size: 14px;
  margin: 5px 0 0 0;
}
.department-card-2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 20px 8px 20px;
}

/* testing */
.card-2 {
  display: flex;
  align-items: center;
}
.card-2 img {
width: 14%;
border-radius: 50px;
margin-right: 20px;
}
.card-2 h2 {
  color: #ddd;
  font-family: "roboto", sans-serif;
  font-weight: 400;
  font-size: 16px;
}
.card-2 p {
  color: #a2a1a8;
  font-size: 12px;
  font-weight: 200;
}
</style>