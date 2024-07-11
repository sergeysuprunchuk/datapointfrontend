<script lang="ts" setup>
import {
	AppBlock,
	AppButton,
	AppOverlayPanel,
	AppDropdown,
	AppSelectButton,
} from "../../../ui"
import { computed, ref } from "vue"
import { Condition, Operator, QTable, QTableKey, RType, Rule } from "../types"
import { cloneDeep, values } from "lodash"
import { Column } from "../../../types/source"

const props = defineProps<{
	modelValue: Rule
	target: QTable
	parent: QTable
}>()

const emit = defineEmits<{ "update:model-value": [Rule] }>()

const panel = ref<any>()

const toggle = (event: any) => panel.value.toggle(event)

const addCondition = () => {
	const newValue = cloneDeep(props.modelValue)

	newValue.conditions.push({
		operator: Operator.Equal,
		columns: [undefined, undefined],
	})

	emit("update:model-value", newValue)
}

const updateCondition = (i: number, key: keyof Condition, value: any) => {
	const newValue = cloneDeep(props.modelValue)

	newValue.conditions = newValue.conditions.map((c, index) => {
		if (i === index) {
			c[key] = value
		}
		return c
	})

	emit("update:model-value", newValue)
}

const operators: string[] = values(Operator)

const joins: string[] = values(RType)

//опции целевой таблицы.
const leftOptions = computed<Column[]>(() => props.target.rawColumns)

//опции родительской таблицы.
const rightOptions = computed<Column[]>(() => props.parent?.rawColumns ?? [])

const updateColumn = (
	iCondition: number,
	iColumn: number,
	tableKey: QTableKey,
	column: Column,
) => {
	const newColumns = cloneDeep(props.modelValue.conditions[iCondition].columns)

	newColumns[iColumn] = { tableKey, name: column.name }

	updateCondition(iCondition, "columns", newColumns)
}

const deleteCondition = (i: number) => {
	const newValue = cloneDeep(props.modelValue)

	newValue.conditions = newValue.conditions.filter((_, index) => index !== i)

	emit("update:model-value", newValue)
}

const updateType = (type: RType) => {
	emit("update:model-value", { ...props.modelValue, type })
}

const rType = (type: RType) => {
	switch (type) {
		case RType.Join:
			return "icon-join_inner"
		case RType.Left:
			return "icon-join_left"
		case RType.Right:
			return "icon-join_right"
		default:
			return ""
	}
}
</script>

<template>
	<div
		@click="toggle"
		class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-surface-700 dark:text-surface-0 rounded-full p-1 text-xs flex items-center justify-center cursor-pointer"
	>
		<i class="pi pi-cog" />
		<app-overlay-panel ref="panel">
			<app-block
				header="Настройки"
				class="px-1 py-1"
			>
				<div class="flex flex-col gap-3 w-96">
					<app-select-button
						:options="joins"
						:model-value="modelValue.type"
						@update:model-value="updateType"
						:allow-empty="false"
						class="self-center"
					>
						<template #option="{ option }">
							<i :class="rType(option)" />
						</template>
					</app-select-button>
					<div
						v-for="(condition, i) in modelValue.conditions"
						class="flex items-center gap-3"
					>
						<app-dropdown
							class="w-48 truncate text-sm"
							:model-value="condition.columns[0]"
							:options="leftOptions"
							option-label="name"
							data-key="name"
							placeholder="Мои столбцы"
							@update:model-value="updateColumn(i, 0, target, $event)"
						/>
						<app-dropdown
							class="w-20 text-sm"
							:model-value="condition.operator"
							:options="operators"
							@update:model-value="updateCondition(i, 'operator', $event)"
						/>
						<app-dropdown
							class="w-48 truncate text-sm"
							:model-value="condition.columns[1]"
							:options="rightOptions"
							option-label="name"
							data-key="name"
							placeholder="Родительские столбцы"
							@update:model-value="updateColumn(i, 1, <QTable>parent, $event)"
						/>
						<app-button
							class="shrink-0"
							severity="danger"
							icon="pi pi-trash"
							size="small"
							outlined
							@click="deleteCondition(i)"
						/>
					</div>
					<app-button
						size="small"
						outlined
						icon="pi pi-plus"
						label="Добавить условие"
						@click="addCondition"
					/>
					<slot />
				</div>
			</app-block>
		</app-overlay-panel>
	</div>
</template>
