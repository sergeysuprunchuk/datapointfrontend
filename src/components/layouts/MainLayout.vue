<script lang="ts" setup>
import HeaderMenu from "../headerMenu/HeaderMenu.vue"
</script>

<template>
	<div class="h-screen w-screen overflow-hidden">
		<header
			class="flex justify-center border-b border-surface-300 py-4 px-6 bg-surface-0"
		>
			<header-menu />
		</header>
		<div class="h-full w-full overflow-auto">
			<slot />
		</div>
	</div>
</template>
