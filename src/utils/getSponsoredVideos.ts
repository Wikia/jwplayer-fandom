import { isClientSide, isNonProd } from 'utils/getEnv';

const devArticleVideo = 'https://services.fandom-dev.us/article-video/jw-platform-api/get-sponsored-videos';
const prodArticleVideo = 'https://services.fandom.com/article-video/jw-platform-api/get-sponsored-videos';

const getSponsoredVideos = async (): Promise<Array<string>> => {
	if (isClientSide()) {
		if (isNonProd()) {
			const response = await fetch(devArticleVideo);
			return (await response?.json()) as Array<string>;
		} else {
			// TODO: Change this to a Prod URL once the Video Targeting API changes are deployed
			const response = await fetch(prodArticleVideo);
			return (await response?.json()) as Array<string>;
		}
	}

	console.debug('Server-side rendered player. No action taken to fetch sponsoredVideos.');
	return null;
};

export default getSponsoredVideos;
