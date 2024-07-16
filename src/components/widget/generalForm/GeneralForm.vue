<script lang="ts" setup>
import { Widget, WidgetType } from "../types.ts"
import { computed } from "vue"
import TableForm from "./forms/TableForm.vue"
import FormForm from "./forms/FormForm.vue"

const model = defineModel<Widget>({ required: true })

const form = computed<any>(() => {
	switch (model.value.type) {
		case WidgetType.Table:
			return TableForm

		case WidgetType.Form:
			return FormForm

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
