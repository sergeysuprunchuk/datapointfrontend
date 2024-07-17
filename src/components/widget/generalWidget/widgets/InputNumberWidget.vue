<script lang="ts" setup>
import { FieldProps, Widget } from "../../types"
import { AppInputNumber } from "@/ui"
import { useField } from "../../utils"

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
