import { babel } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';

import postcssDesignTokens from 'postcss-design-tokens';
import autoprefixer from 'autoprefixer';
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import { visualizer } from 'rollup-plugin-visualizer';

import analyzer from 'rollup-plugin-analyzer';
import alias from 'rollup-plugin-alias';

import packageJson from './package.json';

const isDev = process.env.NODE_ENV === 'development';
const plugins = [];

const config = [
	{
		input: {
			main: 'src/main.ts',
			DesktopArticleVideoLoader: 'src/loaders/DesktopArticleVideoLoader.tsx',
			MobileArticleVideoLoader: 'src/loaders/MobileArticleVideoLoader.tsx',
			CanonicalVideoLoader: 'src/loaders/CanonicalVideoLoader.tsx',
			RedVentureVideoPlayer: 'src/jwplayer/players/RedVentureVideoPlayer/RedVentureVideoPlayer.tsx',
		},
		output: [
			{
				dir: 'dist',
				compact: false,
				plugins: plugins,
				format: 'es',
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
			alias({
				entries: [
					{ find: 'react', replacement: 'preact/compat' },
					{ find: 'react-dom/test-utils', replacement: 'preact/test-utils' },
					{ find: 'react-dom', replacement: 'preact/compat' },
					{ find: 'react/jsx-runtime', replacement: 'preact/jsx-runtime' },
				],
			}),
			replace({
				'process.env.NODE_ENV': isDev ? JSON.stringify('development') : JSON.stringify('production'),
				__buildDate__: () => JSON.stringify(new Date()),
				'process.env.VIDEO_VERSION': JSON.stringify(packageJson.version),
			}),
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
			postcss({
				modules: true,
				minimize: !isDev,
				sourceMap: isDev,
				extensions: ['.css', '.scss'],
				plugins: [
					postcssDesignTokens({ tokens: WDSVariables }),
					autoprefixer(),
					simplevars(),
					nested(),
					cssnext({ warnForDuplicates: false }),
					cssnano(),
				],
			}),
			analyzer({
				hideDeps: true,
				summaryOnly: true,
				limit: 0,
			}),
			visualizer(),
		],
		external: ['react', 'react-dom', 'react-i18next', 'react-i18next'],
	},
	{
		input: './src/types.d.ts',
		output: [{ file: 'dist/main.d.ts', format: 'es' }],
		plugins: [dts()],
	},
];

export default config;
