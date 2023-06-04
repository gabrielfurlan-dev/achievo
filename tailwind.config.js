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

            // WHITE: '#FDFFFF',
            // DARK_WHITE: '#FDFFFF',
            // LIGHT_GRAY: '#F6F6F6',
            // MEDIUM_GRAY: '#D9D9D9',
            // DARK_GRAY: '#646464',
            // BLACK: '#222222',
            // GREEN : '#00C44B',
            // RED: '#F35757',
            // LIGHT_BLUE: '#0FA0E3',
            // DARK_BLUE: '#5045E6',
            // LIGHT_YELLOW: '#FFCC4D',
            // DARK_YELLOW: '#FFAC33',

            // DARK_THEME_TITLE: '#FFFFFF',
            // DARK_THEME_TEXT: '#D9D9D9',
            // DARK_THEME_BACKGROUND: '#1F1F1F',
            // DARK_THEME_BACKGROUND_SECONDARY: '#000000',
            // DARK_THEME_HOVER: "#11111F",
            // DARK_THEME_HOVER_RED: "#ab1919",

            // LIGHT_THEME_TITLE: '#222222',
            // LIGHT_THEME_TEXT: '#646464',
            // LIGHT_THEME_BACKGROUND: '#FFFFFF',
            // LIGHT_THEME_BACKGROUND_SECONDARY: '#F6F6F6',
            // LIGHT_THEME_HOVER: '#EFF6FF',
            // LIGHT_THEME_HOVER_RED: '#374151'
          }
        },
    },
    plugins: [],
};
