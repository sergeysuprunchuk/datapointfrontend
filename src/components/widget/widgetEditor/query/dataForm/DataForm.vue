<script lang="ts" setup>
import { QColumn, QTable, Query } from "../types"
import SourceForm from "./sourceForm/SourceForm.vue"
import TableForm from "./tableForm/TableForm.vue"
import { deleteImpossible, getAllKeys } from "../utils.ts"
import ColumnList from "./columnList/ColumnList.vue"

defineProps<{ full?: boolean }>()

const model = defineModel<Query>({ required: true })

const emit = defineEmits<{
	"delete-columns": [QColumn[] | undefined]
}>()

const setSource = (sourceId: string) => {
	const columns = model.value.columns
	model.value = {
		sourceId,
		type: model.value.type,
	}
	emit("delete-columns", columns)
}

const setTable = (table: QTable) => {
	const keys = getAllKeys(table)

	const [newColumns, deleted] = deleteImpossible(model.value.columns, keys)

	const [newOrderBy] = deleteImpossible(model.value.orderBy, keys)

	model.value = {
		sourceId: model.value.sourceId,
		type: model.value.type,
		table,
		columns: newColumns,
		orderBy: newOrderBy,
		limit: model.value.limit,
	}

	emit("delete-columns", deleted)
}
</script>

<template>
	<aside class="common-sidebar">
		<source-form
			:model-value="model.sourceId"
			@update:model-value="setSource(<string>$event)"
		/>
		<table-form
			v-if="model.sourceId"
			:model-value="model.table"
			@update:model-value="setTable(<QTable>$event)"
			:source-id="model.sourceId"
			:full="full"
		/>
		<column-list
			v-if="model.table"
			:root="model.table"
		/>
	</aside>
</template>
