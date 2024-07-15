import { Query } from "../query/types"

export enum WidgetType {
	Table = "table",
	Form = "form",
	Scatter = "scatter",
	Pie = "pie",
	Line = "line",
	Bar = "bar",
	InputNumber = "inputnumber",
	InputText = "inputtext",
	Dropdown = "dropdown",
	Checkbox = "checkbox",
}

export interface Widget<T = any> {
	type: WidgetType
	query?: Query
	children?: Widget[]
	props?: T
}

export interface FieldProps {
	name: string
	placeholder?: string
}

export enum ContextKey {
	Get = "get",
	Set = "set",
}
