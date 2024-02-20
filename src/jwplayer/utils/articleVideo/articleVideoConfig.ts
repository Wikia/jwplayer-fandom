import * as articleVideoCookieService from 'jwplayer/utils/articleVideo/articleVideoCookies';
import { wikiaJWPlayeri18n } from 'jwplayer/i18n';

const isFromRecirculation = () => {
	return window.location.search.indexOf('wikia-footer-wiki-rec') > -1;
};

export const willAutoplay = () => {
	// as the function is used in many I've just left return true for now as we might want to use it in the future
	return true;
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

export const getArticleVideoConfig = (videoDetails) => {
	const lang = videoDetails?.lang || 'en';

	if (window?.videoExperiments?.playlistUrl && !videoDetails?.isDedicatedForArticle) {
		// This way we can provide an alternative playlist e.g. by using Optimizely
		return {
			autostart: willAutoplay() && !document.hidden,
			mute: willMute(),
			advertising: getAdvertisingConfig(lang),
			playlist: window.videoExperiments.playlistUrl,
		};
	}

	if (!videoDetails) return {};

	const videoId = videoDetails.playlist[0].mediaid;
	const mappedVideoOrPlaylistId = videoDetails.mediaId;
	const playlistUrl = videoDetails.isDedicatedForArticle
		? `https://cdn.jwplayer.com/v2/media/${videoId}`
		: `https://cdn.jwplayer.com/v2/playlists/${mappedVideoOrPlaylistId}`;

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
		playlistUrl,
	};
};
