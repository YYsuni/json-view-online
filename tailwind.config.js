/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,tsx,jsx,css}', './index.html'],
	theme: {
		container: {
			center: true,
			screens: ['1440px']
		},
		extend: {
			colors: {
				text: '#000000',
				bg: '#D3E8D2',

				theme: {
					'#1': '#EBF3E9',
					'#2': '#FBFDF6'
				}
			}
		}
	}
}
