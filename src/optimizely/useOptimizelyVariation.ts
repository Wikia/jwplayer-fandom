import { useOptimizelyContext } from 'optimizely/OptimizelyContext';

export const useOptimizelyVariation = (experimentId: string) => {
	const { initialized, variationMap, forced } = useOptimizelyContext();

	if (forced && experimentId === forced.experimentId) {
		return forced.variationId;
	}

	if (!initialized) {
		return;
	}

	if (!variationMap) {
		return;
	}

	return variationMap[experimentId]?.id;
};
