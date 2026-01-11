<script setup>
</script>
<template>
  <div class="settings-view border border-width border-[var(--border-color)] rounded-[10px] px-3 py-5">
    <div class="flex justify-between border-b border-[#323138] py-4">
      <div>
        <h1 class="text-[var(--text-color)] text-[17px]">Appearance</h1>
        <p class="text-[var(--text-color)] text-[14px]">Customize how your theme wants to looks on your device</p>
      </div>
      <select name="Dark" id="">
        <option value="">Dark</option>
        <option value="">Light</option>
        <option value="">System</option>
      </select>
    </div>
    <div class="flex justify-between border-b border-[#323138] py-4">
      <div>
        <h1 class="text-[var(--text-color)] text-[17px]">Language</h1>
        <p class="text-[var(--text-color)]">Select your language</p>
      </div>
      <select name="English" id="">
        <option value="">English</option>
        <option value="">Yoruba</option>
        <option value="">Chinese</option>
        <option value="">Portugese</option>
        <option value="">Korean</option>
      </select>
    </div>
    <div class="flex justify-between border-b border-[#323138] py-4">
      <div>
        <h1 class="text-[var(--text-color)] text-[17px]">Two-factor Authentication</h1>
        <p class="text-[var(--text-color)] text-[14px]">Keep your account secure by enabling 2FA via email</p>
      </div>
      <label class="switch">
        <input type="checkbox" name="" id="">
        <span class="slider"></span>
      </label>
    </div>
    <div class="flex justify-between border-b border-[#323138] py-4">
      <div>
        <h1 class="text-[var(--text-color)] text-[17px]">Mobile push Notification</h1>
        <p class="text-[var(--text-color)] text-[14px]">Receive push Notification</p>
      </div>
      <label class="switch">
        <input type="checkbox" name="" id="">
        <span class="slider"></span>
      </label>
    </div>
    <div class="flex justify-between border-b border-[#323138] py-4">
      <div>
        <h1 class="text-[var(--text-color)] text-[17px]">Desktop push Notification</h1>
        <p class="text-[var(--text-color)] text-[14px]">Receive push Notification in desktop</p>
      </div>
      <label class="switch">
        <input type="checkbox" name="" id="">
        <span class="slider"></span>
      </label>
    </div>
    <div class="flex justify-between py-4">
      <div>
        <h1 class="text-[var(--text-color)] text-[17px]">Email Notification</h1>
        <p class="text-[var(--text-color)] text-[14px]">Receive email notifiction</p>
      </div>
      <label class="switch">
        <input type="checkbox" name="" id="">
        <span class="slider"></span>
      </label>
    </div>
  </div>
</template>
<style scoped>
.settings-view{ box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);}
h1, p{
    font-family: "roboto", sans-serif;
}
select{
    padding: 7px 2px;
    width: 130px;
    border-radius: 5px;
    color: var(--text-color);
    background-color: var(--bg-color);
}

/* 1. The Container */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

/* 2. Hide the default checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* 3. The Slider Track */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #323138;
  transition: 0.4s;
  /* border-radius: 34px; */
}

/* 4. The Knob (White Circle) */
.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: var(--bg-color);
  transition: 0.4s;
  /* border-radius: 50%; */
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

/* 5. Logic: When checked, change background */
input:checked + .slider {
  background-color: #34C759; /* Green color from your image */
}

/* 6. Logic: When checked, move the knob */
input:checked + .slider:before {
  transform: translateX(24px);
}
</style>