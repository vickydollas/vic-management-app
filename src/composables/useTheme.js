import { ref, onMounted } from 'vue'
const isLight = ref(false)
const valueSelection = ref('dark')
export function useTheme () {
    const toggleTheme = () => {
        isLight.value = !isLight.value
        if (isLight.value) {
            localStorage.setItem('theme', 'light')
        } else {
            localStorage.setItem('theme', 'dark')
        }
    }
    const optionTheme = (option) => {
        valueSelection.value = option
        if (option === 'light') {
            isLight.value = false
        }else if (option === 'dark') {
            isLight.value = true
        }else{
            isLight.value = false
        }
        localStorage.setItem('theme', isLight.value ? 'light' : 'dark')
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
        toggleTheme,
        optionTheme
    }
}