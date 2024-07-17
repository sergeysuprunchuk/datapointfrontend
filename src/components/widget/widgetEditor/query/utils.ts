import {
	PayloadKey,
	QColumn,
	QTable,
	QTableKey,
	Query,
	SQResponse,
} from "./types"
import { computed, Ref, ref, watch } from "vue"
import { cloneDeep } from "lodash"
import { useQuery as stack } from "@tanstack/vue-query"
import { QueryKey } from "@/enums/queryKey"
import { api } from "@/api/query"

export const getKey = (key: QTableKey): string => {
	return key.increment === 0 ? key.name : `${key.name} (${key.increment})`
}

export const keysEqual = (key1: QTableKey, key2: QTableKey): boolean => {
	return key1.increment === key2.increment && key1.name === key2.name
}

export const getAllKeys = (root: QTable): QTableKey[] => {
	return toArray(root)
}

export const newIncrement = (root: QTable, name: string): number => {
	let increment: number = -1

	const array: QTable[] = [root]
	for (const table of array) {
		if (table.name === name && table.increment > increment)
			increment = table.increment

		if (table.next) array.push(...table.next)
	}

	return increment + 1
}

export const find = (root: QTable, key: QTableKey): QTable | undefined => {
	const array: QTable[] = [root]

	for (const table of array) {
		if (keysEqual(table, key)) return table

		if (table.next) array.push(...table.next)
	}

	return
}

export const deleteImpossible = (
	columns: QColumn[] | undefined,
	keys: QTableKey[],
): [QColumn[] | undefined, QColumn[]] => {
	if (!columns) return [undefined, []]

	const deleted: QColumn[] = []
	const newColumns: QColumn[] = []

	columns.forEach(c => {
		for (const key of keys) {
			if (keysEqual(c.tableKey, key)) {
				newColumns.push(c)
				return
			}
		}

		deleted.push(c)
	})

	return [newColumns, deleted]
}

export const toArray = (root: QTable): QTable[] => {
	const array: QTable[] = [root]

	for (const table of array) if (table.next) array.push(...table.next)

	return array
}

export const syncQuery = (trackable: () => Query) => {
	const query = ref<Query>(cloneDeep(trackable()))

	watch(trackable, value => (query.value = cloneDeep(value)), { deep: true })

	return query
}

export const canExecute = (query: Query | undefined): boolean => {
	if (!query?.table || !query.columns?.length) return false

	const array: QTable[] = query.table.next ?? []

	for (const table of array) {
		if (!table.rule?.conditions?.length) return false

		for (const c of table.rule.conditions) {
			if (!c.columns[0] || !c.columns[1]) return false
		}

		if (table.next) array.push(...table.next)
	}

	return true
}

export interface QColumnGroup {
	label: string
	items: QColumn[]
}

export const getGroup = (root: QTable, metaKey?: string): QColumnGroup[] => {
	const columns: QColumnGroup[] = []
	const array: QTable[] = [root]

	for (const table of array) {
		const items: QColumn[] = []

		table.rawColumns.forEach(column => {
			items.push({
				...column,
				tableKey: { name: table.name, increment: table.increment },
				payload: metaKey ? { [PayloadKey.MetaKey]: metaKey } : undefined,
			})
		})

		columns.push({ label: getKey(table), items })

		if (table.next) array.push(...table.next)
	}

	return columns
}

export const useQuery = (query: Ref<Query | undefined>) => {
	const { data: response, isLoading } = stack({
		queryKey: [QueryKey.Query, query],
		queryFn: () => api.execute<SQResponse>(<Query>query.value),
		enabled: () => canExecute(query.value),
	})

	const rules = computed(() => {
		return response.value?.data?.rules ?? {}
	})

	const data = computed(() => {
		return response.value?.data?.data ?? []
	})

	const total = computed<number>(() => response.value?.data?.total ?? 0)

	const limit = computed<number>(() => query.value?.limit ?? 0)

	const offset = computed<number>(() => query.value?.offset ?? 0)

	const page = computed<number>(() => {
		return limit.value && offset.value ? offset.value / limit.value : 0
	})

	const setPage = (offset: number) => {
		if (query.value) query.value.offset = offset
	}

	return { data, rules, isLoading, total, page, setPage, limit }
}
