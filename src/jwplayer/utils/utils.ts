import { isOnBrowser } from 'jwplayer/utils/envs';

export const getDismissedFn = (inputName: string) => () => {
	const inputElement: HTMLInputElement = document.querySelector(`[name="${inputName}"]`);
	if (inputElement) {
		return inputElement.value === 'true';
	}
	return false;
};

export const isInGallery = () => {
	if (isOnBrowser()) {
		return !!document.getElementById('LightboxModal');
	}
	return false;
};
