<script lang="ts" setup>
import DataForm from "../../widgetEditor/query/dataForm/DataForm.vue"
import { Widget } from "../../types.ts"
import { MetaKey, Query } from "../../widgetEditor/query/types.ts"
import OrderForm from "../../widgetEditor/query/orderForm/OrderForm.vue"
import ColumnsForm from "../../widgetEditor/query/columnsForm/ColumnsForm.vue"
import { computed } from "vue"
import PaginationForm from "../../widgetEditor/query/paginationForm/PaginationForm.vue"
import DeleteButtonForm from "./DeleteButtonForm.vue"

const model = defineModel<Widget>({ required: true })

const sourceId = computed<string>(() => model.value.query?.sourceId ?? "")

const setQuery = (query: Query) => (model.value = { ...model.value, query })

const setQueryValue = (key: keyof Query, value: any) => {
	model.value = {
		...model.value,
		query: { ...(<Query>model.value.query), [key]: value },
	}
}
</script>

<template>
	<div class="flex">
		<data-form
			:model-value="<Query>model.query"
			@update:model-value="setQuery"
			full
		/>
		<aside
			v-if="model.query?.table"
			class="common-sidebar transition-all"
		>
			<columns-form
				:source-id="sourceId"
				:model-value="(<Query>model.query).columns"
				@update:model-value="setQueryValue('columns', $event)"
				:meta-key="MetaKey.Value"
			/>
			<order-form
				:source-id="sourceId"
				:model-value="(<Query>model.query).orderBy"
				@update:model-value="setQueryValue('orderBy', $event)"
			/>
			<delete-button-form v-model="model" />
			<pagination-form
				:model-value="<Query>model.query"
				@update:model-value="setQuery"
			/>
		</aside>
	</div>
</template>
