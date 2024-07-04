<script lang="ts" setup>
defineProps<{ header: string }>()
</script>

<template>
	<div
		class="p-4 w-full flex flex-col gap-2 border-b last-of-type:border-0 primary-border"
	>
		<h2 class="font-medium uppercase text-center select-none">{{ header }}</h2>
		<div class="w-full h-full">
			<slot />
		</div>
	</div>
</template>
