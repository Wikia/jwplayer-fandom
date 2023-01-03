import React from 'react';
import ReactDOM from 'react-dom';
import { RedVentureVideoPlayerProps } from 'jwplayer/types';
import RedVentureVideoPlayer from 'jwplayer/players/RedVentureVideoPlayer/RedVentureVideoPlayer';

import { ARTICLE_VIDEO_DETAILS } from './videoConfigs';

console.debug('Standalone RedVenture Video Player ...');

interface RedVenturePlayerContextProps {
	contextName: string;
	embedSelector: string;
	mediaId?: string;
	showMiniPlayer?: boolean;
}

interface WindowWithRedVentureJWPlayer extends Window {
	loadPlayer: (props: RedVenturePlayerContextProps) => void;
}

declare let window: WindowWithRedVentureJWPlayer;

/* async function getVideoDetails(mediaId: string) {
	try {
		const response = await fetch('https://cdn.jwplayer.com/v2/media' + '/' + mediaId, {
			headers: {
				// 'cache-control': 'public, s-maxage=60, stale-while-revalidate=300',
			},
			method: 'get',
		});

		if (!response.ok) {
			console.error(`Could not find video details for mediaId: ${mediaId}`);
			return null;
		}

		return await response.json();
	} catch (e) {
		console.error(e);
		return null;
	}
} */

window.loadPlayer = (context: RedVenturePlayerContextProps) => {
	if (!context) {
		console.error('A context object was not provided for the RedVenture JW Player.');
		return;
	}
	if (!context?.contextName) {
		console.error('A contextName has to be provided in the context object.');
		return;
	}
	if (!context?.embedSelector) {
		console.error(
			'An embed element selector must be provided in the context object, so that the video player can render on the page.',
		);
	}
	if (!context?.mediaId) {
		console.error('A mediaId has to be provided in the context object.');
	}
	console.debug('context object: ', context);

	console.debug('Will show mini player: ', context?.showMiniPlayer ?? false);

	/* let videoDetails: CanonicalVideoDetails = null;
	getVideoDetails(context.mediaId).then((videoContent) => {
		videoDetails = videoContent.playlist[0] as CanonicalVideoDetails;
		console.debug('videoDetails from inside the getVideoDetails promise: ', videoDetails);
	});

	console.debug('videoDetails from outside the getVideoDetails promise: ', videoDetails); */
	const reactRoot = document.createElement('div');
	const videoWrapperEl = document.querySelector(context?.embedSelector);
	videoWrapperEl.innerHTML = '';
	// console.debug('\t */\n: ', ARTICLE_VIDEO_DETAILS);
	// console.debug('Added currentVideo with: ', videoId);
	/* ReactDOM.render(
		React.createElement(RedVentureVideoPlayer, {
			currentVideo: `https://cdn.jwplayer.com/v2/media/${context.mediaId}`,
			videoDetails: videoDetails,
		} as CanonicalVideoPlayerProps),
		reactRoot,
	); */
	console.debug('Loading in the RedVentureVideoPlayer in the standalone-loader');
	ReactDOM.render(
		React.createElement(RedVentureVideoPlayer, {
			videoDetails: ARTICLE_VIDEO_DETAILS,
			showMiniPlayer: context?.showMiniPlayer ?? false,
		} as RedVentureVideoPlayerProps),
		reactRoot,
	);
	videoWrapperEl.appendChild(reactRoot);
	console.debug("Should've loaded RedVentureVideoPlayer with preconfigured video.");
};
