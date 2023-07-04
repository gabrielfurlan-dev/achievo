/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {

                CINZA: '#f3f4f6',
                VERDE_CLARO: '#c3ffc9',

                PRINCIPAL: '#5C8A74',
                PRINCIPAL_DARK: '#3b4a3c',

                SECONDARY: '#D97251',

                WHITE_PRINCIPAL: '#F5F5F5',
                WHITE_SECONDARY: '#EAEAEA',
                WHITE_TERTIARY: '#DADADA',

                GRAY: '#808080',
                GRAY_SECONDARY: '#595959',
                GRAY_DARK: '#1C1C1C'

            },
            fontFamily: {
                'sans': ['Montserrat', 'sans-serif']
            }
        },
    },
    plugins: [],
};
