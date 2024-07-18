import { Chart, FontSpec } from "chart.js"
import { Axis } from "@/components/widget/generalWidget/widgets/charts/types"
import { Palette } from "@/stores/appConfig.ts"
import { entries } from "lodash"

export const xyDefault = (style: CSSStyleDeclaration) => {
	return {
		parsing: useParsing(),
		scales: useScale(style),
	}
}

export const useFont = (style: CSSStyleDeclaration): Partial<FontSpec> => {
	const { fontFamily } = style

	return {
		...Chart.defaults.font,
		family: fontFamily,
		weight: "bold",
	}
}

export const useScale = (style: CSSStyleDeclaration) => {
	const { color } = style
	const opacityColor = `rgba(${color.slice(color.indexOf("(") + 1, color.length - 1)}, .25)`
	const font = useFont(style)

	const scale = {
		border: { color },
		grid: { color: opacityColor },
		ticks: { color, font },
	}

	return {
		x: scale,
		y: scale,
	}
}

export const useParsing = () => {
	return {
		xAxisKey: Axis.X,
		yAxisKey: Axis.Y,
	}
}

export const getColor = (
	palette: Palette,
	shade: number,
	index: number,
): string => {
	return (<any>palette)[shade - 100 * index]
}

export const getColors = (palette: Palette, shade: number): string[] => {
	return entries(palette)
		.filter(value => shade >= Number(value[0]))
		.sort((a, b) => (Number(a[0]) < Number(b[0]) ? 1 : 0))
		.map(value => value[1])
}
