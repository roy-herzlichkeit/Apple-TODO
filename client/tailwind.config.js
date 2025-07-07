const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    screens: {
      xs: { max: '500px' },
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
};
