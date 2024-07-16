import { Column, ColumnType } from "@/types/source"
import { ContextKey, FieldProps, Widget, WidgetType } from "./types"
import { computed, inject } from "vue"

export const newField = (column: Column): Widget<FieldProps> => {
	const types = {
		[ColumnType.Number]: WidgetType.InputNumber,
		[ColumnType.String]: WidgetType.InputText,
		[ColumnType.Boolean]: WidgetType.Checkbox,
		[ColumnType.Unsupported]: WidgetType.InputNumber,
	}

	return {
		type: types[column.type] ?? WidgetType.InputText,
		props: { name: column.name, placeholder: column.name },
	}
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
