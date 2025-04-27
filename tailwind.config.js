/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#E9C46A',      // Golden Dust
				secondary: '#A9C1D9',    // Dusty Sky Blue
				accent: '#F4A896',       // Soft Coral
				neutral: '#F3ECE2',      // Pale Cream
				foreground: '#8D6748',   // Clay Brown
				muted: '#7E7F83',        // Faded Asphalt
				success: '#6B7B62',      // Olive Green
			},
		},
	},
	plugins: []
};

