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

                DARK_TEXT: "#DADADA",
                DARK_TEXT_SECONDARY: "#808080",

                LIGHT_PRINCIPAL_SECONDARY: "#5C8A7457",
                DARK_PRINCIPAL_SECONDARY: "#5C8A7457",

                PRINCIPAL_HOVER: "#D6E0DB",
                PRINCIPAL_HOVER_DARK: "#2A3831",

                //AUXILIAR
                YELLOW: "#F1E57A",

                //## ===REORGANIZATION ==##
                //NEUTRAL COLORS
                NEUTRAL_WHITE: "#FFFFFF",

                NEUTRAL_GRAY_0: "#F8F9FA",
                NEUTRAL_GRAY_01: "#F1F3F5",
                NEUTRAL_GRAY_02: "#E9ECEF",
                NEUTRAL_GRAY_04: "#CED4DA",
                NEUTRAL_GRAY_06: "#868E96",
                NEUTRAL_GRAY_07: "#495057",
                NEUTRAL_GRAY_09: "#212529",

                NEUTRAL_600: "#F8F8F8",
                NEUTRAL_550: "#E7E7E7",
                NEUTRAL_500: "#EFEFEF",
                NEUTRAL_400: "#CCCCCC",
                NEUTRAL_300: "#808080",
                NEUTRAL_200: "#595959",
                NEUTRAL_150: "#1D1D1D",
                NEUTRAL_100: "#1C1C1C",

                //NEUTRAL DARK
                NEUTRAL_DARK_100: "#0D0D0D",
                NEUTRAL_DARK_200: "#141414",
                NEUTRAL_DARK_300: "#1A1A1A",


                //AUXILIAR COLORS
                NEGATIVE: "#F97474",

                //PRIMARY
                PRINCIPAL: '#5C8A74', //NEED TO BE CHANGED TO PRIMARY_DEFAULT
                PRIMARY_DEFAULT: '#5C8A74',

                //SECONDARY
                SECONDARY: '#D97251', //NEED TO BE CHANGED TO SECONDARY_DEFAULT
                SECONDARY_DEFAULT: '#D97251',

            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif']
            }
        },
    },
    plugins: [],
};
