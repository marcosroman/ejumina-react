/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
		"./index.html",
		"./src/**/*.{js,jsx}"
	],
  theme: {
    extend: {
			backgroundImage: {
				'fatty': "url('./static/img/sweatyatrave.png')",
				'fattytrans': "url('./static/img/sweatyatrave-blurredtransparent.png')"
			}
		},
  },
  plugins: [],
}
