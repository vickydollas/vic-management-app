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
    <div class="main">
        <p class="txt1">{{ idNum }}</p>
        <div class="txt2">
            <img :src="`${src}`" alt="">
            <p>{{ name }}</p>
        </div>
        <p class="txt3">{{ department }}</p>
        <p class="txt4">{{ designation }}</p>
        <p class="txt5">{{ type }}</p>
        <p class="txt6">{{ status }}</p>
        <div class="txt7">
            <i class="pi pi-eye" style="color: #ddd; padding-right: 10px;"></i>
            <i class="pi pi-trash" style="color: #ddd; padding-right: 10px;"></i>
            <i class="pi pi-pencil" style="color: #ddd; padding-right: 10px;"></i>
        </div>
    </div>
</template>
<style scoped>
.main{
    display: flex;
    /* align-content: center; */
    /* border-bottom: 1px solid #323138; */
    border-top: 1px solid #323138;
    padding: 13px 0;
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
    flex: 0 0 21%;
    align-self: center;
}
.txt5{
    flex: 0 0 10%;
    align-self: center;
}
.txt6{
    font-size: 13px !important;
    background-color: #251E3E;
    color: #6752E8 !important;
    flex: 0 0 9%;
    align-self: center;
    border-radius: 10px;
    padding: 10px 0 10px 0px;
    text-align: center;
    margin-right: 20px;
}
.txt7{
    flex: 0 0 14%;
    align-self: center;
}
</style>