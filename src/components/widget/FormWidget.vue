<script lang="ts" setup>
import { FieldProps, Widget } from "./types"
import CommonWidget from "./CommonWidget.vue"
import { AppButton } from "../../ui"
import { onMounted, ref, watch } from "vue"
import { QColumn, Query } from "../queryEditor/types"
import { cloneDeep } from "lodash"
import { useMutation } from "@tanstack/vue-query"
import { api } from "../../api/query"

const props = defineProps<{ widget: Widget }>()

const query = ref<Query>()

const copyQuery = () => (query.value = cloneDeep(props.widget.query))

onMounted(copyQuery)

watch(() => props.widget.query, copyQuery, { deep: true })

const getValue = (field: Widget<FieldProps>) => {
	if (!query.value) return

	const qColumn: QColumn | undefined = query.value.columns?.find(
		c => c.rawColumn.name === field.props?.name,
	)

	return qColumn ? qColumn.value : undefined
}

const setValue = (field: Widget<FieldProps>, value: any) => {
	if (!query.value) return

	const qColumn: QColumn | undefined = query.value.columns?.find(
		c => c.rawColumn.name === field.props?.name,
	)

	if (qColumn) qColumn.value = value
}

const { mutate, isPending } = useMutation({
	mutationFn: (query: Query) => api.execute(query),
})

const save = () => {
	if (query.value) mutate(query.value)
}
</script>

<template>
	<form
		@submit.prevent
		class="flex flex-col gap-3 primary-background primary-border rounded-lg py-6 px-4"
	>
		<common-widget
			v-for="w in widget.children"
			:widget="w"
			:model-value="getValue(w)"
			@update:model-value="setValue(w, $event)"
		/>
		<footer class="grid grid-cols-2 gap-3">
			<app-button
				label="Сохранить"
				@click="save"
				:disabled="isPending"
			/>
			<app-button
				label="Отменить"
				severity="secondary"
			/>
		</footer>
	</form>
</template>
