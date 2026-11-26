import { ref, computed, watchEffect } from 'vue'

// mode: 'light' | 'dark' | 'system'
const STORAGE_KEY = 'theme-mode'

function readStoredMode () {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'light' || saved === 'dark' || saved === 'system') return saved

  // one-time migration: the old 'theme' key stored the label inverted
  // ('light' meant the dark theme was showing)
  const legacy = localStorage.getItem('theme')
  if (legacy) {
    localStorage.removeItem('theme')
    return legacy === 'light' ? 'dark' : 'light'
  }
  return 'system'
}

const media = window.matchMedia('(prefers-color-scheme: dark)')
const systemDark = ref(media.matches)
media.addEventListener('change', (e) => { systemDark.value = e.matches })

const mode = ref(readStoredMode())
const isDark = computed(() => mode.value === 'dark' || (mode.value === 'system' && systemDark.value))

// apply the theme class to <html> so every page, the body and teleported content all match
watchEffect(() => {
  const root = document.documentElement
  root.classList.toggle('dark-theme', isDark.value)
  root.classList.toggle('light-theme', !isDark.value)
  localStorage.setItem(STORAGE_KEY, mode.value)
})

export function useTheme () {
  const setMode = (value) => { mode.value = value }
  const toggleTheme = () => { mode.value = isDark.value ? 'light' : 'dark' }
  return { mode, isDark, setMode, toggleTheme }
}
