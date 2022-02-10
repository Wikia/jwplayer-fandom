import React, { useEffect } from 'react';
import { JWPlayerApi } from 'src/types';
import waitForEvent from 'src/utils/waitForEvent';
interface WindowJWPlayer extends Window {
	jwplayer?: JWPlayerApi;
}

declare let window: WindowJWPlayer;

/**
 * gets the android player if user is on an android device browser
 */
	function getDefaultPlayerUrl(){
	return !!navigator.userAgent.match(/android/i) ? 'https://cdn.jwplayer.com/libraries/MFqndUHM.js' : 'https://content.jwplatform.com/libraries/VXc5h4Tf.js';
}

/**
 * adds script tag
 * @param elementId
 * @param playerURL
 */
function createScriptTag(elementId, playerURL) {
	var script = document.createElement('script'),
		playerElement = document.getElementById(elementId);

	// script.onload = function () {
	// 	wikiaJWPlayerSettingsPlugin.register();

	// 	if (options.sharing) {
	// 		wikiaJWPlayerSharingPlugin.register();
	// 	}

	// 	if (options.showSmallPlayerControls) {
	// 		wikiaJWPlayerSmallPlayerControls.register();
	// 	}

	// 	if (options.useWirewax !== false) {
	// 		FandomWirewaxPlugin.register();
	// 	}

	// 	loadCallbacks.forEach(function (callback) {
	// 		callback();
	// 	});
	// };
	script.async = true;
	script.src = playerURL || getDefaultPlayerUrl();
	script.onload = () => {
		window.jwplayer(elementId).setup({
			playlist: 'https://cdn.jwplayer.com/v2/media/dWVV3F7S',
			plugins: {},
		})
	}
	// insert script node just after player element
	// console.log(playerElement.nextSibling);
	// playerElement.parentNode.insertBefore(script, playerElement.nextSibling);
	document.getElementsByTagName('head')[0].appendChild(script);
}

const JwPlayerWrapper = () => {

	useEffect(() => {
		createScriptTag('fandom-video-player', getDefaultPlayerUrl())
	}, []);

    return (
		<div id="fandom-video-player"> TEST TEST TEST </div>
	);
};

export default JwPlayerWrapper;