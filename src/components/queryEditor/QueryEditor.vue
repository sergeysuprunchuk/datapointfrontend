<script lang="ts" setup>
import TableForm from "./tableForm/TableForm.vue"
import { computed, ref } from "vue"
import { MetaKey, PayloadKey, QTable, Query, QueryType } from "./types"
import ColumnList from "./columnList/ColumnList.vue"
import ColumnGroup from "./columnGroup/ColumnGroup.vue"
import TableWidget from "../widget/TableWidget.vue"
import { Widget } from "../widget/types"
import { getAllKeys, getKey } from "./utils"
import PaginationForm from "./paginationForm/PaginationForm.vue"
import { AppDropdown } from "../../ui"
import { useQuery } from "@tanstack/vue-query"
import { QueryKey } from "../../enums/queryKey"
import { api } from "../../api/source"

const props = defineProps<{ sourceId: string }>()

const query = ref<Query>({
	sourceId: props.sourceId,
	type: QueryType.Select,
	limit: 10,
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
				if (key === "rawColumns" || key === "rawColumn") return
				return value
			}),
		),
	}
})

const updateOrderType = (i: number, type: string) => {
	if (query.value.orderBy) {
		if (!query.value.orderBy[i].payload) {
			query.value.orderBy[i].payload = {
				[PayloadKey.Order]: type,
			}
			return
		}

		query.value.orderBy[i].payload[PayloadKey.Order] = type
	}
}

const orderType = (i: number) => {
	if (query.value.orderBy && query.value.orderBy[i]?.payload) {
		return query.value.orderBy[i].payload[PayloadKey.Order]
	}

	return null
}

const { data: functions, isLoading } = useQuery({
	queryKey: [QueryKey.Functions, props.sourceId],
	queryFn: () => api.getFunctions(props.sourceId),
})

const columnType = (i: number): string => {
	if (query.value.columns) return query.value.columns[i].rawColumn.type
	return ""
}

const columnFunc = (i: number): string | undefined => {
	return query.value.columns?.[i]?.func
}

const updateColumnFunc = (i: number, func: string) => {
	if (query.value.columns && query.value.columns[i]) {
		query.value.columns[i].func = func
	}
}
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
				color="lime"
				header="Столбцы таблицы"
				v-model="query.columns"
				:meta-key="MetaKey.Value"
				@update:model-value="query.offset = 0"
			>
				<template
					#default="{ i }"
					v-if="functions"
				>
					<app-dropdown
						placeholder="Функция"
						:loading="isLoading"
						:options="functions[columnType(i)]"
						:model-value="columnFunc(i)"
						@update:modelValue="updateColumnFunc(i, $event)"
					/>
				</template>
			</column-group>
			<column-group
				color="amber"
				header="Сортировать по"
				v-model="query.orderBy"
			>
				<template #default="{ i }">
					<app-dropdown
						placeholder="Сортировать по"
						:options="['ASC', 'DESC']"
						:model-value="orderType(i)"
						@update:modelValue="updateOrderType(i, $event)"
					/>
				</template>
			</column-group>
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
