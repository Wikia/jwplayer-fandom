import { getWikiaBeaconId } from '@fandom/context';

export const ALLOWED_BUCKET_CHAR = /[0-9a-zA-Z_-]/;

/**
 * Gets the current bucket for user based on the following rules:
 *
 * - If the user is in a forced bucket, return that bucket.
 * - If the user is not in a forced bucket, return the bucket based on `getWikiaBeaconId`.
 */
export function getCurrentBucket(index = 0): string {
	const forcedBucket = getValueFromQuery('ss_pathfinder_force_bucket');

	if (typeof forcedBucket !== 'undefined' && forcedBucket?.length > 0) {
		return forcedBucket?.[index];
	}

	const beacon = getWikiaBeaconId() || '0';

	return beacon?.[index];
}

/** Gets value from URL's query string */
export function getValueFromQuery(name: string, defaultValue?: string): string {
	const searchParams = new URLSearchParams(window?.location.search);
	if (!searchParams.has(name)) {
		return defaultValue ?? '';
	}

	return searchParams.get(name) ?? '';
}

/** Checks weather the user's current bucket identifier is in the allowed defined buckets */
export function checkIfUserInBucket(allowedBuckets: string[]): boolean {
	if (allowedBuckets.map((bucket) => !ALLOWED_BUCKET_CHAR.test(bucket)).some(Boolean)) {
		return false;
	}

	const userBucket = getCurrentBucket();
	return allowedBuckets.some((bucket) => bucket === userBucket);
}
