<script lang="ts" setup>
import TableList from "./TableList.vue"
import { Table } from "@/types/source"
import { QTable } from "../../../types"
import TableTree from "./TableTree.vue"

defineProps<{ tables: Table[] }>()

const model = defineModel<QTable>({ required: true })
</script>

<template>
	<div class="w-full h-full flex">
		<aside class="common-sidebar">
			<table-list :tables="tables" />
		</aside>
		<div class="w-full h-full p-4">
			<table-tree v-model="model" />
		</div>
	</div>
</template>
