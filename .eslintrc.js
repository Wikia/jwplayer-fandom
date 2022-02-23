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
	env: {
		browser: true,
		node: true,
		jest: true,
		es6: true,
	},
	globals: {
	},
	settings: {
		react: { version: "detect" },
		"import/core-modules": ["playwright-core"],
	},
	plugins: [
		"regex",
	],
	rules: {
		"@typescript-eslint/no-inferrable-types": ["error", {
			"ignoreParameters": true,
		}],
		// temporary rules
		"import/order": 0,
		"@typescript-eslint/explicit-module-boundary-types": 0,
		"@typescript-eslint/no-unused-vars": "warn",
		"@typescript-eslint/no-explicit-any": "warn",
		// strict-ify the code
		"@typescript-eslint/no-unsafe-return": "warn",
		"@typescript-eslint/no-unsafe-member-access": "warn",
		"@typescript-eslint/no-unsafe-call": "warn",
		"@typescript-eslint/no-unsafe-assignment": "warn",
		"@typescript-eslint/no-unsafe-argument": "warn",
		"@typescript-eslint/no-unnecessary-type-constraint": "warn",
		"@typescript-eslint/no-unnecessary-type-assertion": "warn",
		"@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",
		// those are disabled un UCP too
		"jsx-a11y/alt-text": 0,
		"react/no-access-state-in-setstate": 0,
	},
};