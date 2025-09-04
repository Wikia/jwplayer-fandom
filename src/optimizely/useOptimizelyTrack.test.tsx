import { act, renderHook } from '@testing-library/react';
import React from 'react';
import { getCommunicationService } from 'jwplayer/utils/communication/communicationService';
import { mockOptimizely } from 'utils/tests/optimizely';
import { mockFetch } from 'utils/tests/fetch';

import { useOptimizelyTrack } from './useOptimizelyTrack';
import { OptimizelyContextProvider } from './OptimizelyContext';

const communicationService = getCommunicationService();

const setup = (experimentId = '1234') => {
	return renderHook(
		() => {
			return useOptimizelyTrack(experimentId);
		},
		{
			wrapper: ({ children }) => <OptimizelyContextProvider>{children}</OptimizelyContextProvider>,
		},
	);
};

declare global {
	interface Window {
		fandomCmp?: {
			ready: boolean;
			optOut: boolean;
			allowed: {
				tracking: boolean;
				ads: boolean;
			};
		};
	}
}

describe('useOptimizelyTrack', () => {
	beforeEach(() => {
		window.fandomCmp = { ready: true, allowed: { tracking: true } } as unknown as typeof window.fandomCmp;
	});
	it('should make a tracking request when experiment is active', async () => {
		const fetchMock = mockFetch();
		mockOptimizely();
		setup('1234');

		await act(() => {
			communicationService.dispatch({ type: '[Platform] optimizely loaded' });
		});

		const url = fetchMock.mock.calls[0][0];
		const searchParams = new URLSearchParams(url.split('?')[1]);

		expect(searchParams.get('ga_category')).toBe('dev-jwplayer-experiment: optimizely-1234');
		expect(searchParams.get('event')).toBe('variation: optimizely-5678');
		expect(searchParams.get('ga_action')).toBe('impression');
	});

	it('should not make a tracking request when experiment is not active', () => {
		const fetchMock = mockFetch();
		setup('1234');

		expect(fetchMock).not.toBeCalled();
	});
});
