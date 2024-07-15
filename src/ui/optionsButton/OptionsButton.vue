<script lang="ts" setup>
import { AppOverlayPanel, AppBlock } from ".."
import { ref, useAttrs } from "vue"

withDefaults(defineProps<{ header?: string }>(), { header: "Опции" })

const panel = ref()

const toggle = (event: any) => panel.value.toggle(event)

const attrs = useAttrs()
</script>

<template>
	<i
		class="pi pi-ellipsis-v cursor-pointer"
		@click="toggle"
		v-bind="attrs"
	/>
	<app-overlay-panel ref="panel">
		<app-block
			:header="header"
			class="py-1 px-1"
		>
			<div class="min-w-64 flex flex-col gap-3">
				<slot />
			</div>
		</app-block>
	</app-overlay-panel>
</template>
