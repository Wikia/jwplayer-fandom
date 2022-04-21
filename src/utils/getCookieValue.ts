export default function getCookieValue(cookieName: string): string {
	try {
		const cookies = document.cookie.split('; ');
		if (cookies.length === 0) {
			return '';
		}

		const cookie = cookies.find((row) => row.startsWith(`${cookieName}=`));

		if (cookie) {
			const split = cookie.split('=')[1];

			if (split) {
				return split;
			}
		}
		return '';
	} catch (e) {
		console.error('Error finding cookie ' + cookieName, e);
		return '';
	}
}
