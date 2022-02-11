import React, { useEffect } from 'react';
import { JWPlayerApi } from 'src/types';

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
	var script = document.createElement('script');

	script.async = true;
	script.src = playerURL || getDefaultPlayerUrl();
	script.onload = () => {
		window.jwplayer(elementId).setup({
			playlist: 'https://cdn.jwplayer.com/v2/media/dWVV3F7S',
			plugins: {},
		})
	}

	document.getElementsByTagName('head')[0].appendChild(script);
}

const JwPlayerWrapper = () => {

	useEffect(() => {
		// TODO: check if jwplayer is already loaded
		createScriptTag('fandom-video-player', getDefaultPlayerUrl())
	}, []);

    return (
		<div id="fandom-video-player"> TEST TEST TEST </div>
	);
};

export default JwPlayerWrapper;