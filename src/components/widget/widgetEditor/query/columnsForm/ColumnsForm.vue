<script lang="ts" setup>
import { MetaKey, QColumn } from "../types"
import { Nullable } from "primevue/ts-helpers"
import FunctionDropdown from "../functionDropdown/FunctionDropdown.vue"
import ColumnGroup from "../columnGroup/ColumnGroup.vue"

withDefaults(
	defineProps<{ sourceId: string; metaKey?: MetaKey; header?: string }>(),
	{ header: "Столбцы таблицы" },
)

const model = defineModel<Nullable<QColumn[]>>({ required: true })

const setColumns = (columns: QColumn[]) => {
	model.value = columns
}

const setColumn = (oldValue: QColumn, newValue: QColumn) => {
	model.value = model.value?.map(column =>
		column === oldValue ? newValue : column,
	)
}
</script>

<template>
	<column-group
		:header="header"
		:model-value="model"
		@update:model-value="setColumns(<QColumn[]>$event)"
		:meta-key="metaKey"
	>
		<template #default="{ column }">
			<function-dropdown
				:source-id="sourceId"
				:model-value="column"
				@update:model-value="setColumn(column, $event)"
			/>
		</template>
	</column-group>
</template>
