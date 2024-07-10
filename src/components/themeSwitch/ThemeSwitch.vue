<script lang="ts" setup>
import { AppButton } from "../../ui"
import { computed, onMounted, ref } from "vue"

const darkMode = ref<boolean>(false)

const icon = computed<string>(() => {
	return darkMode.value ? "pi pi-moon" : "pi pi-sun"
})

const DARK_CLASS: string = "dark"
const LIGHT_CLASS: string = "light"
const KEY = "theme"

const onClick = () => {
	if (darkMode.value) {
		document.documentElement.classList.remove(DARK_CLASS)
		localStorage.setItem(KEY, LIGHT_CLASS)
	} else {
		document.documentElement.classList.add(DARK_CLASS)
		localStorage.setItem(KEY, DARK_CLASS)
	}
	darkMode.value = !darkMode.value
}

onMounted(() => {
	const theme = localStorage.getItem(KEY)
	switch (theme) {
		case LIGHT_CLASS:
			return

		case DARK_CLASS:
			darkMode.value = true
			document.documentElement.classList.add(DARK_CLASS)
			return

		default:
			localStorage.setItem(KEY, LIGHT_CLASS)
			return
	}
})
</script>

<template>
	<app-button
		:icon="icon"
		@click="onClick"
		text
		size="small"
	/>
</template>
