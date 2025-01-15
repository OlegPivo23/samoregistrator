// https://github.com/michael-ciniawsky/postcss-load-config

import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
// import rtlcss from 'postcss-rtlcss'

export default {
  plugins: [
    // https://tailwindcss.com/docs/installation
    tailwindcss(), // Подключаем Tailwind CSS как отдельный плагин

    // https://github.com/postcss/autoprefixer
    autoprefixer({
      overrideBrowserslist: [
        'last 4 Chrome versions',
        'last 4 Firefox versions',
        'last 4 Edge versions',
        'last 4 Safari versions',
        'last 4 Android versions',
        'last 4 ChromeAndroid versions',
        'last 4 FirefoxAndroid versions',
        'last 4 iOS versions',
      ],
    }),

    // https://github.com/elchininet/postcss-rtlcss
    // Если вам нужно поддерживать RTL-стили, раскомментируйте следующую строку:
    // rtlcss(),
  ],
}
