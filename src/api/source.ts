import { request } from "./request"
import { Source, Table } from "../types/source"

export const api = {
	getAll: async (): Promise<Source[]> => {
		return (await request.get("/sources")).data
	},

	getOne: async (id: string): Promise<Source> => {
		return (await request.get(`/sources/${id}`)).data
	},

	edit: async (source: Source): Promise<void> => {
		return (await request.patch("/sources", source)).data
	},

	delete: async (id: string): Promise<void> => {
		return (await request.delete(`/sources/${id}`)).data
	},

	create: async (source: Source): Promise<string> => {
		return (await request.post("/sources", source)).data
	},

	getDrivers: async (): Promise<string[]> => {
		return (await request.get("/sources/drivers")).data
	},

	getTables: async (id: string): Promise<Table[]> => {
		return (await request.get(`/sources/${id}/tables`)).data
	},

	getFunctions: async (id: string): Promise<string[]> => {
		return (await request.get(`/sources/${id}/functions`)).data
	},
}
