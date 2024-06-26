import { AxiosError } from "axios"

export const error = {
	errorMessage: (err: any): string => {
		if (
			err instanceof AxiosError &&
			err.response &&
			err.response.data &&
			typeof err.response.data === "string"
		) {
			return err.response.data
		}
		return ""
	},
}
