<script lang="ts" setup>
import { AppSelectButton } from "../../../../ui"
import { widgetTypes } from "./data"
import { Widget, WidgetType } from "../types"
import { Query, QueryType } from "../../query/types"

const model = defineModel<Widget>({ required: true })

const setType = (type: WidgetType) => {
	let query: Query | undefined

	//в будущем появятся виджеты без запроса и будет условие.
	query = {
		type: type === WidgetType.Form ? QueryType.Insert : QueryType.Select,
	}

	model.value = { type, query }
}
</script>

<template>
	<app-select-button
		:options="widgetTypes"
		:model-value="model.type"
		option-value="type"
		:allow-empty="false"
		@update:model-value="setType"
	>
		<template #option="{ option }">
			<i :class="option.icon" />
		</template>
	</app-select-button>
</template>
