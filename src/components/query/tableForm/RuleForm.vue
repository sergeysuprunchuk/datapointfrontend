<script lang="ts" setup>
import { Condition, QTable } from "../../../types/query"
import {
	AppButton,
	AppBlock,
	AppDropdown,
	AppOverlayPanel,
	AppSelectButton,
} from "../../../ui"
import { computed, ref } from "vue"
import { SqlJoin } from "../../../enums/sqlJoin"
import { SqlOperator } from "../../../enums/sqlOperator"
import { getKey } from "../utils.ts"

const props = defineProps<{ table: QTable }>()

const panel = ref<any>()

const toggle = (event: any) => panel.value.toggle(event)

const types: SqlJoin[] = [SqlJoin.Left, SqlJoin.Join, SqlJoin.Right]

const joinClass = (option: SqlJoin): string => {
	switch (option) {
		case SqlJoin.Join:
			return "icon-join_inner"
		case SqlJoin.Left:
			return "icon-join_left"
		case SqlJoin.Right:
			return "icon-join_right"
		default:
			return ""
	}
}

const operators: SqlOperator[] = [
	SqlOperator.Equal,
	SqlOperator.NotEqual,
	SqlOperator.Less,
	SqlOperator.Greater,
	SqlOperator.LessOrEqual,
	SqlOperator.GreaterOrEqual,
]

const addCondition = () =>
	props.table.rule?.conditions.push({
		operator: SqlOperator.Equal,
	})

const removeCondition = (cond: Condition) => {
	if (props.table.rule)
		props.table.rule.conditions = props.table.rule.conditions.filter(
			c => c !== cond,
		)
}

const parentColumns = computed(() => props.table.parent?.rawColumns)

const myColumns = computed(() => props.table.rawColumns)
</script>

<template>
	<div
		@click="toggle"
		class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-inverse rounded-full p-1 text-xs flex items-center justify-center cursor-pointer"
	>
		<i class="pi pi-link" />
		<app-overlay-panel ref="panel">
			<app-block
				header="Правила связи"
				class="w-screen max-w-xl"
			>
				<form
					@submit.prevent
					class="flex flex-col gap-3"
					v-if="table.rule"
				>
					<app-select-button
						class="self-center"
						:options="types"
						v-model="table.rule.type"
						:allow-empty="false"
					>
						<template #option="{ option }: { option: SqlJoin }">
							<i
								:class="joinClass(option)"
								class="text-sm"
							/>
						</template>
					</app-select-button>
					<div
						class="flex items-center gap-3"
						v-for="(_, i) in table.rule.conditions"
					>
						<app-dropdown
							class="w-48"
							:placeholder="getKey(<QTable>table.parent)"
							:options="parentColumns"
							option-label="name"
							option-value="name"
							v-model="table.rule.conditions[i].left"
						/>
						<app-dropdown
							class="w-20 min-w-20"
							:options="operators"
							v-model="table.rule.conditions[i].operator"
						/>
						<app-dropdown
							variant="outlined"
							class="w-48"
							:placeholder="getKey(table)"
							:options="myColumns"
							option-label="name"
							option-value="name"
							v-model="table.rule.conditions[i].right"
						/>
						<app-button
							class="shrink-0"
							icon="pi pi-trash"
							size="small"
							outlined
							severity="danger"
							@click="removeCondition(table.rule.conditions[i])"
						/>
					</div>
					<app-button
						label="Добавить условие"
						icon="pi pi-plus"
						outlined
						size="small"
						@click="addCondition"
					/>
					<slot />
				</form>
			</app-block>
		</app-overlay-panel>
	</div>
</template>
