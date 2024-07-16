<script lang="ts" setup>
import { FieldProps, Widget } from "../../types.ts"
import { AppCheckbox } from "@/ui"
import { useField } from "../../utils.ts"

const props = defineProps<{ widget: Widget<FieldProps> }>()

const { value, setValue } = useField(props.widget)
</script>

<template>
	<label class="flex items-center gap-3">
		<app-checkbox
			v-bind="widget.props"
			:model-value="value"
			@update:model-value="setValue"
			binary
		/>
		<span class="text-sm">{{ widget.props?.placeholder }}</span>
	</label>
</template>
