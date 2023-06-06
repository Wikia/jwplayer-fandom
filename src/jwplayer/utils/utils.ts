export const getDismissedFn = (ref: HTMLInputElement) => () => {
	const inputElement = ref;
	if (inputElement) {
		const value = inputElement.value;
		return Boolean(value);
	}
	return false;
};
