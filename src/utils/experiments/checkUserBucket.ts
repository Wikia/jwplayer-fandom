import { getWikiaBeaconId } from '@fandom/context';
import getValueFromQuery from 'utils/getValuefromQuery';

export const DEFAULT_BUCKET_INDEX = 0;
export const ALLOWED_BUCKET_CHAR = /[0-9a-zA-Z_-]/;

export function getUserBucket(index = DEFAULT_BUCKET_INDEX): string {
	const forcedBucket = getValueFromQuery('jw_force_experiment_bucket');

	if (typeof forcedBucket !== 'undefined' && forcedBucket?.length > 0) {
		return forcedBucket?.[index];
	}

	const beacon = getWikiaBeaconId() || '0';

	return beacon?.[index];
}

export function isUserInBucket(allowedBuckets: string[]): boolean {
	if (allowedBuckets.map((bucket) => !ALLOWED_BUCKET_CHAR.test(bucket)).some(Boolean)) {
		return false;
	}

	const userBucket = getUserBucket();
	return allowedBuckets.some((bucket) => bucket === userBucket);
}
