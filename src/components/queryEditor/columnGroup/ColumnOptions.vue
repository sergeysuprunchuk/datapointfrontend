<script lang="ts" setup>
import { AppOverlayPanel, AppBlock } from "../../../ui"
import { ref } from "vue"
import { QColumn } from "../types"

defineProps<{ modelValue: QColumn }>()

defineEmits<{
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
		<app-overlay-panel ref="panel">
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
