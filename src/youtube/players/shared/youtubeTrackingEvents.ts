import { track } from '@fandom/tracking-metrics/tracking/dataLayer';

export interface YoutubePlayerTrackingProps {
	deviceType: 'desktop' | 'mobile';
}

export const trackYoutubePlayerInit = ({ deviceType }: YoutubePlayerTrackingProps) => {
	console.debug('Should send youtube init event.');
	track({
		event: `basic-mw-event-youtube-init-${deviceType}`,
		action: 'youtube',
		category: 'youtube-ready',
	});
	console.debug("Should've sent youtube init event.");
};

export const trackYoutubePlayerReady = ({ deviceType }: YoutubePlayerTrackingProps) => {
	track({
		event: `basic-mw-event-youtube-ready-${deviceType}`,
		action: 'youtube',
		category: 'youtube-ready',
	});
};
