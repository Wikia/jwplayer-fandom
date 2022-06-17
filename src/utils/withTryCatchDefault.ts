// Ensure all of these oeprations are safe
export default const withTryCatchDefault =
	(func: () => any, fallback = '') =>
	() => {
		// JWPLayer not yet ready
		if (typeof window === 'undefined' || !window.jwplayer || typeof window.jwplayer !== 'function') {
			return '';
		}

		try {
			return func();
		} catch (e) {
			return fallback;
		}
	};
