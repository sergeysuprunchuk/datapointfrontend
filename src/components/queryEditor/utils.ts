import { QTable, QTableKey } from "./types.ts"

export const getKey = (key: QTableKey): string => {
	return key.increment !== 0 ? `${key.name} (${key.increment})` : key.name
}

export const newIncrement = (root: QTable, name: string): number => {
	let increment: number = -1

	const array: QTable[] = [root]

	for (const qt of array) {
		if (qt.name === name && increment < qt.increment) increment = qt.increment
		if (qt.next) array.push(...qt.next)
	}

	return increment + 1
}

export const find = (root: QTable, key: QTableKey): QTable | undefined => {
	const array: QTable[] = [root]

	for (const qt of array) {
		if (getKey(qt) === getKey(key)) {
			return qt
		}

		if (qt.next) array.push(...qt.next)
	}
}

export const getAllKeys = (root: QTable): string[] => {
	const array: QTable[] = [root]

	const keys: string[] = []

	for (const qt of array) {
		keys.push(getKey(qt))

		if (qt.next) array.push(...qt.next)
	}

	return keys
}
