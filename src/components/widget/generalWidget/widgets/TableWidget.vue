<script lang="ts" setup>
import { Widget } from "../../types.ts"
import { MetaKey, Query } from "../../widgetEditor/query/types.ts"
import { syncQuery, useQuery } from "../../widgetEditor/query/utils.ts"
import { AppDataTable, AppColumn, AppPaginator } from "@/ui"
import { computed } from "vue"
import GeneralWidget from "@/components/widget/generalWidget/GeneralWidget.vue"

const props = defineProps<{ widget: Widget }>()

const query = syncQuery(() => <Query>props.widget.query)

const { data, rules, isLoading, total, setPage, page, limit } = useQuery(query)

const columns = computed<string[]>(() => rules.value[MetaKey.Value] ?? [])
</script>

<template>
	<app-data-table
		:loading="isLoading"
		:value="data"
		class="flex-1"
	>
		<app-column
			v-for="column in columns"
			:field="column"
			:header="column"
		/>
		<app-column
			v-if="widget.children"
			header="Действия"
		>
			<template #body="{ data }">
				<general-widget
					v-for="child in widget.children"
					:widget="child"
					:data="data"
				/>
			</template>
		</app-column>
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
