// Source: https://usehooks.com/useOnScreen/
import { useState, useEffect } from 'react';
import { getCommunicationService } from 'jwplayer/utils/communication';

export default function useAdEngineComplete(): boolean {
	const [adComplete, setAdComplete] = useState(false);
	const communicationService = getCommunicationService();

	useEffect(() => {
		// TODO: we probably can remove this step as AdEngine won't send "[Ad Engine] Setup JWPlayer" before the consent
		communicationService.on('[AdEngine OptIn] set opt in', () => {
			// TODO: we probably can remove waiting for the AdEngine after we finish testing strategy rules
			waitForAdEngine().then(() => {
				listenSetupJWPlayer(function () {
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
