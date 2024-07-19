<script lang="ts" setup>
import DataForm from "../../widgetEditor/query/dataForm/DataForm.vue"
import { FieldProps, Widget } from "../../types"
import { QColumn, Query } from "../../widgetEditor/query/types"
import ColumnGroup from "../../widgetEditor/query/columnGroup/ColumnGroup.vue"
import { cloneDeep } from "lodash"
import { getField, newField } from "../../utils"
import DropdownForm from "@/components/widget/generalForm/forms/DropdownForm.vue"
import { AppBlock, AppCheckbox } from "@/ui"
import { computed } from "vue"

const model = defineModel<Widget>({ required: true })

const setQuery = (query: Query) => (model.value = { ...model.value, query })

const addColumn = (column: QColumn) => {
	const clone = cloneDeep(model.value)

	if (clone.query)
		clone.query.columns = [...(clone.query.columns ?? []), column]

	clone.children = [...(clone.children ?? []), newField(column)]

	model.value = clone
}

const deleteColumn = (column: QColumn) => {
	const clone = cloneDeep(model.value)

	if (clone.query)
		clone.query.columns = clone.query.columns?.filter(
			c => column.name !== c.name,
		)

	clone.children = clone.children?.filter(
		child => (<FieldProps>child.props).name !== column.name,
	)

	model.value = clone
}

const setField = (field: Widget<FieldProps>) => {
	model.value = {
		...model.value,
		children: model.value.children?.map(child => {
			return (<Widget<FieldProps>>child).props?.name === field.props?.name
				? field
				: child
		}),
	}
}

const useButton = computed<boolean | undefined>(() => {
	return model.value.props?.useButton
})

const setUseButton = () => {
	model.value = {
		...model.value,
		props: { ...(model.value.props ?? {}), useButton: !useButton.value },
	}
}
</script>

<template>
	<div class="flex">
		<data-form
			:model-value="<Query>model.query"
			@update:model-value="setQuery"
		/>
		<aside
			v-if="model.query?.table"
			class="common-sidebar transition-all"
		>
			<column-group
				unique
				header="Поля формы"
				:model-value="(<Query>model.query).columns"
				@update:model-value="
					() => {
						/*не реагировать*/
					}
				"
				@add="addColumn"
				@delete="deleteColumn"
			>
				<template #default="{ column }">
					<dropdown-form
						:model-value="getField(<Widget[]>model.children, column.name)"
						@update:model-value="setField"
						:column="column"
					/>
				</template>
			</column-group>
			<app-block header="Использовать кнопку">
				<app-checkbox
					binary
					:model-value="useButton"
					@update:model-value="setUseButton"
				/>
			</app-block>
		</aside>
	</div>
</template>
