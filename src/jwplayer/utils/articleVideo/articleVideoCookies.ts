import Cookies from 'js-cookie';

const autoplayCookieName = 'featuredVideoAutoplay';
const captionsCookieName = 'featuredVideoCaptions';
const playerImpressionsCookieName = 'playerImpressionsInWiki';
const cookieExpireDays = 1209600000; // 14 days in milliseconds

interface WindowWgCookieDomain extends Window {
	wgCookieDomain?: string;
}

declare let window: WindowWgCookieDomain;

function setCookie(cookieName: string, domain: string, path: string) {
	return (cookieValue: string) => {
		Cookies.set(cookieName, cookieValue, {
			path: path,
			domain: domain,
			expires: cookieExpireDays,
		});

		return cookieValue;
	};
}

function getCookie(cookieName: string) {
	return () => Cookies.get(cookieName);
}

function getLangPath() {
	const pathParts = window.location.pathname.split('/');

	return pathParts[1] === 'wiki' ? '/' : '/' + pathParts[1];
}

export const getAutoplay = getCookie(autoplayCookieName);
export const setAutoplay = setCookie(autoplayCookieName, window.wgCookieDomain, '/');
export const getCaptions = getCookie(captionsCookieName);
export const setCaptions = setCookie(captionsCookieName, window.wgCookieDomain, '/');
export const getPlayerImpressionsInWiki = function () {
	return Number(getCookie(playerImpressionsCookieName)());
};
export const setPlayerImpressionsInWiki = setCookie(
	playerImpressionsCookieName,
	window.location.hostname,
	getLangPath(),
);
