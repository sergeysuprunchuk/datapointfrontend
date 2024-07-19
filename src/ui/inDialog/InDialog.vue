<script lang="ts" setup>
import { AppButton, AppCustomDialog } from "@/ui"

defineProps<{ use?: boolean }>()

const visible = defineModel<boolean>({ default: false })
</script>

<template>
	<template v-if="use">
		<app-button
			@click="visible = true"
			label="Кнопка"
			outlined
		/>
		<app-custom-dialog
			v-model:visible="visible"
			header="Заголовок"
			class="w-fit"
		>
			<slot />
		</app-custom-dialog>
	</template>
	<template v-else>
		<slot />
	</template>
</template>
