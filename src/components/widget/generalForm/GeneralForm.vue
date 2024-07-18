<script lang="ts" setup>
import { Widget, WidgetType } from "../types"
import { computed } from "vue"
import TableForm from "./forms/TableForm.vue"
import FormForm from "./forms/FormForm.vue"
import ChartForm from "@/components/widget/generalForm/forms/ChartForm.vue"

const model = defineModel<Widget>({ required: true })

const form = computed<any>(() => {
	switch (model.value.type) {
		case WidgetType.Table:
			return TableForm

		case WidgetType.Form:
			return FormForm

		case WidgetType.Pie:
		case WidgetType.Line:
		case WidgetType.Bar:
		case WidgetType.Scatter:
			return ChartForm

		default:
			return
	}
})
</script>

<template>
	<component
		v-model="model"
		:is="form"
	/>
</template>
