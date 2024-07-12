import { request } from "./request"
import { QResponse, Query } from "../components/queryEditor/types"

export const api = {
	execute: async (query: Query): Promise<QResponse<unknown>> => {
		const json = JSON.stringify(query, (key, value) => {
			if (key === "rawColumns" || key === "rawColumn") return
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
