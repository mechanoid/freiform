const babel = require('rollup-plugin-babel')

// TODO: move to separate file
var customLaunchers = {
  sl_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 7',
    version: '35'
  },
  sl_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: '30'
  },
  // sl_ios_safari: {
  //   base: 'SauceLabs',
  //   browserName: 'iphone',
  //   platform: 'OS X 10.9',
  //   version: '7.1'
  // },
  sl_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11'
  }
}

module.exports = function (config) {
  config.set({
    basePath: '.',
    frameworks: ['qunit'],
    plugins: ['karma-qunit', 'karma-babel-preprocessor', 'karma-rollup-preprocessor', 'karma-sauce-launcher'],
    files: [
      // freiform.js is watched to trigger the preprocessor on demand
      { pattern: './freiform.js', included: true, watched: true },

      // test infrastructure
      { pattern: 'node_modules/sinon/pkg/sinon.js', included: true, watched: false },

      // tests
      { pattern: 'test/**/*.js', watched: true }
    ],
    preprocessors: {
      'freiform.js': ['rollup'],
      'test/**/*.js': ['babel']
    },
    rollupPreprocessor: {
      entry: 'freiform.js',
      format: 'iife',
      moduleName: 'freiform',
      plugins: [ babel() ]
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015']
      }
    },

    sauceLabs: {
      testName: 'Freiform Library Tests',
      startConnect: false,
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
    },
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    reporters: ['dots', 'saucelabs'],
    singleRun: true
  })
}
