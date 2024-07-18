<script lang="ts" setup>
import { AppOptionsButton, AppButton } from "@/ui"
import { Theme, useAppConfig } from "@/stores/appConfig.ts"
import { computed } from "vue"

const { appConfig, toggleTheme, palettes, setPalette } = useAppConfig()

const icon = computed<string>(() =>
	appConfig.theme === Theme.Light ? "pi pi-sun" : "pi pi-moon",
)

const label = computed<string>(() =>
	appConfig.theme === Theme.Light ? "Светлая" : "Темная",
)
</script>

<template>
	<app-options-button
		class="pi pi-cog"
		header="Настройка приложения"
	>
		<div class="flex flex-col gap-3 max-w-64">
			<div class="flex gap-1 flex-wrap">
				<div
					class="h-4 w-4 rounded-full cursor-pointer"
					v-for="palette in palettes"
					:style="{ backgroundColor: palette[1] }"
					@click="setPalette(<any>palette[0])"
				/>
			</div>
			<app-button
				:icon="icon"
				outlined
				size="small"
				:label="label"
				@click="toggleTheme"
			/>
		</div>
	</app-options-button>
</template>
