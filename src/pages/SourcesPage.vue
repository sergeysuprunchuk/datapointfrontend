<script lang="ts" setup>
import MainLayout from "../components/layouts/MainLayout.vue"
import SourceTable from "../components/source/SourceTable.vue"
import SourceCreateForm from "../components/source/SourceCreateForm.vue"
</script>

<template>
	<main-layout>
		<div class="py-4 px-6 flex flex-col gap-4">
			<header class="flex justify-end">
				<source-create-form />
			</header>
			<source-table />
		</div>
	</main-layout>
</template>
