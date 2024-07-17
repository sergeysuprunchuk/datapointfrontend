<script lang="ts" setup>
import { Nullable } from "primevue/ts-helpers"
import { QTable } from "../../types"
import { useQuery } from "@tanstack/vue-query"
import { QueryKey } from "@/enums/queryKey"
import { api } from "@/api/source"
import { AppDropdown, AppButton, AppCustomDialog } from "@/ui"
import { Table } from "@/types/source"
import { ref } from "vue"
import JoinsEditor from "./joinsEditor/JoinsEditor.vue"

const props = defineProps<{ sourceId: string; full?: boolean }>()

const model = defineModel<Nullable<QTable>>({ required: true })

const { data, isLoading } = useQuery({
	queryKey: [QueryKey.Tables, props.sourceId],
	queryFn: () => api.getTables(props.sourceId),
})

const setTable = ({ name, columns: rawColumns }: Table) => {
	model.value = { name, increment: 0, rawColumns }
}

const visible = ref<boolean>(false)
</script>

<template>
	<div class="flex items-center gap-3">
		<app-dropdown
			class="w-full truncate"
			:loading="isLoading"
			:options="data"
			placeholder="Таблица"
			:model-value="model"
			@update:model-value="setTable"
			option-label="name"
			data-key="name"
		/>
		<app-button
			v-if="full"
			size="small"
			icon="pi pi-sitemap"
			outlined
			class="shrink-0"
			:disabled="!model"
			@click="visible = true"
		/>
		<app-custom-dialog
			v-model:visible="visible"
			header=""
			class="w-screen max-w-7xl h-full"
		>
			<joins-editor
				:tables="<Table[]>data"
				v-model="<QTable>model"
			/>
		</app-custom-dialog>
	</div>
</template>
