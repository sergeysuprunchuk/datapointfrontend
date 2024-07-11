<script lang="ts" setup>
import { AppButton, AppOrganizationChart } from "../../../ui"
import { computed } from "vue"
import { OrganizationChartNode } from "primevue/organizationchart"
import { QTable, QTableKey, RType, Rule } from "../types"
import { getKey, newIncrement } from "../utils"
import { DtKey } from "../../../enums/dtKey"
import { Table } from "../../../types/source"
import RuleForm from "./RuleForm.vue"

const props = defineProps<{ root: QTable }>()

const emit = defineEmits<{
	"drop": [QTableKey, QTable[]]
	"set-rule": [QTableKey, Rule]
}>()

const value = computed<OrganizationChartNode>(() => buildTree(props.root))

const buildTree = (
	qt: QTable,
	parent: QTable | null = null,
): OrganizationChartNode => {
	const node: OrganizationChartNode = {
		key: getKey(qt),
		children: [],
		data: { self: qt, parent },
	}

	qt.next?.forEach(nextQt => node.children?.push(buildTree(nextQt, qt)))

	return node
}

const classes = ["bg-primary", "text-primary-inverse"]

const drop = (event: any, node: OrganizationChartNode) => {
	event.target.classList.remove(...classes)

	const table: Table = JSON.parse(event.dataTransfer.getData(DtKey.Table))

	const { self: target } = node.data

	const newQt: QTable = {
		name: table.name,
		increment: newIncrement(props.root, table.name),
		rawColumns: table.columns,
		rule: { type: RType.Join, conditions: [] },
	}

	if (!target.next) emit("drop", target, [newQt])
	else emit("drop", target, [...target.next, newQt])
}

const setRule = (node: OrganizationChartNode, rule: Rule) => {
	const { self: target } = node.data

	emit("set-rule", target, rule)
}

const dragover = (event: any) => event.target.classList.add(...classes)

const dragleave = (event: any) => event.target.classList.remove(...classes)

const deleteBranch = (node: OrganizationChartNode) => {
	const { self: target, parent } = node.data

	if (parent && parent.next)
		emit(
			"drop",
			parent,
			parent.next.filter((nextQt: QTable) => getKey(nextQt) !== getKey(target)),
		)
}
</script>

<template>
	<app-organization-chart
		:value="value"
		:pt="{ node: 'inline-block' }"
	>
		<template #default="{ node }: { node: OrganizationChartNode }">
			<div class="relative">
				<rule-form
					v-if="getKey(node.data.self) !== getKey(root)"
					:model-value="<Rule>(<QTable>node.data.self).rule"
					@update:model-value="setRule(node, $event)"
					:target="node.data.self"
					:parent="node.data.parent"
				>
					<app-button
						severity="danger"
						icon="pi pi-trash"
						label="Удалить ветку"
						size="small"
						outlined
						@click="deleteBranch(node)"
					/>
				</rule-form>
				<div
					class="p-4 border primary-border rounded-md select-none"
					@dragleave.prevent="dragleave"
					@dragover.prevent="dragover"
					@drop="drop($event, node)"
				>
					{{ node.key }}
				</div>
			</div>
		</template>
	</app-organization-chart>
</template>
