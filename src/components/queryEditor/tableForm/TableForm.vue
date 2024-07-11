<script lang="ts" setup>
import { AppBlock, AppButton, AppDropdown, AppCustomDialog } from "../../../ui"
import { useQuery } from "@tanstack/vue-query"
import { QueryKey } from "../../../enums/queryKey"
import { api } from "../../../api/source"
import { Nullable } from "primevue/ts-helpers"
import { QTable, QTableKey, Rule } from "../types"
import { Table } from "../../../types/source"
import { ref } from "vue"
import TableList from "./TableList.vue"
import TableTree from "./TableTree.vue"
import { cloneDeep } from "lodash"
import { find } from "../utils"

const props = defineProps<{ sourceId: string; modelValue: Nullable<QTable> }>()

const emit = defineEmits<{ "update:model-value": [QTable] }>()

const { data, isLoading } = useQuery({
	queryKey: [QueryKey.Tables, props.sourceId],
	queryFn: () => api.getTables(props.sourceId),
})

const update = (table: Table) => {
	emit("update:model-value", {
		name: table.name,
		increment: 0,
		rawColumns: table.columns,
	})
}

const visible = ref<boolean>(false)

const drop = (target: QTableKey, newQt: QTable[]) => {
	if (!props.modelValue) return

	const newValue: QTable = cloneDeep(props.modelValue)

	const qt = find(newValue, target)

	if (qt) qt.next = newQt

	emit("update:model-value", newValue)
}

const setRule = (target: QTableKey, rule: Rule) => {
	if (!props.modelValue) return

	const newValue: QTable = cloneDeep(props.modelValue)

	const qt = find(newValue, target)

	if (qt) qt.rule = rule

	emit("update:model-value", newValue)
}
</script>

<template>
	<app-block header="Таблицы">
		<div class="flex items-center gap-3">
			<app-dropdown
				class="w-full truncate"
				:loading="isLoading"
				:options="data"
				option-label="name"
				data-key="name"
				:model-value="modelValue"
				@update:model-value="update"
				placeholder="Таблица"
			/>
			<app-button
				size="small"
				outlined
				icon="pi pi-share-alt"
				class="shrink-0"
				:disabled="!modelValue"
				@click="visible = true"
			/>
			<app-custom-dialog
				v-model:visible="visible"
				header="Настройка таблиц"
				class="w-screen max-w-7xl h-full"
			>
				<div class="w-full h-full flex">
					<aside class="common-sidebar w-96">
						<table-list :options="<Table[]>data" />
					</aside>
					<div class="w-full h-full p-4">
						<table-tree
							:root="<QTable>modelValue"
							@drop="drop"
							@set-rule="setRule"
						/>
					</div>
				</div>
			</app-custom-dialog>
		</div>
	</app-block>
</template>
