<script lang="ts" setup>
import { AppOverlayPanel, AppBlock } from "../../../ui"
import { ref } from "vue"
import { QColumn } from "../types"

const props = defineProps<{ modelValue: QColumn }>()

const emit = defineEmits<{
	"update:model-value": [QColumn]
}>()

const panel = ref<any>()

const toggle = (event: any) => panel.value.toggle(event)
</script>

<template>
	<span>
		<i
			class="pi pi-ellipsis-v cursor-pointer"
			@click="toggle"
		/>
		<app-overlay-panel
			ref="panel"
			:pt="{
				root: {
					class: [
						'rounded-md shadow-lg',
						'absolute left-0 top-0 mt-2',
						'z-40 transform origin-center',
						'bg-surface-0 dark:bg-surface-900',
						'text-surface-700 dark:text-surface-0/80',
					],
				},
			}"
		>
			<app-block
				header="Опции"
				class="px-1 py-1"
			>
				<div class="w-64 flex flex-col gap-3">
					<slot />
				</div>
			</app-block>
		</app-overlay-panel>
	</span>
</template>
