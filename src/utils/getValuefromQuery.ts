import { isClientSide } from 'utils/getEnv';

export default function getValueFromQuery(name: string, defaultValue?: string): string {
	if (!isClientSide()) {
		return '';
	}

	const searchParams = new URLSearchParams(window?.location.search);
	if (!searchParams.has(name)) {
		return defaultValue ?? '';
	}

	return searchParams.get(name) ?? '';
}
