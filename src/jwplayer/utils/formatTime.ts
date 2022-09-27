export function formatTime(duration: number): string {
	const hours = Math.floor(duration / 3600);
	const minutes = Math.floor((duration - hours * 3600) / 60);
	const seconds = Math.floor(duration - hours * 3600 - minutes * 60);

	let durationStr = '';

	// If duration is below 0 seconds it means corrupted data, we don't want to display it
	// Also return early for 0 seconds
	if (duration <= 0) {
		return '00:00';
	}

	if (hours > 0) {
		durationStr += `${hours < 10 ? '0' : ''}${hours}:`;
	}

	durationStr += `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

	return durationStr;
}
