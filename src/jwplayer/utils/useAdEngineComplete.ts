// Source: https://usehooks.com/useOnScreen/
import { useState, useEffect } from 'react';
import { getCommunicationService } from 'jwplayer/utils/communication';
import { recordVideoEvent, VIDEO_RECORD_EVENTS } from 'jwplayer/utils/videoTimingEvents';

export default function useAdEngineComplete(): boolean {
	const [adComplete, setAdComplete] = useState(false);
	const communicationService = getCommunicationService();

	useEffect(() => {
		recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_OPT_IN_LISTEN_START);
		// TODO: we probably can remove this step as AdEngine won't send "[Ad Engine] Setup JWPlayer" before the consent
		communicationService.on('[AdEngine OptIn] set opt in', () => {
			recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_OPT_IN_MESSAGE_RECIEVED);
			recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_CONFIG_LISTEN_START);
			// TODO: we probably can remove waiting for the AdEngine after we finish testing strategy rules
			waitForAdEngine().then(() => {
				recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_CONFIG_MESSAGE_RECIEVED);
				recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_SETUP_JW_LISTEN_START);
				listenSetupJWPlayer(function () {
					recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_SETUP_JW_MESSAGE_RECIEVED);
					setAdComplete(true);
				});
			});
		});
	}, []);

	const waitForAdEngine = () => {
		const adEngineTimeout$ = new Promise((resolve) => {
			setTimeout(resolve, 2000, 'timeout');
		});
		const adEngineConfigured$ = new Promise((resolve) => {
			communicationService.on('[AdEngine] Configured', resolve);
		});

		return Promise.race([adEngineConfigured$, adEngineTimeout$]);
	};

	const listenSetupJWPlayer = (callback) => {
		communicationService.on('[Ad Engine] Setup JWPlayer', () => {
			callback();
		});
	};

	return adComplete;
}
