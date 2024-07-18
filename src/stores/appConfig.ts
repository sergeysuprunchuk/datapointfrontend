import { defineStore } from "pinia"
import { computed, onMounted, ref } from "vue"
import colors from "tailwindcss/colors"
import { entries } from "lodash"

const DEFAULT_PALETTE = "indigo"

export enum LocalStorage {
	Theme = "theme",
	Palette = "palette",
}

const palettes = {
	red: colors.red,
	orange: colors.orange,
	amber: colors.amber,
	yellow: colors.yellow,
	lime: colors.lime,
	green: colors.green,
	emerald: colors.emerald,
	teal: colors.teal,
	cyan: colors.cyan,
	sky: colors.sky,
	blue: colors.blue,
	indigo: colors.indigo,
	violet: colors.violet,
	purple: colors.purple,
	fuchsia: colors.fuchsia,
	pink: colors.pink,
	rose: colors.rose,
}

const hexToRgb = (hex: string): string => {
	const n = parseInt(hex, 16)
	return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`
}

export enum Theme {
	Dark = "dark",
	Light = "light",
}

export type PaletteKey = keyof typeof palettes

export type Palette = (typeof palettes)[PaletteKey]

export interface AppConfig {
	theme: string
	palette: Palette
}

export const useAppConfig = defineStore("app_config", () => {
	const element = document.documentElement

	const style = ref(getComputedStyle(element))

	const recalculateStyle = () => (style.value = getComputedStyle(element))

	const appConfig = ref<AppConfig>({
		theme: Theme.Light,
		palette: palettes.indigo,
	})

	const toggleTheme = () =>
		setTheme(appConfig.value.theme === Theme.Light ? Theme.Dark : Theme.Light)

	const setTheme = (theme: Theme) => {
		localStorage.setItem(LocalStorage.Theme, theme)
		appConfig.value.theme = theme
		theme === Theme.Dark
			? element.classList.add("dark")
			: element.classList.remove("dark")
		recalculateStyle()
	}

	const setPalette = (key: keyof typeof palettes) => {
		localStorage.setItem(LocalStorage.Palette, key)
		appConfig.value.palette = palettes[key]
		entries(appConfig.value.palette).forEach(value => {
			element.style.setProperty(
				`--primary-${value[0]}`,
				hexToRgb(String(value[1]).slice(1)),
			)
		})
		recalculateStyle()
	}

	onMounted(() => {
		let theme = localStorage.getItem(LocalStorage.Theme)
		if (theme !== Theme.Light && theme !== Theme.Dark) {
			theme = Theme.Light
		}
		setTheme(<Theme>theme)

		let palette = localStorage.getItem(LocalStorage.Palette)
		if (!palette || !(palette in palettes)) {
			palette = DEFAULT_PALETTE
		}
		setPalette(<keyof typeof palettes>palette)
	})

	const primaryShade = computed<500 | 400>(() =>
		appConfig.value.theme === Theme.Light ? 500 : 400,
	)

	return {
		appConfig,
		toggleTheme,
		setPalette,
		palettes: entries(palettes).map(value => [
			value[0],
			value[1][primaryShade.value],
		]),
		style,
		primaryShade,
	}
})
