// Source: https://usehooks.com/useOnScreen/
import { useState, useEffect } from 'react';
import { communicationService, ofType } from 'jwplayer/utils/communication';
import { race, timer } from 'rxjs';
import { first } from 'rxjs/operators';
import { recordVideoEvent, VIDEO_RECORD_EVENTS } from 'jwplayer/utils/videoTimingEvents';
import getValueFromQuery from 'utils/getValuefromQuery';

export default function useAdComplete(): boolean {
	const [adComplete, setAdComplete] = useState(false);

	const noAds = getValueFromQuery('noads');
	if (noAds) {
		return true;
	}

	useEffect(() => {
		recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_OPT_IN_LISTEN_START);
		communicationService.action$.pipe(ofType('[AdEngine OptIn] set opt in'), first()).subscribe(() => {
			recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_OPT_IN_MESSAGE_RECIEVED);
			recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_CONFIG_LISTEN_START);
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
