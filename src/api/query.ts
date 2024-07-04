import { Query, QueryResponse } from "../types/query"
import { request } from "./request"

export const api = {
	execute: async (query: Query): Promise<QueryResponse> => {
		const json = JSON.stringify(query, (key, value) => {
			if (key === "rawColumns" || key === "parent") return
			return value
		})
		return (
			await request.post(`/queries/execute`, json, {
				headers: {
					"Content-Type": "application/json",
				},
			})
		).data
	},
}
