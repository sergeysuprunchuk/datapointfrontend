<script lang="ts" setup>
import { AppChart, AppPaginator } from "@/ui"
import { Widget } from "@/components/widget/types"
import {
	syncQuery,
	useQuery,
} from "@/components/widget/widgetEditor/query/utils"
import { MetaKey, Query } from "@/components/widget/widgetEditor/query/types"
import { computed } from "vue"
import { ChartData, ChartDataset, ChartOptions } from "chart.js"
import { storeToRefs } from "pinia"
import { Palette, useAppConfig } from "@/stores/appConfig"
import { useFont } from "./utils"
import { Axis } from "@/components/widget/generalWidget/widgets/charts/types"

const props = defineProps<{
	widget: Widget
	type: string
	overrideOptions?: (style: CSSStyleDeclaration) => { [key: string]: any }
	appendDataset?: (
		palette: Palette,
		shade: number,
		index: number,
	) => { [key: string]: any }
}>()

const query = syncQuery(() => <Query>props.widget.query)

const { data, rules, total, setPage, page, limit } = useQuery(query)

const { style, primaryShade, appConfig } = storeToRefs(useAppConfig())

const chartData = computed<ChartData>(() => {
	const labels: string[] = []
	const datasets: ChartDataset[] = []

	if (
		rules.value?.[MetaKey.Label]?.length &&
		rules.value?.[MetaKey.Value]?.length &&
		data.value
	) {
		const label: string = rules.value[MetaKey.Label][0]
		const pointers: { [key: string]: ChartDataset } = {}

		rules.value[MetaKey.Value].forEach((key, index) => {
			const dataset: ChartDataset = {
				...(props.appendDataset?.(
					appConfig.value.palette,
					primaryShade.value,
					index,
				) ?? {}),
				label: key,
				data: [],
			}
			pointers[key] = dataset
			datasets.push(dataset)
		})

		data.value.forEach(value => {
			labels.push(value[label])

			rules.value[MetaKey.Value].forEach(key => {
				pointers[key].data.push(<any>{
					[Axis.X]: value[label],
					[Axis.Y]: value[key],
				})
			})
		})
	}

	return {
		labels,
		datasets,
	}
})

const options = computed<ChartOptions>(() => {
	const { color, backgroundColor } = style.value
	const padding = 15
	const usePointStyle = true
	const font = useFont(style.value)

	return {
		plugins: {
			legend: {
				labels: { color, font, usePointStyle },
			},

			tooltip: {
				padding,
				usePointStyle,
				backgroundColor: color,
				titleColor: backgroundColor,
				bodyColor: backgroundColor,
				titleFont: font,
				bodyFont: font,
				titleAlign: "center",
			},
		},

		...(props.overrideOptions?.(style.value) ?? {}),
	}
})
</script>

<template>
	<div class="w-full primary-background rounded-md p-6">
		<app-chart
			:type="type"
			:options="options"
			:data="chartData"
		/>
		<app-paginator
			:always-show="false"
			:total-records="total"
			:rows="limit"
			:first="page"
			@update:first="setPage"
		/>
	</div>
</template>
