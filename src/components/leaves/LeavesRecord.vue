<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const isLoading = ref(false)
const error = ref(null)
const notification = ref([])

const getNotification = async () => {
  isLoading.value = true
  error.value = null

  try {
    const response = await axios.get('/notification.json')
    if (!response) {
      throw new Error("Error fetching");
    }
    notification.value = response.data
  } catch (error) {
    console.error("404 error", error)
    error.value = 'Could not fetch data'
  } finally {
    isLoading.value = false
  }
}
onMounted(() => {
  getNotification()
})
</script>
<template>
  <div class="border border-solid border-[var(--border-color)] py-3 px-2 rounded-[10px] leaves">
    <div class="leaves-1 flex justify-between items-center border-b py-2 border-[#323138]">
      <h2 class="text-[var(--text-color)] font-['roboto'] text-[1.1rem]">Notifications</h2>
      <select class="bg-[var(--bg-color)] text-[var(--text-color)] py-3 px-3 text-[1rem] font-mono rounded-[7px]" name="" id="">
        <option value="">Newest First</option>
        <option value="">Oldest First</option>
      </select>
    </div>
    <div
     class="leaves-2 flex justify-between border-b border-[#323138] items-center py-3"
     v-for="notifications in notification"
     :key="notifications.id"
     >
      <div class="flex items-center">
        <img
        class="w-13 h-13 rounded-[50px] mr-3"
         :src="`${notifications.imagePath}`" alt="">
        <div>
          <h3 class="text-[var(--text-color)] text-[1rem]">{{ notifications.message }}</h3>
          <p class="text-[#95A1A8] text-[1rem]">{{ notifications.content }}</p>
        </div>
      </div>
      <p class="text-[14px] text-[var(--text-color)]">{{ notifications.timestamp }}</p>
    </div>
  </div>
</template>
<style scoped>
.leaves{ box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);}
.leaves-1 h2{
  font-family: "roboto", sans-serif;
}
p, h3{
  font-family: "roboto", sans-serif;
}
</style>