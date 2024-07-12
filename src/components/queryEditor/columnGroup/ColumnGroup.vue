<script lang="ts" setup>
import { AppBlock, AppButton } from "../../../ui"
import { DragColumn, PayloadKey, QColumn } from "../types"
import { DtKey } from "../../../enums/dtKey"
import { Nullable } from "primevue/ts-helpers"
import ColumnOptions from "./ColumnOptions.vue"
import { getKey } from "../utils.ts"
import { computed } from "vue"

type color =
	| "red"
	| "orange"
	| "amber"
	| "yellow"
	| "lime"
	| "green"
	| "emerald"
	| "teal"
	| "cyan"
	| "blue"
	| "indigo"
	| "violet"
	| "purple"
	| "fuchsia"
	| "pink"
	| "rose"
	| "primary"

const props = withDefaults(
	defineProps<{
		header: string
		metaKey?: string
		modelValue: Nullable<QColumn[]>
		color?: color
	}>(),
	{
		color: "primary",
	},
)

const getColor = computed<string>(() => {
	return {
		red: "bg-red-500",
		orange: "bg-orange-500",
		amber: "bg-amber-500",
		yellow: "bg-yellow-500",
		lime: "bg-lime-500",
		green: "bg-green-500",
		emerald: "bg-emerald-500",
		teal: "bg-teal-500",
		cyan: "bg-cyan-500",
		blue: "bg-blue-500",
		indigo: "bg-indigo-500",
		violet: "bg-violet-500",
		purple: "bg-purple-500",
		fuchsia: "bg-fuchsia-500",
		pink: "bg-pink-500",
		rose: "bg-rose-500",
		primary: "bg-primary",
	}[props.color]
})

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
		rawColumn: column,
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
				class="text-primary-inverse rounded-md py-1 px-3 text-sm flex select-none"
				v-for="(column, i) in modelValue"
				@dragover.stop
				:class="getColor"
			>
				<span class="w-full truncate"
					>{{ getKey(column.tableKey) }}.{{ column.name }}</span
				>
				<column-options
					:model-value="column"
					@update:model-value="update(column, $event)"
				>
					<slot :i="i" />
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
