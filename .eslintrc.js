module.exports = {
	extends: ['@fandom-frontend/eslint-config', '@fandom-frontend/eslint-config/react', 'prettier'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	settings: {
		react: { version: 'detect' },
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			extends: ['@fandom-frontend/eslint-config/typescript'],

			parserOptions: {
				project: ['./tsconfig.json'],
			},
		},
	],
};
