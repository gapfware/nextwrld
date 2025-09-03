/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: 'tw-',
	important: false,
	content: [
		"./**/*.{html,js}",
		"!./node_modules/**"
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: '#7e22ce',
				secondary: "#080808",
				outlineColor: "#1F2123"
			}
		},
	},
	plugins: [],
}

