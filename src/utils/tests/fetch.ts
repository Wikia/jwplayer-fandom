afterEach(() => {
	delete window.fetch;
});

export const mockFetch = () => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	window.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({}) }));

	return window.fetch as jest.Mock;
};
