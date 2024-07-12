<script lang="ts" setup>
import ColumnList from "../columnList/ColumnList.vue"
import TableForm from "../tableForm/TableForm.vue"
import { QTable, Query } from "../types"
import { getAllKeys, getKey } from "../utils"

const props = withDefaults(
	defineProps<{ sourceId: string; modelValue: Query; full?: boolean }>(),
	{
		full: false,
	},
)

const emit = defineEmits<{ "update:model-value": [Query] }>()

const updateQTable = (qTable: QTable) => {
	const keys = getAllKeys(qTable)
	emit("update:model-value", {
		...props.modelValue,
		table: qTable,
		offset: 0,
		columns: props.modelValue.columns?.filter(c =>
			keys.includes(getKey(c.tableKey)),
		),
	})
}
</script>

<template>
	<div class="w-full h-full">
		<table-form
			:source-id="sourceId"
			:model-value="modelValue.table"
			@update:model-value="updateQTable"
			:full="full"
		/>
		<column-list
			v-if="modelValue.table"
			:root="modelValue.table"
		/>
	</div>
</template>
