<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    job: Object
})
</script>
<template>
    <div class="main">
        <p class="txt1">{{ props.job.identityNum }}</p>
        <div class="txt2">
            <img :src="`${props.job.imagePath}`" alt="">
            <p>{{ props.job.name }}</p>
        </div>
        <p class="txt3">{{ props.job.department }}</p>
        <p class="txt4">{{ props.job.title }}</p>
        <p class="txt5">{{ props.job.type }}</p>
        <p class="txt6">{{ props.job.status }}</p>
        <div class="txt7">
            <i class="pi pi-eye" style="padding-right: 10px;"></i>
            <i class="pi pi-trash" style="padding-right: 10px;"></i>
            <i class="pi pi-pencil" style="padding-right: 10px;"></i>
        </div>
    </div>
</template>
<style scoped>
.pi-eye, .pi-trash, .pi-pencil{
    color: var(--text-color);
}
.main{
    display: flex;
    /* flex-direction: row; */
    /* align-content: center; */
    /* border-bottom: 1px solid #323138; */
    border-top: 1px solid #323138;
    padding: 13px 0;
}
.container p{
    color: var(--text-color);
    font-size: var(--fs-sm);
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
    background-color: var(--employee-bg);
    color: var(--employee-status) !important;
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
@media (max-width: 768px) {
    .container p{
        font-size: var(--fs-aaa);
    }
    .txt7{display: none;} .txt1 { margin-bottom: 5px;}
    .txt3, .txt4, .txt5{
        display: inline-block;
        padding: 10px;
        background-color: var(--bg-color);
        border: 1px solid var(--border-color);
        margin: 10px 10px 10px 0;
        border-radius: 8px;
    }
    .txt6 { font-size: var(--fs-aa) !important; padding: 7px 9px; border-radius: 5px;}
    .txt1 { flex: 0 0 10%;}
    .txt2 { flex: 0 0 18%;}
    .txt3 { flex: 0 0 8%;}
    .txt4 { flex: 0 0 15%;}
    .txt5 { flex: 0 0 5%;}
}
</style>