<script lang="ts" setup>
import GeneralChart from "./GeneralChart.vue"
import { Widget } from "@/components/widget/types"
import { Palette } from "@/stores/appConfig.ts"
import { getColors } from "@/components/widget/generalWidget/widgets/charts/utils.ts"

defineProps<{ widget: Widget }>()

const appendDataset = (palette: Palette, shade: number, _index: number) => {
	const colors = getColors(palette, shade)
	return {
		backgroundColor: colors,
		borderWidth: 1.5,
	}
}

const overrideOptions = () => {
	return {
		aspectRatio: 2,
	}
}
</script>

<template>
	<general-chart
		:widget="widget"
		type="pie"
		:override-options="overrideOptions"
		:append-dataset="appendDataset"
	/>
</template>
