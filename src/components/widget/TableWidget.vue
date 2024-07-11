<script lang="ts" setup>
import { AppDataTable, AppColumn } from "../../ui"
import { Widget } from "./types"
import { computed, onMounted, ref, watch } from "vue"
import { QResponse, QTable, Query, SQResponse } from "../queryEditor/types"
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

const value = computed<any>(() => {
	return data.value ? (<QResponse<SQResponse>>data.value).data.data : []
})

const columns = computed<string[]>(() => {
	return data.value
		? (<QResponse<SQResponse>>data.value).data.rules[MetaKey.Value]
		: []
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
</template>
