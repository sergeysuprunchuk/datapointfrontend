<script lang="ts" setup>
import { ref } from "vue"
import { Query, QueryType } from "./types"
import { Widget, WidgetType } from "../widget/types"
import { AppSelectButton } from "../../ui"
import DataForm from "./dataForm/DataForm.vue"
import SelectForm from "./selectForm/SelectForm.vue"
import InsertForm from "./insertForm/InsertForm.vue"
import CommonWidget from "../widget/CommonWidget.vue"

const props = defineProps<{ sourceId: string }>()

const cleanQuery = (type: QueryType): Query => {
	return {
		sourceId: props.sourceId,
		type,
		limit: 10,
		offset: 0,
	}
}

const widget = ref<Widget>({
	type: WidgetType.Table,
	query: cleanQuery(QueryType.Select),
})

const types = [
	{ label: "Таблица", type: QueryType.Select },
	{ label: "Форма", type: QueryType.Insert },
]

const updateType = (type: QueryType) => {
	widget.value = {
		type: type === QueryType.Select ? WidgetType.Table : WidgetType.Form,
		query: cleanQuery(type),
	}
}
</script>

<template>
	<div class="w-full h-full flex">
		<aside class="common-sidebar">
			<data-form
				:source-id="sourceId"
				v-model="<Query>widget.query"
				:full="(<Query>widget.query).type === QueryType.Select"
			/>
		</aside>
		<aside class="common-sidebar">
			<select-form
				v-if="widget.type === WidgetType.Table"
				:source-id="sourceId"
				v-model="<Query>widget.query"
			/>
			<insert-form
				v-else
				v-model="widget"
			/>
		</aside>
		<div class="w-full flex flex-col">
			<header class="px-6 py-4 border-b primary-border primary-background">
				<app-select-button
					:options="types"
					option-label="label"
					option-value="type"
					:allow-empty="false"
					:model-value="(<Query>widget.query).type"
					@update:model-value="updateType"
				/>
			</header>
			<div class="w-full overflow-auto p-6 flex justify-start">
				<common-widget :widget="widget" />
			</div>
		</div>
	</div>
</template>
