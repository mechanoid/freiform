const rollupConfig = require('./rollup.config.js').default

module.exports = function (config) {
  config.set({
    basePath: '.',
    frameworks: ['qunit'],
    plugins: ['karma-qunit', 'karma-rollup-preprocessor'],
    files: [
      { pattern: 'freiform.js', included: false, watched: true },
      { pattern: 'dist/freiform.js', watched: true, included: true },
      { pattern: 'test/**/*.js', watched: true }
    ],
    preprocessors: {
      'freiform.js': ['rollup']
    },
    rollupPreprocessor: rollupConfig
  })
}
