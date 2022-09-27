import { getGeo } from '@fandom/context';

function getUserGeo(): string {
	const country = getGeo()?.country ?? 'us';
	return country.toLowerCase();
}

export default function checkUserGeo(allowedGeos: string[]): boolean {
	const currentCountry = getUserGeo();
	return allowedGeos.some((c) => c.toLowerCase() === currentCountry);
}
