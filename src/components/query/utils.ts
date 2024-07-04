import { QTable, QTableKey } from "../../types/query"

export const getKey = (tableKey: QTableKey): string => {
	return tableKey.increment !== 0
		? `${tableKey.name} (${tableKey.increment})`
		: tableKey.name
}

export const getAllKeys = (root: QTable): string[] => {
	const result: string[] = []

	const tables: QTable[] = [root]

	for (const t of tables) {
		result.push(getKey(t))

		if (t.next) tables.push(...t.next)
	}

	return result
}
