import { babel } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import replace from '@rollup/plugin-replace';

import packageJson from './package.json';

const isDev = process.env.NODE_ENV === 'development';
const plugins = [];

// Don't minify when in watch mode
if (!isDev) {
	plugins.push(terser());
}

const config = [
	{
		input: {
			standAlone_RV_VideoPlayer: 'standalone-loader.tsx',
		},
		output: [
			{
				dir: 'standalone-dist',
				compact: true,
				name: 'iife',
				plugins: plugins,
				format: 'iife',
			},
		],
		watch: {
			include: './src/**',
			clearScreen: false,
		},
		plugins: [
			replace({
				'process.env.NODE_ENV': isDev ? JSON.stringify('development') : JSON.stringify('production'),
				__buildDate__: () => JSON.stringify(new Date()),
				'process.env.VIDEO_VERSION': JSON.stringify(packageJson.version),
			}),
			babel({
				babelHelpers: 'bundled',
				extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'],
				// exclude: ['node_modules', 'src/old', 'src/locales', 'scripts'],
				exclude: ['node_modules'],
				// include: ['src/**/*.(ts|tsx|js)'],
				include: ['**/*.(ts|tsx|js)'],
			}),
			typescript({ tsconfig: './tsconfig-stand-alone.json' }),
			resolve({
				browser: true,
				dedupe: ['react', 'react-dom', 'react-i18next', 'react-i18next'],
			}),
			json(),
			commonjs(),
		],
		/* external: ['react', 'react-dom', 'react-i18next', 'react-i18next'], */
	},
	{
		input: '../src/types.d.ts',
		output: [{ file: 'standalone-dist/main.d.ts', format: 'es' }],
		plugins: [dts()],
	},
];

export default config;
