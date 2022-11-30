import { track } from '@fandom/tracking-metrics/tracking/dataLayer';
import { YoutubeTakeOverDetails } from 'loaders/utils/GetYoutubeTakeoverDetails';

export interface YoutubePlayerTrackingProps {
	deviceType: 'desktop' | 'mobile';
}

interface YoutubePlayerTrackingWithPlayerStateProps extends YoutubePlayerTrackingProps {
	playerStateName: string;
}

export const trackYoutubeTakeoverDetails = ({
	deviceType,
	youtubeVideoId,
}: YoutubePlayerTrackingProps & YoutubeTakeOverDetails) => {
	console.debug(`Youtube takeover details sourced. The following youtube video id will play: ${youtubeVideoId}`);
	track({
		event: `basic-mw-event-youtube-takeover-details-${deviceType}`,
		action: 'youtube',
		category: `youtube-video-takeover-${youtubeVideoId}`,
	});
};

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

export const trackYoutubePlayerStateChange = ({
	deviceType,
	playerStateName,
}: YoutubePlayerTrackingWithPlayerStateProps) => {
	track({
		event: `basic-mw-event-youtube-state-change-${deviceType}`,
		action: 'youtube',
		category: `youtube-state-change-${playerStateName}`,
	});
};

export const trackYoutubePlayerScrollClose = ({ deviceType }: YoutubePlayerTrackingProps) => {
	track({
		event: `basic-mw-event-youtube-scroll-player-close-${deviceType}`,
		action: 'youtube',
		category: 'youtube-scroll-close',
	});
};

export const trackYoutubePlayerReadyError = ({ deviceType }: YoutubePlayerTrackingProps) => {
	track({
		event: `basic-mw-event-youtube-ready-error-${deviceType}`,
		action: 'youtube',
		category: 'youtube-ready-error',
	});
};
