<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query"
import { QueryKey } from "@/enums/queryKey"
import { api } from "@/api/widget"
import { typeIcon } from "@/components/widget/typeForm/data"
import { AppInputText } from "@/ui"
import { Widget } from "@/components/widget/types"
import { computed, ref } from "vue"

const selected = defineModel<Widget | undefined>()

const { data } = useQuery({
	queryKey: [QueryKey.Widgets],
	queryFn: api.getAll,
})

const search = ref("")

const filtered = computed<Widget[] | undefined>(() => {
	return data.value?.filter(item => {
		return item.name?.toLowerCase().includes(search.value.toLowerCase())
	})
})
</script>

<template>
	<ul>
		<li class="card h-16">
			<app-input-text
				class="w-full"
				placeholder="Поиск"
				v-model="search"
			/>

			<slot name="header" />
		</li>
		<li
			v-for="widget in filtered"
			class="card h-12 cursor-pointer"
			:class="
				selected?.id === widget.id
					? 'bg-primary text-primary-inverse'
					: 'hover:bg-primary/20'
			"
			@click="selected = widget"
		>
			<i
				class="text-primary"
				:class="[
					typeIcon[widget.type],
					selected?.id === widget.id ? 'text-primary-inverse' : null,
				]"
			/>

			<span class="w-full truncate">{{ widget.name }}</span>

			<slot :widget="widget" />
		</li>
	</ul>
</template>

<style scoped>
.card {
	@apply primary-border
	border-b
	px-6
	flex
	items-center
	gap-3
	select-none
	transition-colors
	duration-100;
}
</style>
