import { useEffect } from 'react';
import trackerFactory from '@fandom/tracking-metrics/tracking';
import { useOptimizelyVariation } from 'optimizely/useOptimizelyVariation';

export const useOptimizelyTrack = (experimentId: string) => {
	const variationId = useOptimizelyVariation(experimentId);
	const tracker = trackerFactory({
		category: `jwplayer-experiment: optimizely-${experimentId}`,
		event: `variation: optimizely-${variationId}`,
		sendToDW: true,
	});

	useEffect(() => {
		if (variationId) {
			tracker.impression();
		}
	}, [variationId]);
};
