<script lang="ts" setup>
import { AppBlock, AppOptionsButton, AppButton } from "../../../../ui"
import { PayloadKey, QColumn } from "../types"
import { Nullable } from "primevue/ts-helpers"
import { getKey } from "../utils"
import { DtKey } from "../../../../enums/dtKey"

const props = defineProps<{ header: string; metaKey?: string }>()

const emit = defineEmits<{ add: [QColumn]; delete: [QColumn] }>()

const model = defineModel<Nullable<QColumn[]>>({ required: true })

const classes: string[] = ["ring", "ring-primary/75"]

const drop = (event: any) => {
	dragleave(event)

	let column: QColumn = JSON.parse(event.dataTransfer.getData(DtKey.Column))

	if (props.metaKey)
		column = { ...column, payload: { [PayloadKey.MetaKey]: props.metaKey } }

	model.value = [...(model.value ?? []), column]

	emit("add", column)
}

const dragover = (event: any) => event.target.classList.add(...classes)

const dragleave = (event: any) => event.target.classList.remove(...classes)

const deleteColumn = (column: QColumn) => {
	model.value = model.value?.filter(qc => qc !== column)

	emit("delete", column)
}
</script>

<template>
	<app-block :header="header">
		<div
			class="rounded-md border primary-border flex flex-col gap-1 p-2 pb-12 transition-all"
			@drop="drop"
			@dragover.prevent="dragover"
			@dragleave.prevent="dragleave"
		>
			<span
				class="text-primary-inverse bg-primary rounded-md py-1 px-3 text-sm select-none flex justify-between items-center"
				v-for="column in model"
				@drop.stop
				@dragover.stop
				@dragleave.stop
			>
				<span class="w-full truncate">
					{{ getKey(column.tableKey) }} {{ column.name }}
				</span>
				<app-options-button>
					<slot :column="column" />
					<app-button
						icon="pi pi-trash"
						size="small"
						outlined
						severity="danger"
						label="Удалить столбец"
						@click="deleteColumn(column)"
					/>
				</app-options-button>
			</span>
		</div>
	</app-block>
</template>
