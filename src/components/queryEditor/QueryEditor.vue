<script lang="ts" setup>
import { computed, ref } from "vue"
import { Query, QueryType } from "./types"
import TableWidget from "../widget/TableWidget.vue"
import { Widget } from "../widget/types"
import { AppSelectButton } from "../../ui"
import DataForm from "./dataForm/DataForm.vue"
import SelectForm from "./selectForm/SelectForm.vue"

const props = defineProps<{ sourceId: string }>()

const query = ref<Query>({
	sourceId: props.sourceId,
	type: QueryType.Select,
	limit: 10,
	offset: 0,
})

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

const types = [
	{ label: "Таблица", type: QueryType.Select },
	{ label: "Форма", type: QueryType.Insert },
]

const updateType = (type: QueryType) => {
	query.value = { sourceId: props.sourceId, type, limit: 10, offset: 0 }
}
</script>

<template>
	<div class="w-full h-full flex">
		<aside class="common-sidebar">
			<data-form
				:source-id="sourceId"
				v-model="query"
				:full="query.type === QueryType.Select"
			/>
		</aside>
		<aside class="common-sidebar">
			<select-form
				:source-id="sourceId"
				v-model="query"
			/>
		</aside>
		<div class="w-full flex flex-col">
			<header class="px-6 py-4 border-b primary-border primary-background">
				<app-select-button
					:options="types"
					option-label="label"
					option-value="type"
					:allow-empty="false"
					:model-value="query.type"
					@update:model-value="updateType"
				/>
			</header>
			<div class="w-full h-full overflow-auto p-6">
				<table-widget :widget="widget" />
			</div>
		</div>
	</div>
</template>
