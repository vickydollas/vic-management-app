import { ref, onMounted } from 'vue'
const isLight = ref(false)
export function useTheme () {
    const toggleTheme = () => {
        isLight.value = !isLight.value
        if (isLight.value) {
            localStorage.setItem('theme', 'light')
        } else {
            localStorage.setItem('theme', 'dark')
        }
    }
    onMounted(() => {
        const savedItem = localStorage.getItem('theme')
        // const previousTheme = window.matchMedia('(prefers-color-scheme: light)').matches 
        if (savedItem === 'light') {
            isLight.value = true
        }
    })
    return{
        isLight,
        toggleTheme
    }
}