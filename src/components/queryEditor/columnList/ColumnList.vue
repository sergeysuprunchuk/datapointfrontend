<script lang="ts" setup>
import { QTable } from "../types"
import { computed } from "vue"
import { AppBlock } from "../../../ui"
import { Column } from "../../../types/source"
import { DtKey } from "../../../enums/dtKey"
import { getKey } from "../utils.ts"

const props = defineProps<{ root: QTable }>()

const items = computed<QTable[]>(() => {
	const queue: QTable[] = [props.root]

	for (const item of queue) if (item.next) queue.push(...item.next)

	return queue
})

const dragstart = (event: any, table: QTable, column: Column) => {
	event.dataTransfer.setData(DtKey.Column, JSON.stringify({ column, table }))
}
</script>

<template>
	<app-block header="Столбцы">
		<ul class="select-none">
			<template v-for="item in items">
				<li class="font-medium text-lg mt-5">
					<span>{{ getKey(item) }}</span>
				</li>
				<li
					v-for="column in item.rawColumns"
					class="grid grid-cols-2"
				>
					<span
						class="cursor-grab hover:text-primary"
						:draggable="true"
						@dragstart="dragstart($event, item, column)"
						>{{ column.name }}</span
					>
					<span class="justify-self-end text-green-500 text-sm font-medium">{{
						column.type
					}}</span>
				</li>
			</template>
		</ul>
	</app-block>
</template>
