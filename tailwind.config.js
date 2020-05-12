module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  theme: {
    extend: {
      inset: {
        '1/2': '50%'
      },
      scale: {
        '500': '5'
      }
    },
    fontFamily: {
      'primary': ['"Fredoka One"', 'cursive'],
      'secondary': ['"Source Sans Pro"', 'sans-serif']
    },
    colors: {
      'black': '#1E1E24',
      'lightBlack': '#39394B',
      'blue': '#262681',
      'mediumBlue': '#5E5EA1',
      'lightBlue': '#9999C3',
      'white': '#E6E6EF',
      'pureWhite': 'white'
    }
  },
  variants: {},
  plugins: [],
}
