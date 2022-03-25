module.exports = {
	extends: ['@fandom-frontend/eslint-config', '@fandom-frontend/eslint-config/react', 'prettier'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			extends: ['@fandom-frontend/eslint-config/typescript'],
			parserOptions: {
				project: ['./tsconfig.json'],
				ecmaVersion: 2020,
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
	],
	settings: {
		react: { version: 'detect' },
	},
};
