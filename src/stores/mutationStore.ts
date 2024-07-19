import { defineStore } from "pinia"

export type Handler = () => void

export const useMutationStore = defineStore("mutation_store", () => {
	const handlers: { [key: string]: Handler[] } = {}

	const subscribe = (handler: Handler, keys: string[]) => {
		keys.forEach(key => {
			if (!handlers[key]) handlers[key] = []

			handlers[key].push(handler)
		})
	}

	const unsubscribe = (handler: Handler, keys: string[]) => {
		keys.forEach(key => {
			handlers[key] = handlers[key].filter(h => h !== handler)
		})
	}

	const mutate = (keys: string[]) => {
		keys.forEach(key => {
			handlers[key]?.forEach(handler => handler())
		})
	}

	return {
		subscribe,
		unsubscribe,
		mutate,
	}
})
