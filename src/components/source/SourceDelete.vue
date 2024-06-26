<script lang="ts" setup>
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { api } from "../../api/source"
import { QueryKey } from "../../enums/queryKey"

defineProps<{ id: string }>()

const queryClient = useQueryClient()

const { mutate } = useMutation({
	mutationFn: (id: string) => api.delete(id),
	onSuccess: () => {
		queryClient.invalidateQueries({ queryKey: [QueryKey.Sources] })
	},
})
</script>

<template>
	<i
		class="pi pi-trash cursor-pointer"
		@click="mutate(id)"
	/>
</template>
