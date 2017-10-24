var autoplayCookieName = 'featuredVideoAutoplay',
	// TODO provide cookies function
	// remember about cross-domain cookie
	cookies = {
		set: function (name, value) {
			console.log('set cookie', name, value);
		},
		get: function () {
			return true;
		}
	};

function toggleAutoplay(enableAutoplay) {
	if (enableAutoplay === undefined) {
		enableAutoplay = !isAutoplayEnabled();
	}

	cookies.set(autoplayCookieName, enableAutoplay ? '1' : '0');

	return enableAutoplay;
}

function isAutoplayEnabled() {
	var cookieValue = cookies.get(autoplayCookieName);

	return cookieValue !== '0';
}

function willAutoplay() {
	return isAutoplayEnabled() && window.JWPlayerAutoplay.enabled;
}

window.JWPlayerAutoplay = {
	isAutoplayEnabled: isAutoplayEnabled,
	toggleAutoplay: toggleAutoplay,
	willAutoplay: willAutoplay,
	showToggle: true,
	enabled: true
};