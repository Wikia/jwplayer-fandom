import Cookies from 'js-cookie';

const playerImpressionsCookieName = 'playerImpressionsInWiki';

function getCookie(cookieName: string) {
	return () => Cookies.get(cookieName);
}

export const getPlayerImpressionsInWiki = function () {
	return Number(getCookie(playerImpressionsCookieName)());
};
