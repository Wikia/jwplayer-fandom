import { babel } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/main.ts',
    output: {
      file: 'dist/bundle.js',
      compact: true,
      format: 'es'
    },
    plugins: [
      babel({ 
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'],
        exclude: ["node_modules", "src/old", "src/locales", "scripts"],
        include: ["src/**/*.(ts|tsx|js)"]
      }),
      typescript(),
      resolve()
    ],
    external: ['react']
};