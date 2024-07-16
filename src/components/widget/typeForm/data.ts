import { WidgetType } from "../types"
import { entries } from "lodash"

export const typeIcon: { [key in WidgetType]?: string } = {
	[WidgetType.Table]: "pi pi-table",
	[WidgetType.Form]: "pi pi-file-edit",
	[WidgetType.Scatter]: "pi pi-chart-scatter",
	[WidgetType.Pie]: "pi pi-chart-pie",
	[WidgetType.Line]: "pi pi-chart-line",
	[WidgetType.Bar]: "pi pi-chart-bar",
}

export const widgetTypes: {
	type: WidgetType
	icon: string
}[] = entries(typeIcon).map(value => ({
	type: <WidgetType>value[0],
	icon: value[1],
}))
