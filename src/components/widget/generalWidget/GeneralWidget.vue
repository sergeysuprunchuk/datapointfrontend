<script lang="ts" setup>
import { Widget, WidgetType } from "../types"
import { computed } from "vue"
import TableWidget from "./widgets/TableWidget.vue"
import FormWidget from "./widgets/FormWidget.vue"
import InputTextWidget from "./widgets/InputTextWidget.vue"
import InputNumberWidget from "./widgets/InputNumberWidget.vue"
import CheckboxWidget from "./widgets/CheckboxWidget.vue"
import DropdownWidget from "./widgets/DropdownWidget.vue"
import BarWidget from "@/components/widget/generalWidget/widgets/charts/BarWidget.vue"
import LineWidget from "@/components/widget/generalWidget/widgets/charts/LineWidget.vue"
import PieWidget from "@/components/widget/generalWidget/widgets/charts/PieWidget.vue"
import ScatterWidget from "@/components/widget/generalWidget/widgets/charts/ScatterWidget.vue"

const props = defineProps<{ widget: Widget }>()

const widgetComponent = computed<any>(() => {
	return {
		[WidgetType.Table]: TableWidget,
		[WidgetType.Form]: FormWidget,
		[WidgetType.InputText]: InputTextWidget,
		[WidgetType.InputNumber]: InputNumberWidget,
		[WidgetType.Checkbox]: CheckboxWidget,
		[WidgetType.Dropdown]: DropdownWidget,
		[WidgetType.Bar]: BarWidget,
		[WidgetType.Line]: LineWidget,
		[WidgetType.Pie]: PieWidget,
		[WidgetType.Scatter]: ScatterWidget,
	}[props.widget.type]
})
</script>

<template>
	<component
		:is="widgetComponent"
		:widget="widget"
	/>
</template>
