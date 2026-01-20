import { reactive, computed } from "vue";

const state = reactive({
    user: JSON.parse(localStorage.getItem('user')) || null
})

const login = (useData) => {
    state.user = useData
    localStorage.setItem('user', JSON.stringify(useData))
}

const logout = () => {
    state.user = null
    localStorage.removeItem('user')
}

const isLoggedIn = computed(() => !!state.user)
const isEmployee = computed(() => state.user?.title === "employee")
const isAdmin = computed(() => { state.user?.title === "HR Manager"})

export function useAuth() {
    return {
        state,
        login,
        logout,
        isEmployee,
        isLoggedIn,
        isAdmin
    }
}