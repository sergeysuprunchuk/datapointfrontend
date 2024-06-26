<script lang="ts" setup>
import { AppDialog, AppMessage } from "../../ui"
import { computed, ref, watch } from "vue"
import SourceForm from "./SourceForm.vue"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { api } from "../../api/source"
import { Source } from "../../types/source"
import { QueryKey } from "../../enums/queryKey"
import { error as errorUtils } from "../../utils/error"

defineProps<{ init: Source }>()

const visible = ref<boolean>(false)

const queryClient = useQueryClient()

const { mutate, isError, error, reset } = useMutation({
	mutationFn: (source: Source) => api.edit(source),
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
	<i
		class="pi pi-pen-to-square cursor-pointer"
		@click="visible = true"
	/>
	<app-dialog
		modal
		header="Изменить соединение"
		v-model:visible="visible"
		block-scroll
		:style="{ width: '35rem' }"
		:draggable="false"
	>
		<source-form
			:init="init"
			@cancel="visible = false"
			@submit="mutate($event)"
		>
			<app-message severity="warn"
				>Меняйте параметры подключения на свой страх и риск, виджеты построенные
				поверх этого подключения перестанут работать, если схема нового
				подключения будет отличаться от старой</app-message
			>
			<app-message
				v-if="isError"
				severity="error"
				>{{ errorMessage }}</app-message
			>
		</source-form>
	</app-dialog>
</template>
