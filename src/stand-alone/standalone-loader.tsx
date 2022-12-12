import React from 'react';
import ReactDOM from 'react-dom';
import {
	/* CanonicalVideoDetails,
	CanonicalVideoPlayerProps, */
	DesktopArticleVideoPlayerProps,
} from 'jwplayer/types';
/* import RedVentureVideoPlayer from 'jwplayer/players/RedVentureVideoPlayer/RedVentureVideoPlayer'; */
import DesktopArticleVideoPlayer from 'jwplayer/players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer';

import { ARTICLE_VIDEO_DETAILS } from './videoConfigs';

console.log('Outside of the DesktopArticleVideoLoader.');

interface RedVenturePlayerContextProps {
	contextName: string;
	embedSelector: string;
	mediaId?: string;
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
	console.log('context object: ', context);

	/* let videoDetails: CanonicalVideoDetails = null;
	getVideoDetails(context.mediaId).then((videoContent) => {
		videoDetails = videoContent.playlist[0] as CanonicalVideoDetails;
		console.log('videoDetails from inside the getVideoDetails promise: ', videoDetails);
	});

	console.log('videoDetails from outside the getVideoDetails promise: ', videoDetails); */
	const reactRoot = document.createElement('div');
	const videoWrapperEl = document.querySelector(context?.embedSelector);
	videoWrapperEl.innerHTML = '';
	// console.log('\t */\n: ', ARTICLE_VIDEO_DETAILS);
	// console.log('Added currentVideo with: ', videoId);
	/* ReactDOM.render(
		React.createElement(RedVentureVideoPlayer, {
			currentVideo: `https://cdn.jwplayer.com/v2/media/${context.mediaId}`,
			videoDetails: videoDetails,
		} as CanonicalVideoPlayerProps),
		reactRoot,
	); */
	console.log('Loading in the DesktopArticleVideoPlayer in the standalone-loader');
	ReactDOM.render(
		React.createElement(DesktopArticleVideoPlayer, {
			videoDetails: ARTICLE_VIDEO_DETAILS,
		} as DesktopArticleVideoPlayerProps),
		reactRoot,
	);
	videoWrapperEl.appendChild(reactRoot);
	console.log("Should've loaded RedVentureVideoPlayer with preconfigured video.");
};
