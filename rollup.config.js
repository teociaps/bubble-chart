import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'iife', // for browser compatibility
    name: 'BubbleChart'
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript()
  ]
};
