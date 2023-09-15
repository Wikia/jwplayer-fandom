import { useState, useEffect } from 'react';
import { getCommunicationService } from 'jwplayer/utils/communication';
import { recordVideoEvent, VIDEO_RECORD_EVENTS } from 'jwplayer/utils/videoTimingEvents';

interface AdEngineSetupData {
	autoplayDisabled: boolean;
	showAds: boolean;
	strategyRulesEnabled?: boolean;
	vastUrl?: string;
}

export default function useJwpAdsSetupComplete(): Record<string, boolean | string> {
	const communicationService = getCommunicationService();

	const [jwpAdsSetupComplete, setJwpAdsSetupComplete] = useState(null);
	const [vastUrl, setVastUrl] = useState(null);
	const [strategyRulesEnabled, setStrategyRulesEnabled] = useState(false);

	useEffect(() => {
		recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_CONFIG_MESSAGE_RECIEVED);
		recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_SETUP_JW_LISTEN_START);
		listenSetupJWPlayer(function (adEngineData: AdEngineSetupData) {
			recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_SETUP_JW_MESSAGE_RECIEVED);
			const { vastUrl, strategyRulesEnabled } = adEngineData;

			setJwpAdsSetupComplete(true);
			setVastUrl(vastUrl);
			setStrategyRulesEnabled(strategyRulesEnabled);
		});
	}, []);

	const listenSetupJWPlayer = (callback) => {
		communicationService.on('[Ad Engine] Setup JWPlayer', callback);
	};

	return {
		complete: jwpAdsSetupComplete,
		strategyRulesEnabled,
		vastUrl,
	};
}
