import * as articleVideoCookieService from 'jwplayer/utils/articleVideo/articleVideoCookies';
import { wikiaJWPlayeri18n } from 'jwplayer/i18n';

export const willAutoplay = () => {
	// as the function is used in many I've just left return true for now as we might want to use it in the future
	return true;
};

export const willMute = () => {
	return willAutoplay();
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

const getAdvertisingConfig = (lang: string) => {
	const i18n = wikiaJWPlayeri18n[lang];
	const langForAds = lang.substr(0, 2);

	return {
		admessage: i18n.admessage,
		autoplayadsmuted: willAutoplay() && !document.hidden,
		client: 'googima',
		cuetext: i18n.cuetext,
		loadVideoTimeout: 16000,
		maxRedirects: 8,
		requestTimeout: 11500,
		setLocale: langForAds,
		skipmessage: i18n.skipmessage,
		skiptext: i18n.skiptext,
		truncateMacros: false,
		vastLoadTimeout: 11000,
		vpaidcontrols: true,
	};
};

function isPlaylistEmpty(playlist) {
	return typeof playlist === 'object' && playlist?.length > 0;
}

export const getArticleVideoConfig = (videoDetails) => {
	const lang = videoDetails?.lang || 'en';

	if (!videoDetails || !isPlaylistEmpty(videoDetails.playlist)) {
		console.warn('No video details!');
		return {};
	}

	const videoId = videoDetails.playlist[0].mediaid;
	const mappedVideoOrPlaylistId = videoDetails.mediaId;

	return {
		autostart: willAutoplay() && !document.hidden,
		image: '//content.jwplatform.com/thumbs/' + videoId + '-640.jpg',
		mute: willMute(),
		description: videoDetails.description,
		title: videoDetails.title,
		playlist: getModifiedPlaylist(videoDetails.playlist, videoDetails.isDedicatedForArticle),
		playlistId: !videoDetails.isDedicatedForArticle ? mappedVideoOrPlaylistId : null,
		mediaId: videoId,
		lang: videoDetails.lang,
		advertising: getAdvertisingConfig(lang),
	};
};
