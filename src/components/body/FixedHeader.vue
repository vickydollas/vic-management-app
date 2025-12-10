<script setup>
import { ref, onMounted, defineProps } from 'vue'
import profile1 from '../../assets/profile1.jpg'
import LogoutDisplay from './LogoutDisplay.vue'

const props = defineProps({
    name: String,
    greeting: String
})
const togglelogout = ref(false)
const openLogout = () => {
    togglelogout.value = !togglelogout.value
}
const closeFunc = () => {
    togglelogout.value = false
}
const closeLogout = (e) => {
    if (e.key === 'Escape'){
        closeFunc()
    }
}
const clickLogout = (e) => {
        closeFunc()
}
onMounted(() => {
    document.addEventListener('keydown', closeLogout)
    // document.addEventListener('click', clickLogout)
})
</script>
<template>
    <div class="headersection">
        <div class="headersection1">
            <h1>{{ props.name }} 👋</h1>
            <h3>{{ props.greeting }}</h3>
        </div>
        <div class="headersection2">
            <div class="search-wrapper">
                <i class="pi pi-search"></i>
                <input type="text" placeholder="Search...">
            </div>
            <i class="pi pi-bell"></i>
            <div class="profile-wrapper">
                <img :src="profile1" alt="">
                <div>
                    <h3>Victor John</h3>
                    <p>HR Manager</p>
                </div>
                <i class="pi pi-angle-down" @click="openLogout"></i>
            </div>
        </div>
        <div class="headersection3" v-show="togglelogout" @click="clickLogout">
            <div class="fade" @click.stop><LogoutDisplay /></div>
        </div>
    </div>
</template>
<style scoped>
.headersection3{
    background-color: rgba(0, 0, 0, 0.6); 
    backdrop-filter: blur(5px);
    
    /* Ensure it's on top of all regular content */
    z-index: 9999;

    /* Center the modal content using Flexbox */
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    /* left: 500px; */
    /* bottom: 300px; */
    height: 100vh;
    width: 100vw;
}
.headersection3 div{
position: relative;
    left: 170px;
    bottom: 130px;
}
.headersection1{
    margin: 20px 0 30px 0;
}
.headersection1 h1{
    color: #ffffff;
    font-family: "roboto", sans-serif;
    font-size: 20px;
}
.headersection1 h3{
    color: #6A717F;
    font-family: "roboto", sans-serif;
    font-weight: 300;
    font-size: 15px;
}
.headersection2{
    display: flex;
    align-content: center;
    position: relative;
}
.headersection{
    position: fixed;
    display: flex;
    justify-content: space-between;
    background-color: #16151C;
    /* margin: 0 0 80px 0; */
    /* border: 3px solid #ddd; */
    width: 80%;
}
input[type="text"]{
    font-size: 15px;
    height: 1.2vh;
    width: 220px;
    padding: 15px 0px 15px 35px;
    background-color: inherit;
    border: 1px solid #D1D5DC;
    border-radius: 10px;
}
.txt1{
    height: 2.2vh !important;
}
.profile-wrapper{
    display: flex;
    width: 60%;
    border: 1px solid #D1D5DC;
    border-radius: 10px;
    align-self: center;
}
.profile-wrapper img{
    padding: 3px 0 3px 3px;
    width: 25%;
    height: 6vh;
    border-radius: 50px;
    align-self: center;
}
.profile-wrapper > div{
    align-self: center;
    margin-left: 8px;
}
.profile-wrapper > div > h3{
    color: #ffffff;
    font-family: "roboto", sans-serif;
    font-size: 17px;
    font-weight: 400;
}
.profile-wrapper > div > p{
    color: #6A717F;
    font-family: "roboto", sans-serif;
    font-size: 12px;
}
.pi-angle-down{
    align-self: center;
    margin-left: 5px;
    font-size: 20px;
    color: #ffffff;
    font-weight: 100;
}
.search-wrapper{
    position: relative;
    display: flex;
    align-self: center;
}
.pi-bell{
    font-size: 20px;
    margin: 0 10px;
    padding: 0 auto;
    color: #ffffff;
    padding: 10px 10px 0px 10px;
    width: 30px;
    height: 4vh;
    background-color: #25232A;
    border: 1px solid #D1D5DC;
    border-radius: 10px;
    display: block;
    align-self: center;
}
.pi-search{
    font-size: 17px;
    position: absolute;
    top: 10px;
    left: 8px;
    color: #ffffff;
    /* font-weight: 100; */
    /* font-family: "roboto", sans-serif; */
}
</style>