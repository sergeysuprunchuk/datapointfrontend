import { request } from "./request"
import { Widget } from "@/components/widget/types"

export const api = {
	getAll: async (): Promise<Widget[]> => {
		return (await request.get("/widgets")).data
	},

	getOne: async (id: string): Promise<Widget> => {
		return (await request.get(`/widgets/${id}`)).data
	},

	edit: async (widget: Widget): Promise<void> => {
		return (await request.patch("/widgets", widget)).data
	},

	delete: async (id: string): Promise<void> => {
		return (await request.delete(`/widgets/${id}`)).data
	},

	create: async (widget: Widget): Promise<string> => {
		return (await request.post("/widgets", widget)).data
	},
}
