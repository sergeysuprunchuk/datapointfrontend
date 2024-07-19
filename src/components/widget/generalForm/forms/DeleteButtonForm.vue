<script lang="ts" setup>
import { AppBlock, AppCheckbox } from "@/ui"
import { Widget, WidgetType } from "@/components/widget/types"
import { computed } from "vue"
import {
	QColumn,
	QueryType,
} from "@/components/widget/widgetEditor/query/types"

const model = defineModel<Widget>({ required: true })

const pKey = computed<QColumn | undefined>(() => {
	if (!model.value.query?.table?.rawColumns?.length) return

	const pKey = model.value.query.table.rawColumns.find(value => value.isPKey)

	if (!pKey) return

	return {
		...pKey,
		tableKey: {
			name: model.value.query.table.name,
			increment: model.value.query.table.increment,
		},
	}
})

const value = computed<boolean>(() => {
	return Boolean(
		model.value.children?.find(value => value.type === WidgetType.DeleteButton),
	)
})

const update = () => {
	if (!pKey.value) return

	if (value.value) {
		model.value = {
			...model.value,
			children: model.value.children?.filter(
				value => value.type !== WidgetType.DeleteButton,
			),
		}
		return
	}

	model.value = {
		...model.value,
		children: [
			...(model.value.children ?? []),
			{
				type: WidgetType.DeleteButton,
				query: {
					sourceId: model.value.query?.sourceId,
					table: model.value.query?.table,
					type: QueryType.Delete,
					where: [pKey.value],
				},
			},
		],
	}
}
</script>

<template>
	<app-block
		v-if="pKey"
		header="Использовать удаление"
	>
		<app-checkbox
			binary
			:model-value="value"
			@update:model-value="update"
		/>
	</app-block>
</template>
