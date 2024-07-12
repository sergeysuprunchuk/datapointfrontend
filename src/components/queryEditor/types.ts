import { Column } from "../../types/source"

export enum QueryType {
	Select = "select",
	Insert = "insert",
	Update = "update",
	Delete = "delete",
}

export interface Query {
	sourceId: string
	type: string
	table?: QTable
	columns?: QColumn[]
	where?: QColumn[]
	orderBy?: QColumn[]
	limit?: number
	offset?: number
}

export interface QTableKey {
	name: string
	increment: number
}

export interface QTable extends QTableKey {
	next?: QTable[]
	rule?: Rule

	//удалить перед отправкой.
	rawColumns: Column[]
}

export enum PayloadKey {
	MetaKey = "metaKey",
	Order = "order",
}

export enum MetaKey {
	Value = "value",
}

export interface QColumn {
	tableKey: QTableKey
	name: string
	payload?: { [key: string]: any }
	func?: string
	value?: any

	//на данный момент удаляю, в будущем может понадобиться на бэкенде.
	rawColumn: Column
}

export enum RType {
	Left = "left",
	Join = "join",
	Right = "right",
}

export interface Rule {
	type: RType
	conditions: Condition[]
}

export enum Operator {
	Equal = "=",
	NotEqual = "!=",
	Less = "<",
	Greater = ">",
	LessOrEqual = "<=",
	GreaterOrEqual = ">=",
}

export interface Condition {
	columns: [QColumn | undefined, QColumn | undefined]
	operator: Operator
}

export interface SQResponse {
	rules: { [key: string]: string[] }
	data: { [key: string]: any[] }
	total: number
}

export interface QResponse<T> {
	data: T
	err: string
	rawSql: string
}

export interface DragColumn {
	column: Column
	table: QTable
}
