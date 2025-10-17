/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/components/**/*.{js,vue,ts}",
        "./app/layouts/**/*.vue",
        "./app/pages/**/*.vue",
        "./app/plugins/**/*.{js,ts}",
        "./app/app.vue",
        "./app/error.vue",
    ],
    theme: {
        extend: {
            transitionDuration: {
                '2000': '2000ms',
                '3000': '3000ms',
                '4000': '4000ms',
                '5000': '5000ms',
            }
        },
    },
    plugins: [],
};