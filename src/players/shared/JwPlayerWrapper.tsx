import React, { useEffect, useLayoutEffect } from 'react';
 
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
		// insert script node just after player element
		playerElement.parentNode.insertBefore(script, playerElement.nextSibling);
	}

const JwPlayerWrapper = ({ config }) => {
    useEffect(() => {
        createScriptTag('fandom-video-player', null)
    }, []);

    useLayoutEffect(() => {
        // window.jwplayer('jw-video-container').setup({
        //     playlist: 'https://cdn.jwplayer.com/v2/media/dWVV3F7S',
        //     plugins: {},
        // })
    }, []);

    <div className="fandom-video-player" />
};

export default JwPlayerWrapper;