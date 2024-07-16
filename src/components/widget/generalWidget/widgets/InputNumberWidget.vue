<script lang="ts" setup>
import { FieldProps, Widget } from "../../types.ts"
import { AppInputNumber } from "@/ui"
import { useField } from "../../utils.ts"

const props = defineProps<{ widget: Widget<FieldProps> }>()

const { value, setValue } = useField(props.widget)
</script>

<template>
	<app-input-number
		v-bind="widget.props"
		:model-value="value"
		@update:model-value="setValue"
	/>
</template>
