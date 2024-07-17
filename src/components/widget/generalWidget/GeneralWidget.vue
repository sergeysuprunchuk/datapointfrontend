<script lang="ts" setup>
import { Widget, WidgetType } from "../types"
import { computed } from "vue"
import TableWidget from "./widgets/TableWidget.vue"
import FormWidget from "./widgets/FormWidget.vue"
import InputTextWidget from "./widgets/InputTextWidget.vue"
import InputNumberWidget from "./widgets/InputNumberWidget.vue"
import CheckboxWidget from "./widgets/CheckboxWidget.vue"
import DropdownWidget from "./widgets/DropdownWidget.vue"

const props = defineProps<{ widget: Widget }>()

const widgetComponent = computed<any>(() => {
	return {
		[WidgetType.Table]: TableWidget,
		[WidgetType.Form]: FormWidget,
		[WidgetType.InputText]: InputTextWidget,
		[WidgetType.InputNumber]: InputNumberWidget,
		[WidgetType.Checkbox]: CheckboxWidget,
		[WidgetType.Dropdown]: DropdownWidget,
		[WidgetType.Bar]: null,
		[WidgetType.Line]: null,
		[WidgetType.Pie]: null,
		[WidgetType.Scatter]: null,
	}[props.widget.type]
})
</script>

<template>
	<component
		:is="widgetComponent"
		:widget="widget"
	/>
</template>
