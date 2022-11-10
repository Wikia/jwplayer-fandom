import { track } from '@fandom/tracking-metrics/tracking/dataLayer';

export interface YoutubePlayerTrackingProps {
	deviceType: 'desktop' | 'mobile';
}

export const youtubeInit = ({ deviceType }: YoutubePlayerTrackingProps) => {
	console.debug('Should send twitch init event.');
	track({
		event: `basic-mw-event-init-youtube-${deviceType}`,
		action: 'youtube',
		category: 'youtube-init',
	});
	console.debug("Should've sent twitch init event.");
};
