<script lang="ts" setup>
import { AppButton, AppInDialog } from "@/ui"
import GeneralWidget from "../GeneralWidget.vue"
import { ContextKey, FormProps, Widget } from "../../types"
import { getNames, invalidate, syncQuery } from "../../widgetEditor/query/utils"
import { QTable, Query } from "../../widgetEditor/query/types"
import { provide, ref } from "vue"
import { useMutation } from "@tanstack/vue-query"
import { api } from "@/api/query"

const props = defineProps<{ widget: Widget<FormProps> }>()

const visible = ref<boolean>(false)

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
		visible.value = false
		invalidate(getNames(<QTable>query.value.table))
	},
})
</script>

<template>
	<app-in-dialog
		:use="widget.props?.useButton"
		v-model="visible"
	>
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
	</app-in-dialog>
</template>
