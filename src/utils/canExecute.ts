import { QColumn, QTable, Query } from "../types/query"

export const canExecute = (q: Query): boolean => {
	return columnsIsValid(q.columns) && tableIsValid(q.table)
}

export const columnsIsValid = (qcArr: QColumn[] | undefined): boolean =>
	!!qcArr &&
	!qcArr.reduce((accumulator, currentValue) => {
		if (accumulator) return true
		return !currentValue.name || currentValue.name.length === 0
	}, false)

const tableIsValid = (qt: QTable | undefined): boolean => {
	if (!qt || qt.name.length === 0) return false

	if (!qt.next) return true

	const next = [...qt.next]

	for (const i of next) {
		if (
			i.name.length === 0 ||
			!i.rule ||
			i.rule.conditions.reduce((accumulator, currentValue) => {
				if (accumulator) return true
				return !currentValue.left || !currentValue.right
			}, false)
		) {
			return false
		}

		if (i.next) next.push(...i.next)
	}

	return true
}
