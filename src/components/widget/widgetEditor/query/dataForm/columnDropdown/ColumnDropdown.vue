<script lang="ts" setup>
import { AppDropdown } from "@/ui"
import { Nullable } from "primevue/ts-helpers"
import { QColumn, QTable } from "@/components/widget/widgetEditor/query/types"
import { computed } from "vue"
import {
	getGroup,
	QColumnGroup,
} from "@/components/widget/widgetEditor/query/utils"

const props = defineProps<{
	root: QTable
	metaKey?: string
	placeholder?: string
}>()

const model = defineModel<Nullable<QColumn>>({ required: true })

const data = computed<QColumnGroup[]>(() => {
	return getGroup(props.root, props.metaKey)
})
</script>

<template>
	<app-dropdown
		class="w-full"
		:placeholder="placeholder"
		v-model="model"
		:options="data"
		option-group-label="label"
		option-group-children="items"
		option-label="name"
	/>
</template>
