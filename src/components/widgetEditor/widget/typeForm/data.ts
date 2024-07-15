import { WidgetType } from "../types"

export const widgetTypes: {
	type: WidgetType
	icon: string
}[] = [
	{
		type: WidgetType.Table,
		icon: "pi pi-table",
	},
	{
		type: WidgetType.Form,
		icon: "pi pi-file-edit",
	},
	{
		type: WidgetType.Scatter,
		icon: "pi pi-chart-scatter",
	},
	{
		type: WidgetType.Pie,
		icon: "pi pi-chart-pie",
	},
	{
		type: WidgetType.Line,
		icon: "pi pi-chart-line",
	},
	{
		type: WidgetType.Bar,
		icon: "pi pi-chart-bar",
	},
]
