module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				theme: {
					border: "var(--color-border)",
					ps1: {
						name: "var(--color-ps1-name)",
						symbol: "var(--color-ps1-symbol)",
						path: "var(--color-ps1-path)",
					},
				},
			},
			textColor: {
				theme: {
					base: "var(--color-text-base)",
					valid: "var(--color-text-valid)",
					error: "var(--color-text-error)",
				},
			},
			backgroundColor: {
				theme: {
					fill: "var(--color-fill)",
				},
				profile: {
					fill: "#584F63",
				},
			},
			height: {
				85: "25rem",
			},
			width: {
				85: "25rem",
			},
			fontSize: {
				tinyArt: "0.45rem",
				tiny: "0.55rem",
			},
			screens: {
				phone: "300px",
				bigPhone: "400px",
				tablet: "640px",
				laptop: "1024px",
				desktop: "1280px",
			},
		},
	},
	plugins: [],
};
