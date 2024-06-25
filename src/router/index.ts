import { createRouter, createWebHistory, RouterView } from "vue-router"

export enum RouteName {
	Sources = "sources",
	Dashboards = "dashboards",
	Editor = "editor",
}

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/:pathMatch(.*)*",
			redirect: "/sources",
		},
		{
			path: "/dashboards",
			component: RouterView,
			children: [
				{
					path: "",
					name: RouteName.Dashboards,
					component: () => import("../pages/DashboardsPage.vue"),
				},
				{
					path: "editor",
					name: RouteName.Editor,
					component: () => import("../pages/EditorPage.vue"),
				},
			],
		},
		{
			path: "/sources",
			name: RouteName.Sources,
			component: () => import("../pages/SourcesPage.vue"),
		},
	],
})
