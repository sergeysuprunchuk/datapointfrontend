<script lang="ts" setup>
import { AppBlock, AppInputNumber } from "@/ui"
import { Query } from "../types"

const model = defineModel<Query>({ required: true })

const update = (limit: number) => {
	model.value = { ...model.value, limit, offset: 0 }
}
</script>

<template>
	<app-block header="Пагинация">
		<div class="flex flex-col gap-3">
			<app-input-number
				placeholder="На странице"
				suffix=" строк"
				:model-value="model.limit"
				@update:model-value="update"
			/>
		</div>
	</app-block>
</template>
