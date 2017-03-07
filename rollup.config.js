// import babel from 'rollup-plugin-babel'
const babel = require('rollup-plugin-babel')

exports.default = ({
  entry: 'freiform.js',
  format: 'iife',
  moduleName: 'freiform',
  dest: 'dist/freiform.js',
  plugins: [ babel() ]
})
