<script lang="ts" setup>
import { AppCheckbox } from "@/ui"
import { FieldProps, Widget, WidgetType } from "@/components/widget/types"
import { computed } from "vue"
import {
	MetaKey,
	PayloadKey,
	QColumn,
	QTable,
	Query,
	QueryType,
} from "@/components/widget/widgetEditor/query/types"
import { getType } from "@/components/widget/utils"
import DataForm from "@/components/widget/widgetEditor/query/dataForm/DataForm.vue"
import ColumnDropdown from "@/components/widget/widgetEditor/query/dataForm/columnDropdown/ColumnDropdown.vue"
import { cloneDeep } from "lodash"
import { Nullable } from "primevue/ts-helpers"

const props = defineProps<{ column: QColumn }>()

const model = defineModel<Widget<FieldProps>>({ required: true })

const checked = computed<boolean>(
	() => model.value.type === WidgetType.Dropdown,
)

const setChecked = (event: boolean) => {
	model.value = {
		...model.value,
		type: event ? WidgetType.Dropdown : getType(props.column),
		query: event
			? {
					type: QueryType.Select,
				}
			: undefined,
	}
}

const setQuery = (query: Query) => (model.value = { ...model.value, query })

const getComputed = (metaKey: MetaKey): any => {
	return {
		set(value: QColumn) {
			const clone = cloneDeep(model.value)

			if (!clone.query) return

			if (!clone.query.columns) {
				clone.query.columns = [value]
			} else {
				const index = clone.query.columns.findIndex(
					column => column.payload?.[PayloadKey.MetaKey] === metaKey,
				)

				if (index !== -1) {
					clone.query.columns[index] = value
				} else {
					clone.query.columns.push(value)
				}
			}

			model.value = clone
		},

		get(): QColumn | undefined {
			return model.value.query?.columns?.find(
				column => column.payload?.[PayloadKey.MetaKey] === metaKey,
			)
		},
	}
}

const value = computed<Nullable<QColumn>>(getComputed(MetaKey.Value))

const label = computed<Nullable<QColumn>>(getComputed(MetaKey.Label))
</script>

<template>
	<form
		@submit.prevent
		class="flex flex-col gap-3"
	>
		<label class="flex items-center gap-3">
			<app-checkbox
				binary
				:model-value="checked"
				@update:model-value="setChecked"
			/>
			<span class="lowercase font-semibold text-xs select-none"
				>Использовать список</span
			>
		</label>
		<template v-if="checked">
			<data-form
				:model-value="<Query>model.query"
				@update:model-value="setQuery"
				small
			>
				<div class="flex flex-col gap-3">
					<column-dropdown
						placeholder="Значение"
						v-model="value"
						:root="<QTable>(<Query>model.query).table"
						:meta-key="MetaKey.Value"
					/>
					<column-dropdown
						placeholder="Этикетка"
						v-model="label"
						:root="<QTable>(<Query>model.query).table"
						:meta-key="MetaKey.Label"
					/>
				</div>
			</data-form>
		</template>
	</form>
</template>
