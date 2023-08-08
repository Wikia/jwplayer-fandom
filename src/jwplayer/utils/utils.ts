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

export const isInViewportCheck = (element: HTMLElement) => {
	if (element) {
		const rect = element.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}
	return false;
};
