<script lang="ts" setup>
import { AppButton, AppOrganizationChart } from "../../../ui"
import { computed } from "vue"
import { OrganizationChartNode } from "primevue/organizationchart"
import { QTable } from "../../../types/query"
import { getKey } from "../utils"
import { Table } from "../../../types/source"
import { DtKey } from "../../../enums/dtKey"
import { SqlJoin } from "../../../enums/sqlJoin"
import RuleForm from "./RuleForm.vue"

const props = defineProps<{ root: QTable }>()

const emit = defineEmits(["change-columns"])

const value = computed<OrganizationChartNode>(() => build(props.root))

const build = (qt: QTable): OrganizationChartNode => {
	const node: OrganizationChartNode = {
		key: getKey(qt),
		children: [],
		data: qt,
	}

	qt.next?.forEach(qt => node.children?.push(build(qt)))

	return node
}

const getIncrement = (name: string): number => {
	let i: number = -1
	const array: QTable[] = [props.root]
	for (const j of array) {
		if (j.name === name && i < j.increment) {
			i = j.increment
		}

		if (j.next) {
			array.push(...j.next)
		}
	}
	return i
}

const drop = (event: any, node: OrganizationChartNode) => {
	event.target.classList.remove("bg-primary")

	if (event.dataTransfer) {
		const table: Table = JSON.parse(event.dataTransfer.getData(DtKey.Table))

		const qTable: QTable = node.data

		if (!qTable.next) qTable.next = []
		qTable.next.push({
			name: table.name,
			increment: getIncrement(table.name) + 1,
			rawColumns: table.columns,
			parent: qTable,
			rule: {
				type: SqlJoin.Join,
				conditions: [],
			},
		})
	}
}

const dragover = (event: any) => event.target.classList.add("bg-primary")

const dragleave = (event: any) => event.target.classList.remove("bg-primary")

const deleteConnection = (table: QTable) => {
	if (table.parent && table.parent.next) {
		table.parent.next = table.parent.next.filter(
			t => getKey(table) !== getKey(t),
		)
		emit("change-columns")
	}
}
</script>

<template>
	<app-organization-chart
		:value="value"
		:pt="{ node: 'relative inline-block border primary-border' }"
	>
		<template #default="{ node }: { node: OrganizationChartNode }">
			<div>
				<rule-form
					v-if="getKey(root) !== getKey(node.data)"
					:table="node.data"
				>
					<app-button
						icon="pi pi-trash"
						size="small"
						outlined
						severity="danger"
						label="Удалить соединение"
						@click="deleteConnection(node.data)"
					/>
				</rule-form>
				<div
					class="p-4"
					@drop="drop($event, node)"
					@dragleave.prevent="dragleave"
					@dragover.prevent="dragover"
				>
					{{ node.key }}
				</div>
			</div>
		</template>
	</app-organization-chart>
</template>
