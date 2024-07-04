<script lang="ts" setup>
import { AppBlock, AppMessage } from "../../../ui"
import { Table } from "../../../types/source"
import { DtKey } from "../../../enums/dtKey"

defineProps<{ options: Table[] }>()

const dragstart = (event: any, table: Table) =>
	event.dataTransfer.setData(DtKey.Table, JSON.stringify(table))
</script>

<template>
	<app-block header="Таблицы">
		<app-message severity="info">
			при перемещении таблицы на другую таблицу она будет присоединена к целевой
			таблице. укажите по каким полям их объединить и выберите тип подключения
		</app-message>
		<div
			v-for="table in options"
			:draggable="true"
			@dragstart="dragstart($event, table)"
			class="font-medium hover:text-primary cursor-grab select-none"
		>
			{{ table.name }}
		</div>
	</app-block>
</template>
