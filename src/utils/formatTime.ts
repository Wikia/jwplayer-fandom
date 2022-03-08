export function formatTime(duration: number): string {
	const hours = Math.floor(duration / 3600);
	const minutes = Math.floor(duration / 60);
	const seconds = duration % 60;
	return `${hours ? `${hours}:` : ''}${minutes ? `${minutes}:` : ''}${seconds}`;
}
