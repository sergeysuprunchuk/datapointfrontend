<script lang="ts" setup>
import MainLayout from "../components/layouts/MainLayout.vue"
import { AppButton } from "@/ui"
import { RouteName } from "@/router"
import WidgetList from "@/components/widget/widgetList/WidgetList.vue"
import { ref } from "vue"
import { Widget } from "@/components/widget/types"
import GeneralWidget from "@/components/widget/generalWidget/GeneralWidget.vue"
import WidgetDelete from "@/components/widget/widgetList/WidgetDelete.vue"

const selected = ref<Widget>()
</script>

<template>
	<main-layout>
		<div class="h-full">
			<div class="h-full w-full flex">
				<aside class="common-sidebar w-96">
					<widget-list v-model="selected">
						<template #header>
							<router-link :to="{ name: RouteName.WidgetEditor }">
								<app-button
									icon="pi pi-plus"
									size="small"
									outlined
								/>
							</router-link>
						</template>
						<template #default="{ widget }: { widget: Widget }">
							<span class="flex gap-1 text-xs">
								<widget-delete
									:id="<string>widget.id"
									@click.stop
								/>
							</span>
						</template>
					</widget-list>
				</aside>
				<div class="w-full h-full p-6 flex items-start justify-center">
					<general-widget
						v-if="selected"
						:widget="selected"
						:key="selected.id"
					/>
					<div
						v-else
						class="flex justify-center"
					>
						<h2 class="uppercase">Выберите виджет слева для просмотра</h2>
					</div>
				</div>
			</div>
		</div>
	</main-layout>
</template>
