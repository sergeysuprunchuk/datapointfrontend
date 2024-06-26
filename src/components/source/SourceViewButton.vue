<script lang="ts" setup>
import { RouteName } from "../../router"

defineProps<{ id: string }>()
</script>

<template>
	<router-link :to="{ name: RouteName.Source, params: { id } }">
		<i class="pi pi-table" />
	</router-link>
</template>
