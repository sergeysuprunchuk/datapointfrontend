<script lang="ts" setup>
import { AppButton, AppDialog, AppMessage } from "../../ui"
import { computed, ref, watch } from "vue"
import SourceForm from "./SourceForm.vue"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { api } from "../../api/source"
import { Source } from "../../types/source"
import { QueryKey } from "../../enums/queryKey"
import { error as errorUtils } from "../../utils/error"

const visible = ref<boolean>(false)

const queryClient = useQueryClient()

const { mutate, isError, error, reset } = useMutation({
	mutationFn: (source: Source) => api.create(source),
	onSuccess: () => {
		visible.value = false
		queryClient.invalidateQueries({ queryKey: [QueryKey.Sources] })
	},
})

const errorMessage = computed<string>(() =>
	errorUtils.errorMessage(error.value),
)

watch(visible, value => value && reset())
</script>

<template>
	<app-button
		@click="visible = true"
		label="Добавить соединение"
		icon="pi pi-plus"
		text
	/>
	<app-dialog
		modal
		header="Настройка соединения"
		v-model:visible="visible"
		block-scroll
		:style="{ width: '35rem' }"
		:draggable="false"
	>
		<source-form
			@cancel="visible = false"
			@submit="mutate($event)"
		>
			<app-message
				v-if="isError"
				severity="error"
				>{{ errorMessage }}</app-message
			>
		</source-form>
	</app-dialog>
</template>
