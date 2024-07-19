<script lang="ts" setup>
import { Widget } from "@/components/widget/types"
import { computed } from "vue"
import {
	getNames,
	invalidate,
	syncQuery,
} from "@/components/widget/widgetEditor/query/utils"
import { useMutation } from "@tanstack/vue-query"
import {
	QTable,
	Query,
	Row,
} from "@/components/widget/widgetEditor/query/types"
import { api } from "@/api/query"

const props = defineProps<{ widget: Widget; data?: Row }>()

const id = computed<any>(() => {
	return props.data?.$root_id
})

const query = syncQuery(() => <Query>props.widget.query)

const { mutate } = useMutation({
	mutationFn: async (query: Query) => {
		if (query.where?.length && id.value) {
			query.where[0].value = id.value
			await api.execute(query)
		}
	},
	onSuccess() {
		invalidate(getNames(<QTable>query.value.table))
	},
})
</script>

<template>
	<i
		class="pi pi-trash cursor-pointer"
		@click="mutate(query)"
	/>
</template>
