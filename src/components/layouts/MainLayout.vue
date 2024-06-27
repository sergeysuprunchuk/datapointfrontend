<script lang="ts" setup>
import HeaderMenu from "../headerMenu/HeaderMenu.vue"
import ThemeSwitch from "../themeSwitch/ThemeSwitch.vue"
</script>

<template>
	<div class="h-screen w-screen overflow-hidden">
		<header
			class="flex items-center justify-between border-b primary-border py-4 px-6 primary-background"
		>
			<header-menu />
			<theme-switch />
		</header>
		<div class="h-full w-full overflow-auto">
			<slot />
		</div>
	</div>
</template>
