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

                PRINCIPAL_DARK: '#3b4a3c',

                SECONDARY: '#D97251',

                WHITE_PRINCIPAL: '#F5F5F5',
                WHITE_SECONDARY: '#EAEAEA',
                WHITE_TERTIARY: '#DADADA',

                GRAY: '#808080',
                GRAY_SECONDARY: '#595959',
                GRAY_DARK: '#1C1C1C',


                LIGHT_BACKGROUND: '#F5F5F5',
                LIGHT_BACKGROUND_SECONDARY: '#EAEAEA',
                LIGHT_BACKGROUND_TERTIARY: '#DADADA',

                LIGHT_TEXT: "#1C1C1C",
                LIGHT_TEXT_SECONDARY: "#595959",

                DARK_BACKGROUND: "#000000",
                DARK_BACKGROUND_SECONDARY: "#1C1C1C",
                DARK_BACKGROUND_TERTIARY: "#2b2b2b",

                DARK_TEXT:"#DADADA",
                DARK_TEXT_SECONDARY:"#808080",

                PRINCIPAL: '#5C8A74',
                LIGHT_PRINCIPAL_SECONDARY: "#5C8A7457",
                DARK_PRINCIPAL_SECONDARY: "#5C8A7457",
            },
            fontFamily: {
                'sans': ['Montserrat', 'sans-serif']
            }
        },
    },
    plugins: [],
};
