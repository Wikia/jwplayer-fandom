export interface UnitDateRange {
	start?: number;
	end?: number;
}

export const checkDateRangeRule = (values: UnitDateRange): boolean => {
	const { start, end } = values;

	const currentTime = Date.now();
	let result = true;

	// if there's start date, check it
	if (typeof start === 'number' && currentTime < start) {
		result &&= false;
	}

	// if there's end date, check it
	if (typeof end === 'number' && currentTime > end) {
		result &&= false;
	}

	return result;
};
