import { Query } from "../queryEditor/types"

export enum WidgetType {
	Table = "table",
	Form = "form",
	InputText = "inputtext",
	InputNumber = "inputnumber",
	Dropdown = "dropdown",
}

export interface Widget<T = any> {
	type: WidgetType
	props?: T
	query?: Query
	children?: Widget[]
}

export interface FieldProps {
	name: string
	placeholder: string
}
