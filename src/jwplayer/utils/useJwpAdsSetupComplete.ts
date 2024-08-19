import { useState, useEffect } from 'react';
import { getCommunicationService } from 'jwplayer/utils/communication';

interface AdEngineSetupData {
	autoplayDisabled: boolean;
	showAds: boolean;
	strategyRulesEnabled?: boolean;
	vastUrl?: string;
	vastXml?: string;
}

export interface JwpAdsSetupCompleteResult {
	complete: boolean;
	showAds: boolean;
	strategyRulesEnabled: boolean;
	vastUrl: string;
	vastXml?: string;
}

export default function useJwpAdsSetupComplete(): JwpAdsSetupCompleteResult {
	const communicationService = getCommunicationService();

	const [jwpAdsSetupComplete, setJwpAdsSetupComplete] = useState<boolean>(null);
	const [showAds, setShowAds] = useState<boolean>(true);
	const [vastUrl, setVastUrl] = useState<string>(undefined);
	const [strategyRulesEnabled, setStrategyRulesEnabled] = useState<boolean>(false);
	const [vastXml, setVastXml] = useState<string>(undefined);

	useEffect(() => {
		listenSetupJWPlayer(function (adEngineData: AdEngineSetupData) {
			const { showAds, vastUrl, vastXml, strategyRulesEnabled } = adEngineData;

			setJwpAdsSetupComplete(true);
			setShowAds(showAds);
			setVastUrl(vastUrl);
			setStrategyRulesEnabled(strategyRulesEnabled);
			setVastXml(vastXml);
		});
	}, []);

	const listenSetupJWPlayer = (callback) => {
		communicationService.on('[Ad Engine] Setup JWPlayer', callback);
	};

	return {
		complete: jwpAdsSetupComplete,
		showAds,
		strategyRulesEnabled,
		vastUrl,
		vastXml,
	};
}
