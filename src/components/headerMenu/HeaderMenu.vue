<script lang="ts" setup>
import { RouteName } from "../../router"
</script>

<template>
	<ul class="flex gap-x-6 items-center">
		<router-link
			class="router-link"
			:to="{ name: RouteName.Sources }"
			>Источники</router-link
		>
		<router-link
			class="router-link"
			:to="{ name: RouteName.Dashboards }"
			>Дашборды</router-link
		>
	</ul>
</template>

<style scoped>
.router-link {
	@apply uppercase
  font-medium;
}

.router-link-active {
	@apply text-primary
  underline
  underline-offset-4;
}
</style>
