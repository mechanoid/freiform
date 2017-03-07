module.exports = function (config) {
  config.set({
    basePath: '.',
    frameworks: ['qunit'],
    plugins: ['karma-qunit'],
    files: [
      { pattern: 'dist/freiform.js', watched: false, included: true },
      'test/**/*.js'
    ]
  })
}
