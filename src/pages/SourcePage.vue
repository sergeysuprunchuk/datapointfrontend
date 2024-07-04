<script lang="ts" setup>
import MainLayout from "../components/layouts/MainLayout.vue"
import { useRoute } from "vue-router"
import { computed, ref } from "vue"
import QueryForm from "../components/query/QueryForm.vue"
import { Query } from "../types/query"
import WidgetTable from "../components/widget/WidgetTable.vue"
import { Widget } from "../types/widget"

const route = useRoute()

const id = computed<string>(() =>
	typeof route.params.id === "string" ? route.params.id : "",
)

const query = ref<Query>({ sourceId: id.value })

const widget = computed<Widget>(() => {
	return {
		query: query.value,
	}
})
</script>

<template>
	<main-layout>
		<div class="flex w-full h-full">
			<aside
				class="w-96 shrink-0 h-full primary-background primary-border border-r"
			>
				<query-form
					:source-id="id"
					:query="query"
				/>
			</aside>
			<div class="w-full h-full py-4 px-6 overflow-auto">
				<widget-table :widget="widget" />
			</div>
		</div>
	</main-layout>
</template>
