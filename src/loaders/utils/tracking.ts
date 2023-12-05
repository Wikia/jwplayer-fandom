import trackerFactory from '@fandom/tracking-metrics/tracking';

export const eligibleTracker = trackerFactory({
	category: 'jwplayer',
	event: 'eligible',
	sendToDW: true,
});
