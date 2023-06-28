export const getDismissedFn = (inputName: string) => () => {
	const inputElement: HTMLInputElement = document.querySelector(`[name="${inputName}"]`);
	if (inputElement) {
		return inputElement.value === 'true';
	}
	return false;
};
