<script lang="ts" setup>
import { QTable } from "../../types"
import { AppBlock } from "../../../../../ui"
import { getKey, toArray } from "../../utils"
import { Column } from "../../../../../types/source"
import { DtKey } from "../../../../../enums/dtKey"

defineProps<{ root: QTable }>()

const dragstart = (event: any, table: QTable, column: Column) => {
	event.dataTransfer.setData(
		DtKey.Column,
		JSON.stringify({
			...column,
			tableKey: { name: table.name, increment: table.increment },
		}),
	)
}
</script>

<template>
	<app-block header="Столбцы">
		<ul class="select-none">
			<template v-for="option in toArray(root)">
				<li
					class="font-semibold text-surface-400 dark:text-surface-500 text-sm mt-4 first-of-type:mt-0"
				>
					<span>{{ getKey(option) }}</span>
				</li>
				<li
					v-for="column in option.rawColumns"
					class="py-1 grid grid-cols-2 cursor-grab group hover:bg-primary items-center rounded-md"
					:draggable="true"
					@dragstart="dragstart($event, option, column)"
				>
					<span class="group-hover:text-primary-inverse">{{
						column.name
					}}</span>
					<span
						class="justify-self-end text-primary/75 group-hover:text-primary-inverse/75 text-xs font-bold"
						>{{ column.type }}</span
					>
				</li>
			</template>
		</ul>
	</app-block>
</template>
