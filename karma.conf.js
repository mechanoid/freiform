const babel = require('rollup-plugin-babel')

module.exports = function (config) {
  config.set({
    basePath: '.',
    frameworks: ['qunit'],
    plugins: ['karma-qunit', 'karma-rollup-preprocessor'],
    files: [
      // freiform.js is watched to trigger the preprocessor on demand
      { pattern: './freiform.js', included: true, watched: true },

      // test infrastructure
      { pattern: 'node_modules/sinon/pkg/sinon.js', included: true, watched: false },

      // tests
      { pattern: 'test/**/*.js', watched: true }
    ],
    preprocessors: {
      './freiform.js': ['rollup']
    },
    rollupPreprocessor: {
      entry: 'freiform.js',
      format: 'iife',
      moduleName: 'freiform',
      plugins: [ babel() ]}
  })
}
