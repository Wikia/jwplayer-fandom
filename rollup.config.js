import { babel } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';

const config = [
	{
		input: 'src/main.ts',
		output: [
			{
				file: 'dist/bundle.esm.js',
				compact: true,
				plugins: [terser()],
				format: 'es',
				globals: {
					react: 'React',
				},
			},
			{
				name: 'jwplayer-fandom',
				file: 'dist/bundle.umd.js',
				compact: true,
				plugins: [terser()],
				format: 'umd',
				globals: {
					react: 'React',
				},
			},
		],
		watch: {
			include: './src/**',
			clearScreen: false,
		},
		plugins: [
			babel({
				babelHelpers: 'bundled',
				extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'],
				exclude: ['node_modules', 'src/old', 'src/locales', 'scripts'],
				include: ['src/**/*.(ts|tsx|js)'],
			}),
			typescript({ tsconfig: './tsconfig.json' }),
			resolve(),
			json(),
			commonjs(),
		],
		external: ['react', 'react-dom', 'react-i18next', 'react-i18next'],
	},
	{
		input: './src/types.d.ts',
		output: [{ file: 'dist/main.d.ts', format: 'es' }],
		plugins: [dts()],
	},
];

// Reagan Rogan Poopy Grandma

export default config;
