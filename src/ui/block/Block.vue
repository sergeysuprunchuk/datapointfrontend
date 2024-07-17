<script lang="ts" setup>
defineProps<{ header: string; hidden?: boolean }>()
</script>

<template>
	<div
		v-if="!hidden"
		class="p-4 w-full flex flex-col gap-2 border-b last-of-type:border-0 primary-border"
	>
		<h2 class="font-medium uppercase text-center select-none">{{ header }}</h2>
		<div class="w-full h-full">
			<slot />
		</div>
	</div>
	<template v-else>
		<slot />
	</template>
</template>
