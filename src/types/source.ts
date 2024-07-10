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

export interface Column {
	name: string
	type: string
	required: boolean
	isPKey: boolean
}

export interface Table {
	name: string
	columns: Column[]
}
