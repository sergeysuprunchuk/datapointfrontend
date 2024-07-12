<script lang="ts" setup>
import { MetaKey, PayloadKey, QColumn, Query } from "../types"
import { AppDropdown } from "../../../ui"
import { useQuery } from "@tanstack/vue-query"
import { QueryKey } from "../../../enums/queryKey"
import { api } from "../../../api/source"
import ColumnGroup from "../columnGroup/ColumnGroup.vue"
import PaginationForm from "../paginationForm/PaginationForm.vue"

const props = defineProps<{ sourceId: string; modelValue: Query }>()

const emit = defineEmits<{ "update:model-value": [Query] }>()

const { data: functions, isLoading } = useQuery({
	queryKey: [QueryKey.Functions, props.sourceId],
	queryFn: () => api.getFunctions(props.sourceId),
})

const updateOrderType = (i: number, type: string) => {
	emit("update:model-value", {
		...props.modelValue,
		orderBy: props.modelValue.orderBy?.map((value, index) => {
			return index === i
				? {
						...value,
						payload: { ...(value.payload ?? {}), [PayloadKey.Order]: type },
					}
				: value
		}),
	})
}

const orderType = (i: number) =>
	props.modelValue.orderBy?.[i]?.payload?.[PayloadKey.Order]

const columnType = (i: number): string =>
	props.modelValue.columns?.[i].rawColumn.type ?? ""

const columnFunc = (i: number): string | undefined =>
	props.modelValue.columns?.[i]?.func

const updateColumnFunc = (i: number, func: string) => {
	emit("update:model-value", {
		...props.modelValue,
		columns: props.modelValue.columns?.map((value, index) => {
			return index === i ? { ...value, func } : value
		}),
	})
}

const updateColumns = (columns: QColumn[]) => {
	emit("update:model-value", { ...props.modelValue, columns, offset: 0 })
}

const updateOrderBy = (orderBy: QColumn[]) => {
	emit("update:model-value", { ...props.modelValue, orderBy })
}

const updateLimit = (limit: number) => {
	emit("update:model-value", { ...props.modelValue, limit, offset: 0 })
}
</script>

<template>
	<div class="w-full h-full">
		<column-group
			color="lime"
			header="Столбцы таблицы"
			:model-value="modelValue.columns"
			@update:model-value="updateColumns"
			:meta-key="MetaKey.Value"
		>
			<template
				#default="{ i }"
				v-if="functions"
			>
				<app-dropdown
					placeholder="Функция"
					:loading="isLoading"
					:options="functions[columnType(i)]"
					:model-value="columnFunc(i)"
					@update:modelValue="updateColumnFunc(i, $event)"
				/>
			</template>
		</column-group>
		<column-group
			color="amber"
			header="Сортировать по"
			:model-value="modelValue.orderBy"
			@update:model-value="updateOrderBy"
		>
			<template #default="{ i }">
				<app-dropdown
					placeholder="Сортировать по"
					:options="['ASC', 'DESC']"
					:model-value="orderType(i)"
					@update:model-value="updateOrderType(i, $event)"
				/>
			</template>
		</column-group>
		<pagination-form
			:model-value="modelValue.limit"
			@update:model-value="updateLimit"
		/>
	</div>
</template>
