/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
module.exports = {
  style: {
    postcssOptions: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
}
