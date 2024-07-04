<script lang="ts" setup>
import { AppBlock, AppButton, AppDropdown, AppCustomDialog } from "../../../ui"
import { useQuery } from "@tanstack/vue-query"
import { QueryKey } from "../../../enums/queryKey"
import { api } from "../../../api/source"
import { QTable } from "../../../types/query"
import { Table } from "../../../types/source"
import { Nullable } from "primevue/ts-helpers"
import { ref } from "vue"
import TableList from "./TableList.vue"
import TableTree from "./TableTree.vue"

const props = defineProps<{ sourceId: string; modelValue: Nullable<QTable> }>()

const emit = defineEmits(["update:model-value", "change-columns"])

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
	emit("change-columns")
}

const visible = ref<boolean>(false)
</script>

<template>
	<app-block header="Таблицы">
		<div class="flex items-center gap-3">
			<app-dropdown
				class="w-full"
				:options="data"
				:loading="isLoading"
				placeholder="Таблица"
				option-label="name"
				data-key="name"
				:model-value="modelValue"
				@update:model-value="update"
			/>
			<app-button
				class="shrink-0"
				icon="pi pi-link"
				outlined
				size="small"
				:disabled="!modelValue"
				v-tooltip="'Объединить таблицы'"
				@click="visible = true"
			/>
		</div>
	</app-block>
	<app-custom-dialog
		v-model:visible="visible"
		header="Настройки связи"
		class="w-screen max-w-7xl h-full"
	>
		<div class="flex w-full h-full">
			<aside class="w-96 shrink-0 border-r primary-border">
				<table-list :options="<Table[]>data" />
			</aside>
			<div class="w-full h-full p-4">
				<table-tree
					:root="<QTable>modelValue"
					@change-columns="emit('change-columns')"
				/>
			</div>
		</div>
	</app-custom-dialog>
</template>
