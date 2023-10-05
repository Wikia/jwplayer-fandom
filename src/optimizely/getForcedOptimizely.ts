const OPTIMIZELY_FORCE_VARIATION_QUERY_PARAM = 'video_optimizely_force';

export const getForcedOptimizely = () => {
	const searchParams = new URLSearchParams(window?.location?.search);
	const forcedOptimizelyVariation = searchParams.get(OPTIMIZELY_FORCE_VARIATION_QUERY_PARAM);

	if (!forcedOptimizelyVariation) {
		return;
	}

	const [experimentId, variationId] = forcedOptimizelyVariation.split('_');

	return {
		experimentId,
		variationId,
	};
};
