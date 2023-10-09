import React, { createContext, useContext, useEffect } from 'react';
import { getCommunicationService } from 'jwplayer/utils/communication/communicationService';

import { getForcedOptimizely } from './getForcedOptimizely';

type VariationMap = Record<string, { id: string; name: string }>;

type OptimizelyContextType = {
	initialized: boolean;
	forced?: {
		experimentId: string;
		variationId: string;
	};
	variationMap?: VariationMap;
};

export interface WindowWithOptimizely extends Window {
	optimizely?: {
		get: (type: string) => {
			getVariationMap: () => VariationMap;
		};
	};
}

declare let window: WindowWithOptimizely;

const communicationService = getCommunicationService();

export const OptimizelyContext = createContext<OptimizelyContextType>({
	initialized: false,
});

export const useOptimizelyContext = () => {
	return useContext(OptimizelyContext);
};

export const OptimizelyContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [initialized, setInitialized] = React.useState(false);
	const [variationMap, setVariationMap] = React.useState<VariationMap>({});

	useEffect(() => {
		communicationService.once('[Platform] optimizely loaded', () => {
			if (!window.optimizely) {
				return;
			}

			setInitialized(true);

			const optimizelyState = window.optimizely.get('state');

			if (optimizelyState) {
				setVariationMap(optimizelyState.getVariationMap());
			}
		});
	}, []);

	return (
		<OptimizelyContext.Provider value={{ initialized, variationMap, forced: getForcedOptimizely() }}>
			{children}
		</OptimizelyContext.Provider>
	);
};
