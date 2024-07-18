import { createApp } from "vue"
import PrimeVue from "primevue/config"
import { RouterView } from "vue-router"
import Aura from "./assets/presets/aura"
import { VueQueryPlugin } from "@tanstack/vue-query"
import "./style.css"
import { router } from "./router"
import Tooltip from "primevue/tooltip"
import { createPinia } from "pinia"

createApp(RouterView)
	.use(PrimeVue, {
		unstyled: true,
		pt: Aura,
		ripple: true,
	})
	.directive("tooltip", Tooltip)
	.use(createPinia())
	.use(VueQueryPlugin)
	.use(router)
	.mount("#app")
