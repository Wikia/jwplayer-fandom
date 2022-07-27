import { track } from '@fandom/tracking-metrics/tracking/dataLayer';

export interface TwitchPlayerTrackingProps {
	deviceType: 'desktop' | 'mobile';
}

export const trackTwitchInit = ({ deviceType }: TwitchPlayerTrackingProps) => {
	console.log('Should send twitch init event.');
	track({
		event: `basic-mw-event-init-twitch-${deviceType}`,
		action: 'twitch',
		category: 'twitch-init',
	});
	console.log("Should've sent twitch init event.");
};
