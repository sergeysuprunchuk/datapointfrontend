<script lang="ts" setup>
import { AppButton, AppDropdown, AppSelectButton } from "../../../../../../ui"
import { Condition, Operator, QTable, QTableKey, RType } from "../../../types"
import { cloneDeep, values } from "lodash"
import { computed } from "vue"
import { find, keysEqual } from "../../../utils"
import { Column } from "../../../../../../types/source"

const props = defineProps<{ current: QTable; parent: QTable }>()

const model = defineModel<QTable>({ required: true })

const operators = values(Operator)

const options = values(RType)

const icon = (option: string): string => {
	return (
		{
			[RType.Left]: "icon-join_left",
			[RType.Right]: "icon-join_right",
			[RType.Join]: "icon-join_inner",
		}[option] ?? ""
	)
}

const conditions = computed<Condition[]>(() => {
	return props.current.rule?.conditions ?? []
})

const ruleType = computed<string | undefined>(() => {
	return props.current.rule?.type
})

const set = (value: QTable, handler: (value: QTable) => void) => {
	const clone = cloneDeep(model.value)

	const newValue = find(clone, value)

	if (newValue) handler(newValue)

	model.value = clone
}

const setRuleType = (type: RType) => {
	set(props.current, value => {
		if (value.rule) {
			value.rule.type = type
		}
	})
}

const setOperator = (i: number, operator: Operator) => {
	set(props.current, value => {
		if (value.rule) {
			value.rule.conditions[i].operator = operator
		}
	})
}

const addCondition = () => {
	set(props.current, value => {
		if (value.rule)
			value.rule.conditions.push({
				operator: Operator.Equal,
				columns: [undefined, undefined],
			})
	})
}

const deleteCondition = (i: number) => {
	set(props.current, value => {
		if (value.rule) {
			value.rule.conditions = value.rule.conditions.filter(
				(_, index) => index !== i,
			)
		}
	})
}

const setColumn = (
	conditionIndex: number,
	columnIndex: number,
	column: Column,
	tableKey: QTableKey,
) => {
	set(props.current, value => {
		if (value.rule) {
			value.rule.conditions[conditionIndex].columns[columnIndex] = {
				...column,
				tableKey,
			}
		}
	})
}

const deleteTable = () => {
	set(props.parent, value => {
		value.next = value.next?.filter(next => !keysEqual(next, props.current))
	})
}
</script>

<template>
	<div class="flex flex-col gap-3">
		<app-select-button
			:options="options"
			:allow-empty="false"
			class="self-center"
			:model-value="ruleType"
			@update:model-value="setRuleType"
		>
			<template #option="{ option }">
				<i :class="icon(option)" />
			</template>
		</app-select-button>

		<div
			v-for="(condition, i) in conditions"
			class="flex items-center gap-3"
		>
			<app-dropdown
				class="w-48 truncate"
				:placeholder="parent.name"
				:options="parent.rawColumns"
				option-label="name"
				data-key="name"
				:model-value="condition.columns[0]"
				@update:model-value="setColumn(i, 0, $event, parent)"
			/>
			<app-dropdown
				:options="operators"
				class="w-20"
				:model-value="condition.operator"
				@update:model-value="setOperator(i, $event)"
			/>
			<app-dropdown
				class="w-48 truncate"
				:placeholder="current.name"
				:options="current.rawColumns"
				option-label="name"
				data-key="name"
				:model-value="condition.columns[1]"
				@update:model-value="setColumn(i, 1, $event, current)"
			/>
			<app-button
				class="shrink-0"
				outlined
				size="small"
				severity="danger"
				icon="pi pi-trash"
				@click="deleteCondition(i)"
			/>
		</div>

		<app-button
			outlined
			size="small"
			icon="pi pi-plus"
			label="Добавить условие"
			@click="addCondition"
		/>

		<app-button
			outlined
			size="small"
			severity="danger"
			icon="pi pi-trash"
			label="Удалить таблицу"
			@click="deleteTable"
		/>
	</div>
</template>
