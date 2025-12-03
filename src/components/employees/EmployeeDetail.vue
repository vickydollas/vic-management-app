<script setup>
import { defineProps } from 'vue'
defineProps({
    idNum: Number,
    name: String,
    department: String,
    designation: String,
    type: String,
    status: String,
    src: String
})
</script>
<template>
    <div class="container">
        <p class="txt1">{{ idNum }}</p>
        <div class="txt2">
            <img :src="`${src}`" alt="">
            <p>Alice Johnson</p>
        </div>
        <p class="txt3">Sales</p>
        <p class="txt4">Sales Associate</p>
        <p class="txt5">Office</p>
        <p class="txt6">Contract</p>
        <div class="txt7">
            <i class="pi pi-eye" style="color: #ddd; padding-right: 10px;"></i>
            <i class="pi pi-trash" style="color: #ddd; padding-right: 10px;"></i>
            <i class="pi pi-pencil" style="color: #ddd; padding-right: 10px;"></i>
        </div>
    </div>
</template>
<style scoped>
.container{
    display: flex;
    /* align-content: center; */
    border-bottom: 1px solid #323138;
    border-top: 1px solid #323138;
    padding: 11px 0;
    margin-top: 20px;
}
.container p{
    color: #ddd;
    font-size: 17px;
    font-family: "roboto", sans-serif;
}
.txt2 img{
    margin-right: 10px;
    width: 18%;
    border-radius: 50px;
}
.txt1{
    flex: 0 0 12%;
    align-self: center;
    padding-left: 5px;
}
.txt2{
    display: flex;
    flex: 0 0 20%;
    align-items: center;
}
.txt3{
    flex: 0 0 13%;
    align-self: center;
}
.txt4{
    flex: 0 0 20%;
    align-self: center;
}
.txt5{
    flex: 0 0 10%;
    align-self: center;
}
.txt6{
    flex: 0 0 12%;
    align-self: center;
}
.txt7{
    flex: 0 0 12%;
    align-self: center;
}
</style>