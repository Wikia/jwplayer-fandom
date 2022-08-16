import { checkIfUserInBucket } from './bucketingUtils';
import checkIfUserInGeo from './checkIfUserInGeo';
import isUserAnon from './checkUserAnon';

export function checkIfUserInNoVideoExperiment() {
	return (
		// - user is in the US
		checkIfUserInGeo(['US']) &&
		// - user is anon
		isUserAnon() &&
		// - check if user is in bucket
		checkIfUserInBucket(['A'])
	);
}
