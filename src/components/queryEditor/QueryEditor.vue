<script lang="ts" setup>
import TableForm from "./tableForm/TableForm.vue"
import { computed, ref } from "vue"
import { MetaKey, QTable, Query, QueryType } from "./types"
import ColumnList from "./columnList/ColumnList.vue"
import ColumnGroup from "./columnGroup/ColumnGroup.vue"
import TableWidget from "../widget/TableWidget.vue"
import { Widget } from "../widget/types"

const props = defineProps<{ sourceId: string }>()

const query = ref<Query>({ sourceId: props.sourceId, type: QueryType.Select })

const updateQTable = (qTable: QTable) => {
	query.value.table = qTable
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

<style scoped>
.common-sidebar {
	@apply shrink-0
	primary-background
	primary-border
	w-64
	border-r
	h-full;
}
</style>
