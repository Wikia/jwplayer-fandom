import { getForcedOptimizely } from './getForcedOptimizely';

const originalLocation = window.location;
describe('getForcedOptimizely', () => {
	it('should return undefined if there is no forced variation', () => {
		expect(getForcedOptimizely()).toBe(undefined);
	});

	it('should return experimentId and variationId if there is a forced variation', () => {
		const experimentId = '123456789';
		const variationId = '987654321';
		const searchParams = new URLSearchParams();
		searchParams.set('video_optimizely_force', `${experimentId}_${variationId}`);
		jest.spyOn(window, 'location', 'get').mockImplementation(() => ({
			...originalLocation,
			search: searchParams.toString(),
		}));

		expect(getForcedOptimizely()).toEqual({
			experimentId,
			variationId,
		});
	});
});
