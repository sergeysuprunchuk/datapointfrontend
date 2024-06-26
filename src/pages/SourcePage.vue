<script lang="ts" setup>
import MainLayout from "../components/layouts/MainLayout.vue"
import { useRoute } from "vue-router"
import { computed } from "vue"

const route = useRoute()

const id = computed<string>(() =>
	typeof route.params.id === "string" ? route.params.id : "",
)
</script>

<template>
	<main-layout>
		<div class="py-4 px-6 flex flex-col gap-4">{{ id }}</div>
	</main-layout>
</template>
