<script lang="ts" setup>
import { AppBlock, AppInputNumber, AppMessage } from "../../../ui"
import { Nullable } from "primevue/ts-helpers"

defineProps<{ modelValue: Nullable<number> }>()

const emit = defineEmits<{ "update:model-value": [number] }>()
</script>

<template>
	<app-block header="Пагинация">
		<div class="flex flex-col gap-3">
			<app-message severity="info">по умолчанию без ограничений</app-message>
			<app-input-number
				placeholder="На странице"
				suffix=" строк"
				:model-value="modelValue || null"
				@update:model-value="emit('update:model-value', $event)"
			/>
		</div>
	</app-block>
</template>
