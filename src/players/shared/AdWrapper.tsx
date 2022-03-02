import React, { ReactNode, useState, useEffect } from 'react';
import { communicationService, ofType } from 'utils/communication';

import { race, timer } from 'rxjs';
import { first } from 'rxjs/operators';

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

interface AdWrapperProps {
	children: ReactNode;
}

const AdWrapper: React.FC<AdWrapperProps> = ({ children }) => {
	const [adComplete, setAdComplete] = useState(false);
	useEffect(() => {
		if (process.env.NODE_ENV !== 'development') {
			communicationService.action$.pipe(ofType('[AdEngine OptIn] set opt in'), first()).subscribe(() => {
				waitForAdEngine().then(() => {
					listenSetupJWPlayer(function () {
						setAdComplete(true);
					});
				});
			});
		} else {
			setAdComplete(true);
		}
	}, []);

	if (adComplete) {
		return <>{children}</>;
	}

	return null;
};

export default AdWrapper;
