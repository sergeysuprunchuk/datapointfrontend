<script lang="ts" setup>
import { AppDataTable, AppColumn, AppPaginator } from "../../ui"
import { Widget } from "./types"
import { computed, onMounted, ref, watch } from "vue"
import { QTable, Query, SQResponse } from "../queryEditor/types"
import { cloneDeep } from "lodash"
import { useQuery } from "@tanstack/vue-query"
import { api } from "../../api/query"
import { QueryKey } from "../../enums/queryKey"
import { MetaKey } from "../queryEditor/types"

//ожидается, что это будут данные без полей редактора.
const props = defineProps<{ widget: Widget }>()

const query = ref<Query>()

const copyQuery = () => (query.value = cloneDeep(props.widget.query))

onMounted(copyQuery)

watch(() => props.widget.query, copyQuery, { deep: true })

const enabled = computed<boolean>(() => {
	if (
		!query.value ||
		!query.value.table ||
		!query.value.columns ||
		!query.value.columns.length
	)
		return false

	const queue: QTable[] = query.value.table.next ?? []

	for (const i of queue) {
		if (!i.rule || !i.rule.conditions || i.rule.conditions.length === 0)
			return false

		for (const condition of i.rule.conditions) {
			if (!condition.columns[0] || !condition.columns[1]) return false
		}

		if (i.next) queue.push(...i.next)
	}

	return true
})

const { data, isLoading } = useQuery({
	queryKey: [QueryKey.Query, query],
	queryFn: () => api.execute(<Query>query.value),
	enabled,
})

const response = computed<SQResponse | undefined>(() => {
	return data.value ? <SQResponse>data.value.data : undefined
})

const value = computed<any>(() => (response.value ? response.value.data : []))

const columns = computed<string[]>(() =>
	response.value ? response.value.rules[MetaKey.Value] : [],
)

const total = computed<number>(() =>
	response.value ? response.value.total : 0,
)

const updateFirst = (offset: number) => {
	if (query.value) query.value.offset = offset
}

const first = computed<number>(() => {
	if (query.value && query.value.offset && query.value.limit) {
		return query.value.offset / query.value.limit
	}
	return 0
})
</script>

<template>
	<app-data-table
		:value="value"
		:loading="isLoading"
	>
		<app-column
			v-for="column in columns"
			:header="column"
			:field="column"
		/>
	</app-data-table>
	<app-paginator
		:always-show="false"
		:total-records="total"
		:rows="(<Query>widget.query).limit"
		:first="first"
		@update:first="updateFirst"
	/>
</template>
