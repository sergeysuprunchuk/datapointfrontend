<script lang="ts" setup>
import { Widget } from "../../types"
import { MetaKey, Query } from "../../../query/types"
import { syncQuery, useQuery } from "../../../query/utils"
import { AppDataTable, AppColumn, AppPaginator } from "../../../../../ui"
import { computed } from "vue"

const props = defineProps<{ widget: Widget }>()

const query = syncQuery(() => <Query>props.widget.query)

const { data, rules, isLoading, total, setPage, page, limit } = useQuery(query)

const columns = computed<string[]>(() => rules.value[MetaKey.Value] ?? [])
</script>

<template>
	<app-data-table
		:loading="isLoading"
		:value="data"
	>
		<app-column
			v-for="column in columns"
			:field="column"
			:header="column"
		/>
		<template #footer>
			<app-paginator
				:always-show="false"
				:total-records="total"
				:rows="limit"
				:first="page"
				@update:first="setPage"
			/>
		</template>
		<template #empty>
			<div class="uppercase text-sm text-center">Данные отсутствуют</div>
		</template>
	</app-data-table>
</template>
