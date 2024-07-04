<script lang="ts" setup>
import { AppBlock, AppButton } from "../../ui"
import { QColumn, Query } from "../../types/query"
import TableForm from "./tableForm/TableForm.vue"
import ColumnField from "./columnField/ColumnField.vue"
import { RuleKey } from "../../enums/ruleKey"
import { getAllKeys, getKey } from "./utils"

const props = defineProps<{ sourceId: string; query: Query }>()

const addColumn = () => {
	if (!props.query.columns) props.query.columns = []
	props.query.columns.push({
		key: RuleKey.Value,
		keyOrder: props.query.columns.length,
	})
}

const deleteColumn = (i: number) =>
	(props.query.columns = props.query.columns?.filter((_, index) => index !== i))

const changeColumns = () => {
	if (props.query.table && props.query.columns && props.query.columns.length) {
		const allKeys = getAllKeys(props.query.table)
		props.query.columns = props.query.columns.filter(c => {
			if (c.tableKey) {
				return allKeys.includes(getKey(c.tableKey))
			}
			return true
		})
	}
}
</script>

<template>
	<form @submit.prevent>
		<table-form
			:source-id="sourceId"
			v-model="query.table"
			@change-columns="changeColumns"
		/>
		<app-block
			header="Столбцы"
			v-if="query.table"
		>
			<div class="flex flex-col gap-3">
				<column-field
					:source-id="sourceId"
					v-for="(_, i) in query.columns"
					:root="query.table"
					v-model="(<QColumn[]>query.columns)[i]"
					@delete="deleteColumn(i)"
				/>
				<app-button
					label="Добавить столбец"
					icon="pi pi-plus"
					outlined
					size="small"
					@click="addColumn"
				/>
			</div>
		</app-block>
	</form>
</template>
