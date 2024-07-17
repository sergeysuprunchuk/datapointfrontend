<script lang="ts" setup>
import { AppDropdown } from "@/ui"
import { useQuery } from "@tanstack/vue-query"
import { QueryKey } from "@/enums/queryKey"
import { api } from "@/api/source"

const model = defineModel<string | undefined>({ required: true })

const { data, isLoading } = useQuery({
	queryKey: [QueryKey.Sources],
	queryFn: api.getAll,
})
</script>

<template>
	<app-dropdown
		class="w-full"
		placeholder="Источник"
		v-model="model"
		:loading="isLoading"
		:options="data"
		option-label="name"
		option-value="id"
		data-key="id"
	/>
</template>
