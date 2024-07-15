<script lang="ts" setup>
import TypeForm from "./widget/typeForm/TypeForm.vue"
import { ref } from "vue"
import { Widget, WidgetType } from "./widget/types"
import GeneralForm from "./widget/generalForm/GeneralForm.vue"
import GeneralWidget from "./widget/generalWidget/GeneralWidget.vue"
import { QueryType } from "./query/types"
import { AppButton } from "../../ui"

const widget = ref<Widget>({
	type: WidgetType.Table,
	query: { type: QueryType.Select },
})
</script>

<template>
	<div class="w-full h-full flex overflow-hidden">
		<general-form v-model="widget" />
		<div class="w-full">
			<header
				class="primary-background primary-border border-b py-4 px-6 flex items-center justify-between"
			>
				<type-form v-model="widget" />
				<div class="flex gap-3">
					<app-button label="Сохранить" />
					<app-button
						label="Отменить"
						severity="secondary"
					/>
				</div>
			</header>
			<div class="p-6 overflow-auto h-full">
				<general-widget :widget="widget" />
			</div>
		</div>
	</div>
</template>
