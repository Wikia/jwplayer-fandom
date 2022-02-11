import { babel } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const devMode = (process.env.NODE_ENV === 'development');
console.log(`${ devMode ? 'development' : 'production' } mode bundle`);

export default {
    input: 'src/main.ts',
    output: {
      file: 'dist/bundle.js',
      compact: devMode ? false : true,
      format: 'es'
    },
    watch: {
      include: './src/**',
      clearScreen: false
    },
    sourcemap: devMode ? 'inline' : false,
    plugins: [
      babel({ 
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'],
        exclude: ["node_modules", "src/old", "src/locales", "scripts"],
        include: ["src/**/*.(ts|tsx|js)"]
      }),
      typescript(),
      resolve(),
      terser()
    ],
    external: ['react']
};