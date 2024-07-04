import { createApp } from "vue"
import PrimeVue from "primevue/config"
import { RouterView } from "vue-router"
import Aura from "./assets/presets/aura"
import { VueQueryPlugin } from "@tanstack/vue-query"
import "./style.css"
import { router } from "./router"
import ChartDataLabels from "chartjs-plugin-datalabels"
import { Chart } from "chart.js"
import Tooltip from "primevue/tooltip"

Chart.register(ChartDataLabels)

createApp(RouterView)
	.use(PrimeVue, {
		unstyled: true,
		pt: Aura,
		ripple: true,
	})
	.directive("tooltip", Tooltip)
	.use(VueQueryPlugin)
	.use(router)
	.mount("#app")
