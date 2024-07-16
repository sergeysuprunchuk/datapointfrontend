<script lang="ts" setup>
import { AppBlock } from "@/ui"
import { Table } from "@/types/source"
import { DtKey } from "@/enums/dtKey"

defineProps<{ tables: Table[] }>()

const dragstart = (event: any, table: Table) => {
	event.dataTransfer.setData(DtKey.Table, JSON.stringify(table))
}
</script>

<template>
	<app-block header="Таблицы">
		<div
			v-for="table in tables"
			class="py-1 px-3 cursor-grab hover:text-primary-inverse hover:bg-primary items-center rounded-md"
			:draggable="true"
			@dragstart="dragstart($event, table)"
		>
			{{ table.name }}
		</div>
	</app-block>
</template>
