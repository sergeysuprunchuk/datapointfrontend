<script lang="ts" setup>
import { PayloadKey, QColumn } from "../types"
import ColumnGroup from "../columnGroup/ColumnGroup.vue"
import { Nullable } from "primevue/ts-helpers"
import { AppDropdown } from "@/ui"
import FunctionDropdown from "../functionDropdown/FunctionDropdown.vue"

defineProps<{ sourceId: string }>()

const model = defineModel<Nullable<QColumn[]>>({ required: true })

const setColumns = (columns: QColumn[]) => {
	model.value = columns
}

const setColumn = (oldValue: QColumn, newValue: QColumn) => {
	model.value = model.value?.map(column =>
		column === oldValue ? newValue : column,
	)
}

interface Option {
	name: string
	value: string
}

const options: Option[] = [
	{ name: "По возрастанию", value: "ASC" },
	{ name: "По убыванию", value: "DESC" },
]
</script>

<template>
	<column-group
		header="Сортировать по"
		:model-value="model"
		@update:model-value="setColumns(<QColumn[]>$event)"
	>
		<template #default="{ column }">
			<function-dropdown
				:source-id="sourceId"
				:model-value="column"
				@update:model-value="setColumn(column, $event)"
			/>
			<app-dropdown
				placeholder="Порядок"
				:options="options"
				option-label="name"
				option-value="value"
				data-key="value"
				:model-value="column.payload?.[PayloadKey.Order]"
				@update:model-value="
					setColumn(column, {
						...column,
						payload: { [PayloadKey.Order]: $event },
					})
				"
			/>
		</template>
	</column-group>
</template>
