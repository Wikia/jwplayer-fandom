import { getWikiaBeaconId } from '@fandom/context';
import getValueFromQuery from 'utils/getValuefromQuery';

export const DEFAULT_BUCKET_INDEX = 0;

export default function checkUserBucket(index = DEFAULT_BUCKET_INDEX): string {
	const forcedBucket = getValueFromQuery('jw_force_experiment_bucket');

	if (typeof forcedBucket !== 'undefined' && forcedBucket?.length > 0) {
		return forcedBucket?.[index];
	}

	const beacon = getWikiaBeaconId() || '0';

	return beacon?.[index];
}
