module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    borderRadius: {
      none: '0',
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
      large: '12px',
    },
    extend: {
      colors: {
        'dark-blue': '#1A1746',
        'weird-purple': '#25234F',
        'bg-sidebar': '#131B24',
        'btn-purple': '#5C53FF',
        'btn-red': 'red',
        'btn-green': 'green',
        'btn-gray': 'grey',
        'role-orange': '#FF7070',
        'role-purple': '#CC5FBF',
        'app-background': '#FAFAFB',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
