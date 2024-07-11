<script lang="ts" setup>
import TableForm from "./tableForm/TableForm.vue"
import { computed, ref } from "vue"
import { MetaKey, QTable, Query, QueryType } from "./types"
import ColumnList from "./columnList/ColumnList.vue"
import ColumnGroup from "./columnGroup/ColumnGroup.vue"
import TableWidget from "../widget/TableWidget.vue"
import { Widget } from "../widget/types"
import { getAllKeys, getKey } from "./utils"
import PaginationForm from "./paginationForm/PaginationForm.vue"

const props = defineProps<{ sourceId: string }>()

const query = ref<Query>({
	sourceId: props.sourceId,
	type: QueryType.Select,
	limit: 0,
	offset: 0,
})

const updateQTable = (qTable: QTable) => {
	query.value.table = qTable

	const keys = getAllKeys(qTable)

	query.value.columns = query.value.columns?.filter(c =>
		keys.includes(getKey(c.tableKey)),
	)

	query.value.offset = 0
}

const widget = computed<Widget>(() => {
	return {
		query: JSON.parse(
			JSON.stringify(query.value, (key, value) => {
				if (key === "rawColumns" || key === "parent") return
				return value
			}),
		),
	}
})
</script>

<template>
	<div class="w-full h-full flex">
		<aside class="common-sidebar">
			<table-form
				:source-id="sourceId"
				:model-value="query.table"
				@update:model-value="updateQTable"
			/>
			<column-list
				v-if="query.table"
				:root="query.table"
			/>
		</aside>
		<aside class="common-sidebar">
			<column-group
				header="Столбцы таблицы"
				v-model="query.columns"
				:meta-key="MetaKey.Value"
				@update:model-value="query.offset = 0"
			/>
			<pagination-form
				v-model="query.limit"
				@update:model-value="query.offset = 0"
			/>
		</aside>
		<div class="w-full flex flex-col">
			<header></header>
			<div class="w-full h-full overflow-auto p-6">
				<table-widget :widget="widget" />
			</div>
		</div>
	</div>
</template>
