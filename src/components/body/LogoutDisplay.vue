<script setup>
</script>
<template>
  <div class="logout">
    <div>
      <p class="my-profile"><i class="pi pi-user"></i>My Profile</p>
      <p class="logoutkey"><i class="pi pi-sign-out"></i>Logout</p>
    </div>
  </div>
</template>
<style scoped>
.logout {
  background-color: #16151c;
  border-radius: 10px;
}
.logout div {
  padding: 30px 50px;
}
/* .pi{ display: block;} */
.pi {
  padding-right: 20px;
}
.pi-sign-out {
  color: #f45b69;
}
.pi-user {
  color: #ddd;
  margin-bottom: 25px;
}
.my-profile {
  /* display: inline-block; */
  color: #ddd;
  font-family: "roboto", sans-serif;
  font-size: 20px;
  padding-right: 20px;
}
.logoutkey {
  display: inline;
  color: #f45b69;
  font-family: "roboto", sans-serif;
  font-size: 20px;
}
@media (max-width: 768px) {
  .my-profile, .logoutkey { font-size: var(--fs-v);}
  .pi { padding-right: 10px;}
}
</style>