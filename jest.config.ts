module.exports = {
	testEnvironment: 'jsdom',
	moduleDirectories: ['node_modules', 'src'],
	restoreMocks: true,
	collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!**/node_modules/**'],
};
