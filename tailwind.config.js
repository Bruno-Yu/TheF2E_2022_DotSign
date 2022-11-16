/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        // Neutral
        n1: '#FFFFFF', // bg-color
        n2: '#F1F2F5',
        n3: '#E3E4EA', // light bg color
        n4: '#DADBE1', // input field stroke
        n5: '#B8BAC0', // placeholder disable
        n6: '#78797D', // secondary text
        n7: '#191A1B', // primary text
        n8: '#EFEFEF', // bg-color
        // primary
        p1: '#3175FA',
        p2: '#DCECFF', // bg color
        p3: '#2465E3', // btn active
        // secondary
        s1: '#FBBB1E',
        s2: '#E3A100', // btn active
        // semantic colors 語意化顏色
        success: '#38D600',
        warning: '#F2BD02',
        error: '#F74331',
        // File type colors
        f1: '#DF5A3C',
        f2: '#4F8BFF',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('tw-elements/dist/plugin'),
  ],
};
