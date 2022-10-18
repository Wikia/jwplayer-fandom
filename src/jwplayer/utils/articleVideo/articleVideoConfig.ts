import * as articleVideoCookieService from 'jwplayer/utils/articleVideo/articleVideoCookies';
import { wikiaJWPlayeri18n } from 'jwplayer/i18n';

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
	const lang = videoDetails.lang || 'en';
	const i18n = wikiaJWPlayeri18n[lang] || wikiaJWPlayeri18n['en'];
	const langForAds = lang.substr(0, 2);

	return {
		autostart: willAutoplay() && !document.hidden,
		image: '//content.jwplatform.com/thumbs/' + videoId + '-640.jpg',
		mute: willMute(),
		description: videoDetails.description,
		title: videoDetails.title,
		playlist: getModifiedPlaylist(videoDetails.playlist, videoDetails.isDedicatedForArticle),
		lang: videoDetails.lang,
		advertising: {
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
		},
	};
};

export const getCanonicalVideoConfig = (videoDetails) => {
	if (!videoDetails) return {};

	const videoId = videoDetails.mediaid;
	const lang = videoDetails.lang || 'en';
	const i18n = wikiaJWPlayeri18n[lang] || wikiaJWPlayeri18n['en'];
	const langForAds = lang.substr(0, 2);

	return {
		autostart: willAutoplay() && !document.hidden,
		image: '//content.jwplatform.com/thumbs/' + videoId + '-640.jpg',
		mute: willMute(),
		description: videoDetails.description,
		title: videoDetails.title,
		playlist: [],
		lang: videoDetails.lang,
		advertising: {
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
		},
	};
};
