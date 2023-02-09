import { wikiaJWPlayeri18n } from 'jwplayer/i18n';
import { willAutoplay, willMute } from 'jwplayer/utils/articleVideo/articleVideoConfig';
import { RedVentureVideoDetails } from 'jwplayer/types';

export const getRedVentureVideoConfig = (videoDetails: RedVentureVideoDetails) => {
	if (!videoDetails) return {};

	const videoId = videoDetails.playlist[0].mediaid;
	const lang = 'en';
	const autoStart = videoDetails.autoStart ?? (willAutoplay() && !document.hidden);
	const i18n = wikiaJWPlayeri18n[lang] || wikiaJWPlayeri18n['en'];
	const langForAds = lang.substr(0, 2);

	return {
		autostart: autoStart,
		image: '//content.jwplatform.com/thumbs/' + videoId + '-640.jpg',
		mute: willMute(),
		description: videoDetails.description,
		title: videoDetails.title,
		playlist: videoDetails.playlist,
		lang: lang,
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
