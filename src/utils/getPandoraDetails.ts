import { isLocalhost, isOnDevDomain, isServerSide } from 'utils/getEnv';

const getPandoraBaseUrl = (): string => {
	if (isServerSide()) {
		return '';
	}
	return isLocalhost() || isOnDevDomain() ? 'https://services.fandom-dev.us/' : 'https://services.fandom.com/';
};

const getArticleVideoServiceBaseUrl = (): string => {
	const baseServiceUrl = getPandoraBaseUrl();
	// No need to trim the string, since the Pandora baseUrl will return an empty string if the player renders server side for some reason.
	if (baseServiceUrl.length === 0) {
		return baseServiceUrl;
	}

	return `${baseServiceUrl}article-video/`;
};

export { getPandoraBaseUrl, getArticleVideoServiceBaseUrl };
