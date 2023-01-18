// Source: https://usehooks.com/useOnScreen/
import { useState, useEffect } from 'react';
import { communicationService, ofType } from 'jwplayer/utils/communication';
import { race, timer } from 'rxjs';
import { first } from 'rxjs/operators';
import { recordVideoEvent, VIDEO_RECORD_EVENTS } from 'jwplayer/utils/videoTimingEvents';

export default function useAdComplete(): boolean {
	const [adComplete, setAdComplete] = useState(false);

	useEffect(() => {
		// TODO: Remove before deploying final version. Keep during dev cycle.
		if (window.location.search.includes('skip_ad_complete')) {
			console.debug("JW Player skip_ad_complete was found. setAdComplete will resolve to 'true'.");
			setAdComplete(true);
			return;
		}

		console.debug(
			'AdEngine Steps: \n ' +
				'All AdEng Setup Steps in JW Player: \n\n' +
				'useAdComplete step 1: ${VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_OPT_IN_LISTEN_START} \n' +
				"useAdComplete step 2: '[AdEngine OptIn] set opt in' \n" +
				"useAdComplete step 3: 'Wait for AdEngine' \n" +
				"useAdComplete step 4: 'listenSetupJWPlayer' \n" +
				'End All AdEng Setup Steps in JW Player \n\n',
		);

		recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_OPT_IN_LISTEN_START);
		console.debug(`useAdComplete step 1: ${VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_OPT_IN_LISTEN_START}`);
		communicationService.action$.pipe(ofType('[AdEngine OptIn] set opt in'), first()).subscribe(() => {
			console.debug(`useAdComplete step 2: '[AdEngine OptIn] set opt in'`);
			recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_OPT_IN_MESSAGE_RECIEVED);
			recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_CONFIG_LISTEN_START);
			waitForAdEngine().then(() => {
				console.debug(`useAdComplete step 3: 'Wait for AdEngine'`);
				recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_CONFIG_MESSAGE_RECIEVED);
				recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_SETUP_JW_LISTEN_START);
				listenSetupJWPlayer(function () {
					console.debug(`useAdComplete step 4: 'listenSetupJWPlayer'`);
					recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_SETUP_JW_MESSAGE_RECIEVED);
					setAdComplete(true);
				});
			});
		});
	}, []);

	const waitForAdEngine = () => {
		// to prevent prettier reformatting this line and then spitting out errors
		// prettier-ignore
		const adEngineConfigured$ = communicationService.action$.pipe(ofType('[AdEngine] Configured'), first());
		const adEngineTimeout = 2000;
		const adEngineTimeout$ = timer(adEngineTimeout);

		return race(adEngineConfigured$, adEngineTimeout$).toPromise();
	};

	const listenSetupJWPlayer = (callback) => {
		communicationService.action$.pipe(ofType('[Ad Engine] Setup JWPlayer'), first()).subscribe(callback);
	};

	return adComplete;
}
