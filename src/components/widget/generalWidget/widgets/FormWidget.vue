<script lang="ts" setup>
import { AppButton } from "@/ui"
import GeneralWidget from "../GeneralWidget.vue"
import { ContextKey, Widget } from "../../types.ts"
import { syncQuery } from "../../widgetEditor/query/utils.ts"
import { Query } from "../../widgetEditor/query/types.ts"
import { provide } from "vue"
import { useMutation } from "@tanstack/vue-query"
import { api } from "@/api/query.ts"

const props = defineProps<{ widget: Widget }>()

const query = syncQuery(() => <Query>props.widget.query)

provide(ContextKey.Get, (name: string): any => {
	const column = query.value.columns?.find(column => column.name === name)

	if (column) return column.value
})

provide(ContextKey.Set, (name: string, value: any) => {
	query.value.columns = query.value.columns?.map(column =>
		column.name === name ? { ...column, value } : column,
	)
})

const { mutate } = useMutation({
	mutationFn: (query: Query) => api.execute(query),
	onSuccess() {
		query.value.columns = query.value.columns?.map(column => ({
			...column,
			value: undefined,
		}))
	},
})
</script>

<template>
	<form
		@submit.prevent
		class="flex flex-col gap-3 primary-background rounded-md p-6 max-w-fit"
	>
		<general-widget
			v-for="child in widget.children"
			:widget="child"
		/>
		<footer class="grid grid-cols-2 gap-3">
			<app-button
				label="Сохранить"
				@click="mutate(query)"
			/>
			<app-button
				label="Отменить"
				severity="secondary"
			/>
		</footer>
	</form>
</template>
