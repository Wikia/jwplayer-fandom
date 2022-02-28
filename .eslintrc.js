module.exports = {
	extends: [
		"@fandom-frontend/eslint-config",
		"@fandom-frontend/eslint-config/react",
		"@fandom-frontend/eslint-config/typescript",
    	"prettier"
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
		project: './tsconfig.json',
	},
	settings: {
		react: { version: "detect" },
	},
};