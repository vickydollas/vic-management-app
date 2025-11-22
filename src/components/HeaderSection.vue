<script setup>
import BodyContentOne from "./body/BodyContentOne.vue";
</script>

<template>
    <div class="headersection">
        <div class="headersection1">
            <h1>Hello Victor</h1>
            <h3>Good morning</h3>
        </div>
        <div class="headersection2">
            <input type="text" placeholder="Search">
            <i class="pi pi-bell"></i>
            <input type="text">
        </div>
    </div>
    <div><BodyContentOne /></div>
</template>
<style scoped>
.headersection{
    display: flex;
    justify-content: space-between;
}
.pi{
    font-size: 20px;
    margin: 0 10px;
    color: #ffffff;
    padding: 5px;
    background-color: inherit;
    border: 1px solid #ffffff;
    display: inline-block;
}
.headersection2{
    align-content: center;
}
input[type="text"]{
    /* height: 5vh; */
    padding: 15px 0;
    background-color: inherit;
    border: 1px solid #ffffff;
    border-radius: 5px;
}
/* input[type="text"].search-input{
    background-image: url('../');
} */
</style>