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
				},
			},
			backgroundColor: {
				theme: {
					fill: "var(--color-fill)",
				},
			},
		},
	},
	plugins: [],
};
