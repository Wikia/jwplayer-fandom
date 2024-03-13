// Source: https://usehooks.com/useOnScreen/
import { useState, useEffect } from 'react';
import { getCommunicationService } from 'jwplayer/utils/communication';

export default function useAdComplete(hasAds = true): boolean {
	const [adComplete, setAdComplete] = useState(false);
	const communicationService = getCommunicationService();

	if (!hasAds) {
		console.debug('Ads are disabled. Will skip AdEng setup.');
		return true;
	}

	useEffect(() => {
		communicationService.on('[AdEngine OptIn] set opt in', () => {
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
