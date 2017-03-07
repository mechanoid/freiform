import babel from 'rollup-plugin-babel'

export default {
  entry: 'freiform.js',
  format: 'iife',
  moduleName: 'freiform',
  plugins: [ babel() ]
}
