<script lang="ts" setup>
import { AppDropdown } from "../../../../ui"
import { QColumn } from "../types"
import { useQuery } from "@tanstack/vue-query"
import { QueryKey } from "../../../../enums/queryKey"
import { api } from "../../../../api/source"
import { computed } from "vue"

const props = defineProps<{ sourceId: string }>()

const model = defineModel<QColumn>({ required: true })

const { data, isLoading } = useQuery({
	queryKey: [QueryKey.Functions, props.sourceId],
	queryFn: () => api.getFunctions(props.sourceId),
})

const options = computed<string[]>(() => {
	return data.value?.[model.value.type] ?? []
})

const setFunc = (func: string) => {
	model.value = { ...model.value, func }
}
</script>

<template>
	<app-dropdown
		placeholder="Функция"
		:model-value="model.func"
		@update:model-value="setFunc"
		:options="options"
		:loading="isLoading"
	/>
</template>
