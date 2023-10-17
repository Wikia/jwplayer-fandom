import { WindowWithOptimizely } from 'optimizely/OptimizelyContext';

declare let window: WindowWithOptimizely;

afterEach(() => {
	delete window.optimizely;
});

export const mockOptimizely = ({ experimentId = '1234', variationId = '5678', variationName = 'test' } = {}) => {
	window.optimizely = {
		get: () => ({
			getVariationMap: () => ({
				[experimentId]: {
					id: variationId,
					name: variationName,
				},
			}),
		}),
	};
};
