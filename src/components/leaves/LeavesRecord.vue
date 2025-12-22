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
  <div class="border border-solid border-[#323138] py-3 px-2 rounded-[10px] leaves">
    <div class="leaves-1 flex justify-between items-center border-b py-2 border-[#323138]">
      <h2 class="text-[#ffffff] font-['roboto'] text-[20px]">Notifications</h2>
      <select class="bg-[#16151C] text-white py-3 px-3 text-[15px] font-mono rounded-[7px]" name="" id="">
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
          <h3 class="text-[#ffffff] text-[18px]">{{ notifications.message }}</h3>
          <p class="text-[#A2A1A8] text-[13px]">{{ notifications.content }}</p>
        </div>
      </div>
      <p class="text-[14px] text-[#A2A1A8]">{{ notifications.timestamp }}</p>
    </div>
  </div>
</template>
<style scoped>
.leaves-1 h2{
  font-family: "roboto", sans-serif;
}
p, h3{
  font-family: "roboto", sans-serif;
}
</style>