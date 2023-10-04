const OPTIMIZELY_FORCE_VARIATION_QUERY_PARAM = 'video_optimizely_force';

export const getOptimizelyVariationId = (optimizelyExperimentId: string) => {
	const searchParams = new URLSearchParams(window?.location?.search);
	const forcedOptimizelyVariation = searchParams.get(OPTIMIZELY_FORCE_VARIATION_QUERY_PARAM);

	if (forcedOptimizelyVariation) {
		const [forcedExperimentId, forcedVariationId] = forcedOptimizelyVariation.split('_');

		if (forcedExperimentId === optimizelyExperimentId) {
			return forcedVariationId;
		}

		return;
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const optimizelyState = window.optimizely?.get('state');

	if (!optimizelyState) {
		return;
	}

	const experimentStates = optimizelyState.getVariationMap()[optimizelyExperimentId];

	return experimentStates[optimizelyExperimentId]?.id as string | undefined;
};

export const isOptimizelyExperimentActive = (optimizelyExperimentId: string) => {
	return !!getOptimizelyVariationId(optimizelyExperimentId);
};

export const isOptimizelyVariationActive = (optimizelyExperimentId: string, variationId: string | string[]) => {
	let variationArray = variationId;

	if (!Array.isArray(variationId)) {
		variationArray = [variationId];
	}

	return variationArray.includes(getOptimizelyVariationId(optimizelyExperimentId));
};
