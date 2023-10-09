import React from 'react';
import { renderHook, act } from '@testing-library/react';

import { getCommunicationService } from 'jwplayer/utils/communication/communicationService';

import { mockOptimizely } from 'utils/tests/optimizely';

import { OptimizelyContextProvider, WindowWithOptimizely } from './OptimizelyContext';
import { useOptimizelyVariation } from './useOptimizelyVariation';

const communicationService = getCommunicationService();

declare let window: WindowWithOptimizely;

const originalLocation = window.location;

afterEach(() => {
	delete window.optimizely;
});

const setup = (experimentId = '1234') => {
	return renderHook(
		() => {
			return useOptimizelyVariation(experimentId);
		},
		{
			wrapper: ({ children }) => <OptimizelyContextProvider>{children}</OptimizelyContextProvider>,
		},
	);
};

describe('useOptimizelyVariation', () => {
	it('should return undefined if the optimizely is not available and the experiment is not forced', () => {
		const { result } = setup();

		expect(result.current).toBeUndefined();
	});

	it('should return the forced variation if the experiment is forced', () => {
		const experimentId = '1234';
		const variationId = '5678';
		const searchParams = new URLSearchParams();
		searchParams.set('video_optimizely_force', `${experimentId}_${variationId}`);

		jest.spyOn(window, 'location', 'get').mockImplementation(() => ({
			...originalLocation,
			search: searchParams.toString(),
		}));

		const { result } = setup(experimentId);

		expect(result.current).toBe(variationId);
	});

	it('should return the variation if the experiment is available', async () => {
		const experimentId = '1234';
		const variationId = '5678';

		mockOptimizely();

		const { result } = setup(experimentId);

		act(() => {
			communicationService.dispatch({ type: '[Platform] optimizely loaded' });
		});

		expect(result.current).toBe(variationId);
	});
});
