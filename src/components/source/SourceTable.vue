<script lang="ts" setup>
import { AppDataTable, AppColumn } from "../../ui"
import { useQuery } from "@tanstack/vue-query"
import { QueryKey } from "../../enums/queryKey"
import { api } from "../../api/source"
import { Source } from "../../types/source"
import SourceDelete from "./SourceDelete.vue"
import SourceEditForm from "./SourceEditForm.vue"

const { data, isLoading } = useQuery({
	queryKey: [QueryKey.Sources],
	queryFn: api.getAll,
})
</script>

<template>
	<app-data-table
		:value="data"
		:loading="isLoading"
	>
		<app-column
			header="Имя соединения"
			field="name"
		/>
		<app-column
			header="Хост"
			field="host"
		/>
		<app-column
			header="Порт"
			field="port"
		/>
		<app-column
			header="Имя пользователя"
			field="username"
		/>
		<app-column
			header="Пароль"
			field="password"
		/>
		<app-column
			header="Имя базы данных"
			field="databaseName"
		/>
		<app-column
			header="Драйвер"
			field="driver"
		/>
		<app-column
			header="Статус соединения"
			field="connected"
		>
			<template #body="{ data }: { data: Source }">
				<div
					class="w-4 h-4 rounded-md"
					:class="data.connected ? 'bg-green-500' : 'bg-red-500'"
				/>
			</template>
		</app-column>
		<app-column header="Действия">
			<template #body="{ data }: { data: Source }">
				<div class="flex gap-2">
					<source-edit-form :init="data" />
					<source-delete :id="data.id" />
				</div>
			</template>
		</app-column>
	</app-data-table>
</template>
