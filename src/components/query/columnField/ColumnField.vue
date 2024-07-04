<script lang="ts" setup>
import { AppButton, AppDropdown, AppOverlayPanel, AppBlock } from "../../../ui"
import { computed, ref } from "vue"
import { QColumn, QTable, QTableKey } from "../../../types/query"
import { getKey } from "../utils"
import { Column } from "../../../types/source"
import { useQuery } from "@tanstack/vue-query"
import { api } from "../../../api/source"
import { QueryKey } from "../../../enums/queryKey"

const props = defineProps<{
	sourceId: string
	root: QTable
	modelValue: QColumn
}>()

const emit = defineEmits(["update:model-value", "delete"])

interface Interface extends Column {
	tableKey: QTableKey
}

const options = computed(() => {
	const options: any[] = []
	const array: QTable[] = [props.root]
	for (const i of array) {
		options.push({
			label: getKey(i),
			items: [
				...i.rawColumns.map<Interface>(c => ({
					name: c.name,
					type: c.type,
					tableKey: i,
				})),
			],
		})

		if (i.next) array.push(...i.next)
	}

	return options
})

const update = (c: Interface) => {
	emit("update:model-value", {
		key: props.modelValue.key,
		keyOrder: props.modelValue.keyOrder,
		name: c.name,
		tableKey: c.tableKey,
		fun: props.modelValue.fun,
	})
}

const panel = ref<any>()

const toggle = (event: any) => panel.value.toggle(event)

const { data, isLoading } = useQuery({
	queryFn: () => api.getFunctions(props.sourceId),
	queryKey: [QueryKey.Functions, props.sourceId],
})
</script>

<template>
	<div class="flex items-center gap-3">
		<app-dropdown
			class="w-full"
			placeholder="Столбец"
			:options="options"
			option-label="name"
			option-group-label="label"
			option-group-children="items"
			:model-value="modelValue.name ? modelValue : null"
			@update:model-value="update"
			data-key="name"
		/>
		<app-button
			class="shrink-0"
			icon="pi pi-ellipsis-h"
			outlined
			size="small"
			@click="toggle"
			v-tooltip="'Опции'"
		/>
		<app-overlay-panel ref="panel">
			<app-block
				header="Опции"
				class="px-0 py-0 w-72"
			>
				<form
					@submit.prevent
					class="flex flex-col gap-3"
				>
					<app-dropdown
						placeholder="Функция"
						:options="data"
						:loading="isLoading"
						v-model="modelValue.fun"
					/>
					<app-button
						icon="pi pi-trash"
						size="small"
						outlined
						severity="danger"
						label="Удалить столбец"
						@click="emit('delete')"
					/>
				</form>
			</app-block>
		</app-overlay-panel>
	</div>
</template>
