/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
        './src/providers/**/*.{js,ts,jsx,tsx,mdx}',
        './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1a1a1a',
                    hover: '#000000',
                    50: '#f5f5f5',
                    100: '#e6e6e6',
                    200: '#cccccc',
                    300: '#999999',
                    400: '#808080',
                    500: '#666666',
                    600: '#4d4d4d',
                    700: '#333333',
                    800: '#1a1a1a',
                    900: '#111111',
                    950: '#000000',
                },
                institutional: {
                    white: '#ffffff',
                    black: '#000000',
                    gray: {
                        50: '#f5f5f5',
                        100: '#e6e6e6',
                        200: '#cccccc',
                        300: '#999999',
                        400: '#808080',
                        500: '#666666',
                        600: '#4d4d4d',
                        700: '#333333',
                        800: '#1a1a1a',
                        900: '#111111',
                    },
                },
                danger: '#991b1b',
                warning: '#854d0e',
                success: '#166534',
                info: '#1e40af',
            },
            container: {
                center: true,
                padding: '1rem',
                screens: {
                    '2xl': '1400px',
                },
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'fade-up': 'fadeUp 0.5s ease-out',
                'skeleton': 'skeleton 2s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                skeleton: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
            },
        },
    },
    plugins: [],
}