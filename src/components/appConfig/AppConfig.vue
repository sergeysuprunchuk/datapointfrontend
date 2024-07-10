<script lang="ts" setup>
import { AppBlock, AppButton, AppOverlayPanel } from "../../ui"
import { computed, onMounted, ref } from "vue"
import { palettes, PRIMARY, shades } from "./palettes"
import { Palette, PaletteKey } from "./types"

const panel = ref<any>()

const toggle = (event: any) => panel.value.toggle(event)

const LOCAL_KEY = "palette"

const switchPalette = (palette: Palette) => {
	localStorage.setItem(LOCAL_KEY, palette.key)

	const style = document.documentElement.style

	shades.forEach((s, i) => {
		style.setProperty(`--primary-${s}`, palette.colors[i])
	})
}

const currentPalette = computed<PaletteKey>(() => {
	const item = localStorage.getItem(LOCAL_KEY)

	if (
		!item ||
		![
			PaletteKey.Indigo,
			PaletteKey.Blue,
			PaletteKey.Emerald,
			PaletteKey.Rose,
		].includes(item)
	) {
		localStorage.setItem(LOCAL_KEY, PaletteKey.Indigo)
		return PaletteKey.Indigo
	}

	return item
})

onMounted(() => {
	if (currentPalette.value !== PaletteKey.Indigo) {
		const palette = palettes.find(p => p.key === currentPalette.value)

		switchPalette(palette)
	}
})
</script>

<template>
	<app-button
		size="small"
		text
		icon="pi pi-palette"
		@click="toggle"
	/>
	<app-overlay-panel ref="panel">
		<app-block
			header="Палитра"
			class="py-1 px-1"
		>
			<div class="flex flex-col gap-3">
				<div class="flex gap-1 flex-wrap">
					<div
						class="w-4 h-4 rounded-full cursor-pointer"
						v-for="palette in palettes"
						:style="{ backgroundColor: `rgb(${palette.colors[PRIMARY]})` }"
						@click="switchPalette(palette)"
					/>
				</div>
			</div>
		</app-block>
	</app-overlay-panel>
</template>
