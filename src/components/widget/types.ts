import { Query } from "./widgetEditor/query/types"

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
	DeleteButton = "deletebutton",
}

export interface Widget<T = any> {
	id?: string
	name?: string

	type: WidgetType
	query?: Query
	children?: Widget[]
	props?: T
}

export interface FieldProps {
	name: string
	placeholder?: string
}

export interface FormProps {
	useButton?: boolean
}

export enum ContextKey {
	Get = "get",
	Set = "set",
}
