<script setup>
import profile1 from '../../assets/profile1.jpg'
import profile2 from '../../assets/profile2.jpg'
import profile3 from '../../assets/profile3.png'
import profile4 from '../../assets/profile4.png'
import profile5 from '../../assets/profile5.jpg'
import profile6 from '../../assets/profile6.jpg'
</script>

<template>
  <table>
    <tr>
        <td><img :src="profile1" alt="" class="profile-photo"></td>
        <td>Team Lead -Design</td>
        <td>Office</td>
        <td>9:00 AM</td>
        <td><button>On Time</button></td>
    </tr>


  </table>
</template>
<style scoped>
.profile-photo{
    width: 40%;
    border-radius: 50px;
}
</style>