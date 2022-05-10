import * as articleVideoCookieService from 'utils/articleVideo/articleVideoCookies';

const isFromRecirculation = () => {
	return window.location.search.indexOf('wikia-footer-wiki-rec') > -1;
};

export const willAutoplay = () => {
	return articleVideoCookieService.getAutoplay() !== '0';
};

export const willMute = () => {
	return isFromRecirculation() ? false : willAutoplay();
};

const getModifiedPlaylist = (playlist, isDedicatedForArticle) => {
	const normalizedPlaylistIndex = getNormalizedPlaylistIndex(playlist);
	const newPlaylist = playlist.slice(normalizedPlaylistIndex);

	return !isDedicatedForArticle && newPlaylist.length ? newPlaylist : playlist;
};

const getNormalizedPlaylistIndex = (playlist) => {
	const playerImpressions = articleVideoCookieService.getPlayerImpressionsInWiki() || 0;

	return playerImpressions > playlist.length ? playerImpressions % playlist.length : playerImpressions;
};

export const getArticleVideoConfig = (videoDetails) => {
	if (!videoDetails) return {};

	const videoId = videoDetails.playlist[0].mediaid;

	return {
		autostart: willAutoplay() && !document.hidden,
		image: '//content.jwplatform.com/thumbs/' + videoId + '-640.jpg',
		mute: willMute(),
		description: videoDetails.description,
		title: videoDetails.title,
		playlist: getModifiedPlaylist(videoDetails.playlist, videoDetails.isDedicatedForArticle),
		lang: videoDetails.lang,
		// TODO: replace text with i18n
		advertising: {
			admessage: 'testing ads',
			autoplayadsmuted: willAutoplay() && !document.hidden,
			client: 'googima',
			cuetext: 'cuetext test',
			loadVideoTimeout: 16000,
			maxRedirects: 8,
			requestTimeout: 11500,
			setLocale: 'en',
			skipmessage: 'skip ads',
			skiptext: 'skip text',
			truncateMacros: false,
			vastLoadTimeout: 11000,
			vpaidcontrols: true,
		},
	};
};
