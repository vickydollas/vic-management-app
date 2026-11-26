import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import 'primeicons/primeicons.css'
import './composables/useTheme' // applies the saved theme before the first render
import router from './router'
import { registerLicense } from '@syncfusion/ej2-base'
import VueApexCharts from 'vue3-apexcharts'
import store from './store'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)

// Pinia + persisted state (like Zustand's `persist` middleware)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(store)
app.use(router)
app.use(VueApexCharts)
// app.component("apexchart", VueApexCharts)
app.mount('#app')
// registerLicense("Ngo9BigBOggjHTQxAR8/V1JFaF1cXGFCf1FpR2FGfV5ycUVHYVZQQ3xfRU0SNHVRdkdmWH5ccnVUR2ddUEd2V0ZWYEg=")