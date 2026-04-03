import colors from 'tailwindcss/colors'

export const content = [
  './app/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
]
export const theme = {
  extend: {
    colors: {},
    backgroundImage: {},
  },
}
export const variants = {
  extend: {
    backgroundColor: ['odd'],
  },
}
export const plugins = []
