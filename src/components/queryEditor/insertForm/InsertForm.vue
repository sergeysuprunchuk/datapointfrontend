<script lang="ts" setup>
import ColumnGroup from "../columnGroup/ColumnGroup.vue"
import { FieldProps, Widget, WidgetType } from "../../widget/types"
import { QColumn, Query } from "../types"
import { ColumnType } from "../../../types/source"

const props = defineProps<{ modelValue: Widget }>()

const emit = defineEmits<{ "update:model-value": [Widget] }>()

const newField = (qColumn: QColumn): Widget => {
	const field: Widget<FieldProps> = {
		type: WidgetType.InputText,
		props: { name: qColumn.name, placeholder: qColumn.name },
	}

	if (qColumn.rawColumn.type === ColumnType.Number)
		field.type = WidgetType.InputNumber

	return field
}

const addColumn = (qColumn: QColumn) => {
	emit("update:model-value", {
		...props.modelValue,
		children: [...(props.modelValue.children ?? []), newField(qColumn)],
		query: {
			...(<Query>props.modelValue.query),
			columns: [...(props.modelValue.query?.columns ?? []), qColumn],
		},
	})
}
</script>

<template>
	<div class="w-full h-full">
		<column-group
			color="lime"
			header="Поля формы"
			:model-value="modelValue.query?.columns"
			@add="addColumn"
		></column-group>
	</div>
</template>
