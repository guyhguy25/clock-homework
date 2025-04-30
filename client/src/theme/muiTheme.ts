import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#6C2EB7",
			dark: "#5B189A",
			light: "#A084E8",
			contrastText: "#fff",
		},
		secondary: {
			main: "#F3F4F6",
			contrastText: "#231F20",
		},
		error: {
			main: "#EF4444",
		},
		info: {
			main: "#22D3EE",
		},
		background: {
			default: "#fff",
		},
	},
	shape: {
		borderRadius: 12,
	},
	typography: {
		fontFamily: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"].join(
			","
		),
	},
});

export default theme;
