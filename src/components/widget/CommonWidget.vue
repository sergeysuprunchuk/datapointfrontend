<script lang="ts" setup>
import { computed } from "vue"
import { Widget, WidgetType } from "./types"
import TableWidget from "./TableWidget.vue"
import FormWidget from "./FormWidget.vue"
import InputTextWidget from "./InputTextWidget.vue"
import InputNumberWidget from "./InputNumberWidget.vue"
import DropdownWidget from "./DropdownWidget.vue"

const props = defineProps<{ widget: Widget; modelValue?: any }>()

const emit = defineEmits(["update:model-value"])

const getComponent = computed<any>(() => {
	switch (props.widget.type) {
		case WidgetType.Table:
			return TableWidget
		case WidgetType.Form:
			return FormWidget
		case WidgetType.Dropdown:
			return DropdownWidget
		case WidgetType.InputNumber:
			return InputNumberWidget
		case WidgetType.InputText:
			return InputTextWidget
		default:
			return null
	}
})
</script>

<template>
	<component
		:is="getComponent"
		:model-value="modelValue"
		@update:model-value="emit('update:model-value', $event)"
		:widget="widget"
	/>
</template>
