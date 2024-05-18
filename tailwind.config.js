module.exports = {
  darkMode: 'selector',
  content: [
    'index.html',
    './src/**/*.{js,jsx,ts,tsx,vue,html}'
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      boxShadow: {
        'outline': '0 0 0 3px rgba(66, 153, 225, 0.5)',
      },
      colors: {
        whitegray: '#FAFAFA',
        darkblue: '#02274F',
        lightblue: '#0149BC',
        bgprofile: '#F1F4F9',
      },
      backgroundImage: {
        gradiente: 'linear-gradient(to bottom right, #02274F, #0149BC)',
      },
    },
  },
  plugins: [],
};