<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { Source } from "../../types/source"
import { AppInputText, AppInputNumber, AppDropdown, AppButton } from "../../ui"
import { cloneDeep } from "lodash"
import { useQuery } from "@tanstack/vue-query"
import { api } from "../../api/source"
import { QueryKey } from "../../enums/queryKey"

const props = defineProps<{ init?: Source }>()

const emit = defineEmits(["cancel", "submit"])

const source = ref<Partial<Source>>({})

onMounted(() => {
	if (props.init) source.value = cloneDeep(props.init)
})

const { data: drivers, isLoading } = useQuery({
	queryKey: [QueryKey.Drivers],
	queryFn: api.getDrivers,
})
</script>

<template>
	<form
		@submit.prevent
		class="flex flex-col py-2"
	>
		<slot />
		<div class="grid grid-cols-2 gap-6">
			<app-input-text
				class="col-span-2"
				placeholder="Имя соединения"
				v-model="source.name"
			/>
			<app-input-text
				placeholder="Хост"
				v-model="source.host"
			/>
			<app-input-number
				placeholder="Порт"
				v-model="source.port"
			/>
			<app-input-text
				placeholder="Имя пользователя"
				v-model="source.username"
			/>
			<app-input-text
				placeholder="Пароль"
				v-model="source.password"
			/>
			<app-input-text
				placeholder="Имя базы данных"
				v-model="source.databaseName"
			/>
			<app-dropdown
				placeholder="Драйвер"
				v-model="source.driver"
				:options="drivers"
				:loading="isLoading"
			/>
			<app-button
				label="Сохранить"
				@click="emit('submit', source)"
			/>
			<app-button
				label="Отменить"
				severity="secondary"
				@click="emit('cancel')"
			/>
		</div>
	</form>
</template>
