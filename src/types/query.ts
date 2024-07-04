import { Column } from "./source"
import { SqlJoin } from "../enums/sqlJoin"

export interface Query {
	sourceId: string
	table?: QTable
	columns?: QColumn[]
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
	parent?: QTable
}

export interface QColumn {
	name?: string
	fun?: string
	key: string
	keyOrder: number
	tableKey?: QTableKey
}

export interface Rule {
	type: SqlJoin
	conditions: Condition[]
}

export interface Condition {
	left?: string
	right?: string
	operator: string
}

export interface QueryResponse {
	rules: { [key: string]: string[] }
	data: { [key: string]: any }[]
	rawSql: string
}
