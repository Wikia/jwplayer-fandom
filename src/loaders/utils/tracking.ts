import trackerFactory from '@fandom/tracking-metrics/tracking';
import { getVideoPlayerVersion } from 'loaders/utils/GetVersion';

export const eligibleTracker = trackerFactory({
	video_player: 'jwplayer',
	video_player_version: getVideoPlayerVersion(),
	category: 'jwplayer',
	event: 'eligible',
	sendToDW: true,
});
