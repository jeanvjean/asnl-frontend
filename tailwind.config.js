module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'dark-blue': '#1A1746',
        'weird-purple': '#25234F',
        'bg-sidebar': '#131B24',
        'btn-purple': '#5C53FF',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
