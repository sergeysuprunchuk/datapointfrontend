<script lang="ts" setup>
import { AppBlock, AppButton } from "../../../ui"
import { DragColumn, PayloadKey, QColumn } from "../types"
import { DtKey } from "../../../enums/dtKey"
import { Nullable } from "primevue/ts-helpers"
import ColumnOptions from "./ColumnOptions.vue"
import { getKey } from "../utils.ts"

const props = defineProps<{
	header: string
	metaKey?: string
	modelValue: Nullable<QColumn[]>
}>()

const emit = defineEmits<{ "update:model-value": [QColumn[]] }>()

const classes = ["ring", "ring-primary/50"]

const drop = (event: any) => {
	event.target.classList.remove(...classes)

	const { table, column }: DragColumn = JSON.parse(
		event.dataTransfer.getData(DtKey.Column),
	)

	const qColumn: QColumn = {
		tableKey: { name: table.name, increment: table.increment },
		name: column.name,
	}

	if (props.metaKey) qColumn.payload = { [PayloadKey.MetaKey]: props.metaKey }

	if (props.modelValue)
		emit("update:model-value", [...props.modelValue, qColumn])
	else emit("update:model-value", [qColumn])
}

const dragover = (event: any) => event.target.classList.add(...classes)

const dragleave = (event: any) => event.target.classList.remove(...classes)

const update = (qColumn: QColumn, newQColumn: QColumn) => {
	return [qColumn, newQColumn]
}

const deleteColumn = (qColumn: QColumn) => {
	if (props.modelValue)
		emit(
			"update:model-value",
			props.modelValue.filter(value => value !== qColumn),
		)
}
</script>

<template>
	<app-block :header="header">
		<div
			class="rounded-md border primary-border flex flex-col gap-1 p-2 pb-10 transition-all"
			@drop="drop"
			@dragover.prevent="dragover"
			@dragleave.prevent="dragleave"
		>
			<span
				class="text-primary-inverse bg-primary rounded-md py-1 px-3 text-sm flex select-none"
				v-for="column in modelValue"
				@dragover.stop
			>
				<span class="w-full truncate"
					>{{ getKey(column.tableKey) }}.{{ column.name }}</span
				>
				<column-options
					:model-value="column"
					@update:model-value="update(column, $event)"
				>
					<app-button
						severity="danger"
						outlined
						label="Удалить столбец"
						icon="pi pi-trash"
						size="small"
						@click="deleteColumn(column)"
					/>
				</column-options>
			</span>
		</div>
	</app-block>
</template>
