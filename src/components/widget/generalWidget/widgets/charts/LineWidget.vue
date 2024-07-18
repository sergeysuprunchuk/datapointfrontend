<script lang="ts" setup>
import GeneralChart from "./GeneralChart.vue"
import { Widget } from "@/components/widget/types"
import { getColor, xyDefault } from "./utils"
import { Palette } from "@/stores/appConfig.ts"

defineProps<{ widget: Widget }>()

const appendDataset = (palette: Palette, shade: number, index: number) => {
	const color = getColor(palette, shade, index)
	return {
		borderColor: color,
		backgroundColor: color,
	}
}
</script>

<template>
	<general-chart
		:widget="widget"
		type="line"
		:override-options="xyDefault"
		:append-dataset="appendDataset"
	/>
</template>
