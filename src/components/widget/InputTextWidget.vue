<script lang="ts" setup>
import { AppInputText } from "../../ui"
import { Widget } from "./types"

defineProps<{ widget: Widget; modelValue: string }>()

const emit = defineEmits<{ "update:model-value": [string] }>()
</script>

<template>
	<app-input-text
		:model-value="modelValue"
		@update:model-value="emit('update:model-value', <string>$event)"
		v-bind="widget.props"
	/>
</template>
