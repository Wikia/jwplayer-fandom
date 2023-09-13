import { useState, useEffect } from 'react';
import { communicationService, ofType } from 'jwplayer/utils/communication';
import { first } from 'rxjs/operators';
import { recordVideoEvent, VIDEO_RECORD_EVENTS } from 'jwplayer/utils/videoTimingEvents';

export default function useJwpAdsSetupComplete(): boolean {
	const [jwpAdsSetupComplete, setJwpAdsSetupComplete] = useState(false);

	useEffect(() => {
		recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_CONFIG_MESSAGE_RECIEVED);
		recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_SETUP_JW_LISTEN_START);
		listenSetupJWPlayer(function () {
			recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_SETUP_JW_MESSAGE_RECIEVED);
			setJwpAdsSetupComplete(true);
		});
	}, []);

	const listenSetupJWPlayer = (callback) => {
		communicationService.action$.pipe(ofType('[Ad Engine] Setup JWPlayer'), first()).subscribe(callback);
	};

	return jwpAdsSetupComplete;
}
