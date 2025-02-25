module.exports = {
  plugins: [
      require('postcss-custom-properties')({ preserve: false }),
      require('postcss-nested'),
      require('autoprefixer')(),
      require('cssnano')({
          preset: ['default', { 'sourceMap': false }]
      })
  ]
};
