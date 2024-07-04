<script lang="ts" setup>
import { AppDataTable, AppColumn } from "../../ui"
import { useQuery } from "@tanstack/vue-query"
import { Widget } from "../../types/widget"
import { api } from "../../api/query"
import { QueryKey } from "../../enums/queryKey"
import { computed, watch } from "vue"
import { RuleKey } from "../../enums/ruleKey"
import { canExecute } from "../../utils/canExecute"

const props = defineProps<{ widget: Widget }>()

const { data, isLoading, refetch } = useQuery({
	queryKey: [QueryKey.Query],
	queryFn: () => api.execute(props.widget.query),
	enabled: () => canExecute(props.widget.query),
})

watch(
	() => props.widget.query,
	() => (canExecute(props.widget.query) ? refetch() : null),
	{ deep: true },
)

const value = computed(() => data.value?.data ?? [])

const columns = computed(() => data.value?.rules[RuleKey.Value] ?? [])
</script>

<template>
	<app-data-table
		:loading="isLoading"
		:value="value"
	>
		<app-column
			v-for="column in columns"
			:header="column"
			:field="column"
		/>
	</app-data-table>
</template>
