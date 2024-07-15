<script lang="ts" setup>
import { AppOptionsButton, AppOrganizationChart } from "../../../../../../ui"
import { QTable, RType } from "../../../types"
import { OrganizationChartNode } from "primevue/organizationchart"
import { find, getKey, keysEqual, newIncrement } from "../../../utils"
import { computed } from "vue"
import { Table } from "../../../../../../types/source"
import { DtKey } from "../../../../../../enums/dtKey"
import { cloneDeep } from "lodash"
import TableOptions from "./TableOptions.vue"

const model = defineModel<QTable>({ required: true })

interface NodeData {
	current: QTable
	parent?: QTable
}

interface Node extends OrganizationChartNode {
	data: NodeData
}

const value = computed<Node>(() => buildTree(model.value))

const buildTree = (current: QTable, parent?: QTable): Node => {
	const node: Node = {
		key: getKey(current),
		children: [],
		data: { current, parent },
	}

	current.next?.forEach(next => node.children?.push(buildTree(next, current)))

	return node
}

const classes = ["bg-primary", "text-primary-inverse"]

const drop = (event: any, node: Node) => {
	dragleave(event)

	const table: Table = JSON.parse(event.dataTransfer.getData(DtKey.Table))

	const { current } = node.data

	const clone = cloneDeep(model.value)

	const currentQt = find(clone, current)

	if (currentQt) {
		currentQt.next = [
			...(currentQt.next ?? []),
			{
				name: table.name,
				increment: newIncrement(clone, table.name),
				rawColumns: table.columns,
				rule: { type: RType.Join, conditions: [] },
			},
		]
	}

	model.value = clone
}

const dragover = (event: any) => event.target.classList.add(...classes)

const dragleave = (event: any) => event.target.classList.remove(...classes)
</script>

<template>
	<app-organization-chart
		:value="value"
		:pt="{ node: 'inline-block' }"
	>
		<template #default="{ node }: { node: Node }">
			<div class="relative">
				<app-options-button
					v-if="!keysEqual(model, node.data.current)"
					class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pi-cog"
				>
					<table-options
						v-model="model"
						:current="node.data.current"
						:parent="<QTable>node.data.parent"
					/>
				</app-options-button>
				<div
					class="p-4 border primary-border rounded-md select-none"
					@drop="drop($event, node)"
					@dragover.prevent="dragover"
					@dragleave.prevent="dragleave"
				>
					{{ node.key }}
				</div>
			</div>
		</template>
	</app-organization-chart>
</template>
