/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{html,js}"],
    theme: {
        extend: {
            colors: {
                background: '#0a0a0a',
                surface: '#111111',
                primary: '#0070f3', // Electric Blue
                accent: '#00ff94', // Neon Green
                text: '#ededed',
                muted: '#888888',
                border: '#333333',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, #222 1px, transparent 1px), linear-gradient(to bottom, #222 1px, transparent 1px)",
            },
        },
    },
    plugins: [],
}
