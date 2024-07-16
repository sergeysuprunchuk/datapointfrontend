import { createRouter, createWebHistory, RouterView } from "vue-router"

export enum RouteName {
	Sources = "sources",
	Widgets = "widgets",
	WidgetEditor = "widgetEditor",
}

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/:pathMatch(.*)*",
			redirect: "/sources",
		},
		{
			path: "/widgets",
			component: RouterView,
			children: [
				{
					path: "",
					name: RouteName.Widgets,
					component: () => import("../pages/WidgetsPage.vue"),
				},
				{
					path: "editor",
					name: RouteName.WidgetEditor,
					component: () => import("../pages/WidgetCreateEditorPage.vue"),
				},
			],
		},
		{
			path: "/sources",
			children: [
				{
					path: "",
					name: RouteName.Sources,
					component: () => import("../pages/SourcesPage.vue"),
				},
			],
		},
	],
})
