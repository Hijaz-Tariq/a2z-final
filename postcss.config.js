// module.exports = {
//   plugins: {
//     "@tailwindcss/postcss": {},
//     autoprefixer: {},
//   },
// };

// module.exports = {
//   plugins: {
//     '@tailwindcss/postcss': {},
//     autoprefixer: {},
//   },
// }

// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }

module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      config: './tailwind.config.js'
    },
    autoprefixer: {},
  }
}