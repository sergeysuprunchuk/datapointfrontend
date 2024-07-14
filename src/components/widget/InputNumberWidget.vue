<script lang="ts" setup>
import { AppInputNumber } from "../../ui"
import { Widget } from "./types"

defineProps<{ widget: Widget; modelValue: number }>()

const emit = defineEmits<{ "update:model-value": [number] }>()
</script>

<template>
	<app-input-number
		:model-value="modelValue"
		@update:model-value="emit('update:model-value', $event)"
		v-bind="widget.props"
	/>
</template>
