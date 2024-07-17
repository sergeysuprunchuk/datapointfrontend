<script lang="ts" setup>
import { FieldProps, Widget } from "../../types"
import { AppDropdown } from "@/ui"
import { useField } from "../../utils"
import {
	syncQuery,
	useQuery,
} from "@/components/widget/widgetEditor/query/utils"
import { MetaKey, Query } from "@/components/widget/widgetEditor/query/types"
import { computed } from "vue"

const props = defineProps<{ widget: Widget<FieldProps> }>()

const { value, setValue } = useField(props.widget)

const query = syncQuery(() => <Query>props.widget.query)

const { data, rules, isLoading } = useQuery(query)

const optionLabel = computed<string>(() => {
	let label: string = rules.value[MetaKey.Value]?.[0]

	if (rules.value[MetaKey.Label]?.[0]) label = rules.value[MetaKey.Label]?.[0]

	return label
})

const optionValue = computed<string>(() => rules.value[MetaKey.Value]?.[0])
</script>

<template>
	<app-dropdown
		v-bind="widget.props"
		:model-value="value"
		@update:model-value="setValue"
		:options="data"
		:loading="isLoading"
		:option-label="optionLabel"
		:option-value="optionValue"
		class="w-full truncate"
	/>
</template>
