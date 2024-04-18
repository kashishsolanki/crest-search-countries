/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
    theme: {
        colors: {
            transparent: 'transparent',
            'primary-background': '#0A1930',
            'primary-title': '#CDD6F6'
        },
        fontFamily: {
            roboto: ['Roboto Mono', 'monospace'],
        },
        extend: {},
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};
