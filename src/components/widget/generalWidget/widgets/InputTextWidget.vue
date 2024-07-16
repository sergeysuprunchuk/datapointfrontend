<script lang="ts" setup>
import { AppInputText } from "@/ui"
import { FieldProps, Widget } from "../../types.ts"
import { useField } from "../../utils.ts"

const props = defineProps<{ widget: Widget<FieldProps> }>()

const { value, setValue } = useField(props.widget)
</script>

<template>
	<app-input-text
		v-bind="widget.props"
		:model-value="value"
		@update:model-value="setValue"
	/>
</template>
