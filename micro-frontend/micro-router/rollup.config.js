import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

module.exports = {
  input: 'src/Router.js',
  output: {
    file: 'dist/router.js',
    format: 'umd',
    name: 'Router'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
  ]
}