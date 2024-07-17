import { Column, ColumnType } from "@/types/source"
import { ContextKey, FieldProps, Widget, WidgetType } from "./types"
import { computed, inject } from "vue"

export const getType = (column: Column) => {
	return (
		{
			[ColumnType.Number]: WidgetType.InputNumber,
			[ColumnType.String]: WidgetType.InputText,
			[ColumnType.Boolean]: WidgetType.Checkbox,
			[ColumnType.Unsupported]: WidgetType.InputNumber,
		}[column.type] ?? WidgetType.InputText
	)
}

export const newField = (column: Column): Widget<FieldProps> => {
	return {
		type: getType(column),
		props: { name: column.name, placeholder: column.name },
	}
}

export const getField = (fields: Widget<FieldProps>[], name: string) => {
	return <Widget<FieldProps>>fields.find(field => field.props?.name === name)
}

export const useField = (widget: Widget<FieldProps>) => {
	const get = inject<(name: string) => any>(ContextKey.Get, () => {})

	const set = inject<(name: string, value: any) => void>(
		ContextKey.Set,
		() => {},
	)

	const name = computed<string>(() => widget.props?.name ?? "")

	const value = computed<any>(() => get(name.value))

	const setValue = (value: any) => set(name.value, value)

	return { value, setValue, name }
}
