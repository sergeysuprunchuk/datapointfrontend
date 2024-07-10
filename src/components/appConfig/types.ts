export enum PaletteKey {
	Indigo = "indigo",
	Blue = "blue",
	Emerald = "emerald",
	Rose = "rose",
}

export interface Palette {
	key: PaletteKey
	colors: string[]
}
