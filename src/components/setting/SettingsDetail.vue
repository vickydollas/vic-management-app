<script setup>
import { useTheme } from "../../composables/useTheme";

// the Appearance select reads and writes the real theme mode
const { mode, setMode } = useTheme();

const toggles = [
  { title: "Two-factor Authentication", text: "Keep your account secure by enabling 2FA via email", on: true },
  { title: "Mobile Push Notifications", text: "Receive push notifications on your phone", on: true },
  { title: "Desktop Push Notifications", text: "Receive push notifications on desktop", on: false },
  { title: "Email Notifications", text: "Receive email notifications", on: true },
];
</script>

<template>
  <section class="card settings">
    <div class="row">
      <div>
        <h3>Appearance</h3>
        <p>Customize how the theme looks on your device</p>
      </div>
      <select class="select" :value="mode" @change="setMode($event.target.value)" aria-label="Theme">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>

    <div class="row">
      <div>
        <h3>Language</h3>
        <p>Select your language</p>
      </div>
      <select class="select" aria-label="Language">
        <option value="en">English</option>
        <option value="yo">Yoruba</option>
        <option value="zh">Chinese</option>
        <option value="pt">Portuguese</option>
        <option value="ko">Korean</option>
      </select>
    </div>

    <div v-for="t in toggles" :key="t.title" class="row">
      <div>
        <h3>{{ t.title }}</h3>
        <p>{{ t.text }}</p>
      </div>
      <label class="switch">
        <input type="checkbox" :checked="t.on" :aria-label="t.title" />
        <span class="track"><span class="knob"></span></span>
      </label>
    </div>
  </section>
</template>

<style scoped>
.settings {
  padding: 4px 24px;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 20px 0;
  border-top: 1px solid var(--border);
}
.row:first-child {
  border-top: none;
}
.row h3 {
  font-size: var(--fs-md);
  font-weight: 500;
  color: var(--text);
}
.row p {
  margin-top: 2px;
  font-size: var(--fs-sm);
  color: var(--text-muted);
}
.select {
  min-width: 150px;
}

/* switch */
.switch {
  position: relative;
  flex-shrink: 0;
  cursor: pointer;
}
.switch input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.track {
  display: block;
  width: 44px;
  height: 24px;
  border-radius: var(--radius-pill);
  background: var(--surface-3);
  border: 1px solid var(--border-strong);
  transition: background-color 0.2s ease, border-color 0.2s ease;
}
.knob {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease;
}
.switch input:checked + .track {
  background: var(--accent);
  border-color: var(--accent);
}
.switch input:checked + .track .knob {
  transform: translateX(20px);
}
.switch input:focus-visible + .track {
  box-shadow: var(--ring);
}

@media (max-width: 560px) {
  .settings {
    padding: 4px 16px;
  }
  .row {
    padding: 16px 0;
  }
  .select {
    min-width: 120px;
  }
}
</style>
