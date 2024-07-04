<script lang="ts" setup>
import { AppDialog } from ".."

defineProps<{ visible: boolean; header: string }>()

const emit = defineEmits(["update:visible"])
</script>

<template>
	<app-dialog
		:visible="visible"
		@update:visible="emit('update:visible', $event)"
		:draggable="false"
		modal
		block-scroll
	>
		<template #container>
			<div class="flex flex-col h-full">
				<header
					class="border-b primary-border p-6 flex items-center justify-between"
				>
					<h2 class="font-semibold text-xl">{{ header }}</h2>
					<i
						class="pi pi-times cursor-pointer"
						@click="emit('update:visible', false)"
					/>
				</header>
				<slot />
			</div>
		</template>
	</app-dialog>
</template>
