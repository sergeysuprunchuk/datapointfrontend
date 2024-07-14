export interface Source {
	id: string
	name: string
	connected: boolean
	host: string
	port: number
	username: string
	password: string
	databaseName: string
	driver: string
}

export enum ColumnType {
	Number = "number",
	String = "string",
	Boolean = "boolean",
	Unsupported = "unsupported",
}

export interface Column {
	name: string
	type: ColumnType
	required: boolean
	isPKey: boolean
}

export interface Table {
	name: string
	columns: Column[]
}
