// Source: https://usehooks.com/useOnScreen/
import { useState, useEffect } from 'react';
import { communicationService, ofType } from 'utils/communication';
import { race, timer } from 'rxjs';
import { first } from 'rxjs/operators';

export default function useAdComplete(): boolean {
	const [adComplete, setAdComplete] = useState(false);

	useEffect(() => {
		communicationService.action$.pipe(ofType('[AdEngine OptIn] set opt in'), first()).subscribe(() => {
			console.log('******************* ad engine opt in *******************');
			waitForAdEngine().then(() => {
				listenSetupJWPlayer(function () {
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
		console.log('******************* ad engine configured *******************');

		return race(adEngineConfigured$, adEngineTimeout$).toPromise();
	};

	const listenSetupJWPlayer = (callback) => {
		console.log('******************* setup jw player *******************');
		communicationService.action$.pipe(ofType('[Ad Engine] Setup JWPlayer'), first()).subscribe(callback);
	};

	return adComplete;
}
