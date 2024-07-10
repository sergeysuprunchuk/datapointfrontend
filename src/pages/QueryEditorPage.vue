<script lang="ts" setup>
import MainLayout from "../components/layouts/MainLayout.vue"
import { useRoute } from "vue-router"
import { computed } from "vue"
import QueryEditor from "../components/queryEditor/QueryEditor.vue"

const route = useRoute()

const id = computed<string>(() =>
	typeof route.params.id === "string" ? route.params.id : "",
)
</script>

<template>
	<main-layout>
		<query-editor :source-id="id" />
	</main-layout>
</template>
