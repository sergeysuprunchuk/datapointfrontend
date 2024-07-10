<script lang="ts" setup>
import { AppBlock, AppButton, AppDropdown } from "../../../ui"
import { useQuery } from "@tanstack/vue-query"
import { QueryKey } from "../../../enums/queryKey"
import { api } from "../../../api/source"
import { Nullable } from "primevue/ts-helpers"
import { QTable } from "../types"
import { Table } from "../../../types/source"

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
				disabled
				class="shrink-0"
			/>
		</div>
	</app-block>
</template>
