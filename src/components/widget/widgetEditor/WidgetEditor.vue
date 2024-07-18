<script lang="ts" setup>
import TypeForm from "@/components/widget/typeForm/TypeForm.vue"
import { ref } from "vue"
import { Widget, WidgetType } from "../types"
import GeneralForm from "@/components/widget/generalForm/GeneralForm.vue"
import GeneralWidget from "@/components/widget/generalWidget/GeneralWidget.vue"
import { QueryType } from "./query/types"
import { AppButton, AppInputText } from "@/ui"

const emit = defineEmits<{ submit: [Widget]; cancel: [] }>()

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
				<app-input-text
					placeholder="Имя виджета"
					v-model="widget.name"
				/>
				<type-form v-model="widget" />
				<div class="flex gap-3">
					<app-button
						label="Сохранить"
						@click="emit('submit', widget)"
					/>
					<app-button
						label="Отменить"
						severity="secondary"
						@click="emit('cancel')"
					/>
				</div>
			</header>
			<div class="p-6 overflow-auto h-full flex items-start justify-center">
				<general-widget :widget="widget" />
			</div>
		</div>
	</div>
</template>
