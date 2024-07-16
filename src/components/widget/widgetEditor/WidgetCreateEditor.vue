<script lang="ts" setup>
import WidgetEditor from "./WidgetEditor.vue"
import { useRouter } from "vue-router"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { api } from "@/api/widget"
import { QueryKey } from "@/enums/queryKey"
import { Widget } from "@/components/widget/types"
import { RouteName } from "@/router"

const router = useRouter()

const queryClient = useQueryClient()

const { mutate } = useMutation({
	mutationFn: (widget: Widget) => api.create(widget),
	onSuccess: () => {
		queryClient.invalidateQueries({ queryKey: [QueryKey.Widgets] })
		router.push({ name: RouteName.Widgets })
	},
})
</script>

<template>
	<widget-editor
		@cancel="router.back"
		@submit="mutate"
	/>
</template>
