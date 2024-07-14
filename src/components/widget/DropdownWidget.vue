<script lang="ts" setup>
import { AppDropdown } from "../../ui"
import { Widget } from "./types"

defineProps<{ widget: Widget; modelValue: any }>()

const emit = defineEmits<{ "update:model-value": [any] }>()
</script>

<template>
	<app-dropdown
		:model-value="modelValue"
		@update:model-value="emit('update:model-value', $event)"
		v-bind="widget.props"
	/>
</template>
