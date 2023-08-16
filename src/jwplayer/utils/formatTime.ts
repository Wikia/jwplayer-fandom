function isNumber(value: unknown): boolean {
	return typeof value === 'number' && !isNaN(value);
}

export function formatTime(duration: number): string {
	// If duration is below 0 seconds or is not a number it means corrupted data, we don't want to display it
	// Also return early for 0 seconds
	if (duration <= 0 || !isNumber(duration)) {
		return '00:00';
	}

	const hours = Math.floor(duration / 3600);
	const minutes = Math.floor((duration - hours * 3600) / 60);
	const seconds = Math.floor(duration - hours * 3600 - minutes * 60);

	let durationStr = '';

	if (hours > 0) {
		durationStr += `${hours < 10 ? '0' : ''}${hours}:`;
	}

	durationStr += `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

	return durationStr;
}
