import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { registerLicense } from '@syncfusion/ej2-base'
import { VueApexCharts } from "vue3-apexcharts"
import store from './store'
const app = createApp(App)

app.use(store)
app.use(router)
app.use(VueApexCharts)
app.component("apexchart", VueApexCharts)
app.mount('#app')
registerLicense("Ngo9BigBOggjHTQxAR8/V1JFaF1cXGFCf1FpR2FGfV5ycUVHYVZQQ3xfRU0SNHVRdkdmWH5ccnVUR2ddUEd2V0ZWYEg=")