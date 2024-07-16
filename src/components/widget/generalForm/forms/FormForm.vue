<script lang="ts" setup>
import DataForm from "../../widgetEditor/query/dataForm/DataForm.vue"
import { Widget } from "../../types.ts"
import { QColumn, Query } from "../../widgetEditor/query/types.ts"
import ColumnGroup from "../../widgetEditor/query/columnGroup/ColumnGroup.vue"
import { cloneDeep } from "lodash"
import { newField } from "../../utils.ts"

const model = defineModel<Widget>({ required: true })

const setQuery = (query: Query) => (model.value = { ...model.value, query })

const addColumn = (column: QColumn) => {
	const clone = cloneDeep(model.value)

	if (clone.query)
		clone.query.columns = [...(clone.query.columns ?? []), column]

	clone.children = [...(clone.children ?? []), newField(column)]

	model.value = clone
}

const deleteColumn = (/*column: QColumn*/) => {}
</script>

<template>
	<div class="flex">
		<data-form
			:model-value="<Query>model.query"
			@update:model-value="setQuery"
		/>
		<aside
			v-if="model.query?.table"
			class="common-sidebar transition-all"
		>
			<column-group
				header="Поля формы"
				:model-value="(<Query>model.query).columns"
				@update:model-value="
					() => {
						/*не реагировать*/
					}
				"
				@add="addColumn"
				@delete="deleteColumn"
			/>
		</aside>
	</div>
</template>
