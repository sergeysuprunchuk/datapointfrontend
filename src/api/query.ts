import { request } from "./request"
import { Query, QResponse } from "../components/widgetEditor/query/types"

export const api = {
	execute: async <T = any>(query: Query): Promise<QResponse<T>> => {
		const json = JSON.stringify(query, (key, value) => {
			if (key === "rawColumns") return
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
