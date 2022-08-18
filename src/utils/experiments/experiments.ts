import { checkIfUserInBucket, getValueFromQuery } from './bucketingUtils';
import { checkDateRangeRule, UnitDateRange } from './checkDateRange';

export function checkIfUserInNoVideoExperiment() {
	const queryValue = Date.parse(getValueFromQuery('jw_experiment_end_date', ''));
	let endDate = null;

	if (isNaN(queryValue)) {
		endDate = Date.parse('2022-08-31T00:00:00');
	} else {
		endDate = queryValue;
	}

	const dateRangeConfig: UnitDateRange = {
		// no set start date, start running from the beginning of deploy
		start: null,
		// experiment ends: 1 week after deploy
		end: endDate,
	};

	return (
		// - check if the experiment is within the date range
		checkDateRangeRule(dateRangeConfig) &&
		// - check if user is in bucket
		checkIfUserInBucket(['a'])
	);
}
