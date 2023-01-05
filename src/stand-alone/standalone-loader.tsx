import React from 'react';
import ReactDOM from 'react-dom';
import { RedVentureVideoDetails, RedVentureVideoPlayerProps } from 'jwplayer/types';
import RedVentureVideoPlayer from 'jwplayer/players/RedVentureVideoPlayer/RedVentureVideoPlayer';

console.debug('Standalone RedVenture Video Player ...');

interface RedVenturePlayerContextProps {
	contextName: string;
	embedSelector: string;
	mediaId?: string;
	showScrollPlayer?: boolean;
}

interface WindowWithRedVentureJWPlayer extends Window {
	loadPlayer: (props: RedVenturePlayerContextProps) => void;
}

declare let window: WindowWithRedVentureJWPlayer;

async function getVideoDetails(mediaId: string) {
	try {
		const response = await fetch('https://cdn.jwplayer.com/v2/media' + '/' + mediaId, {
			method: 'get',
		});

		if (!response.ok) {
			console.error(`Could not find video details for mediaId: ${mediaId}`);
			return null;
		}

		return await response.json();
	} catch (e) {
		console.error(`Could not fetch the video details for mediaId: ${mediaId}`, e);
	}
}

const buildRedVentureVideoDetails = (jwDetails): RedVentureVideoDetails => {
	if (!jwDetails) {
		return null;
	}
	return {
		title: jwDetails?.title,
		description: jwDetails?.description,
		kind: jwDetails?.kind,
		playlist: jwDetails?.playlist,
		feed_instance_id: jwDetails?.feed_instance_id,
		videoTags: jwDetails?.playlist?.[0]?.tags,
		duration: jwDetails?.playlist?.[0]?.duration,
		mediaId: jwDetails?.playlist?.[0]?.mediaId,
	};
};

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
	console.debug('Will show mini player: ', context?.showScrollPlayer ?? false);

	getVideoDetails(context.mediaId).then((videoContent) => {
		const videoDetails: RedVentureVideoDetails = buildRedVentureVideoDetails(videoContent);
		console.debug('videoDetails from inside the getVideoDetails promise: ', videoDetails);

		const reactRoot = document.createElement('div');
		const videoWrapperEl = document.querySelector(context?.embedSelector);
		videoWrapperEl.innerHTML = '';

		console.debug('Loading in the RedVentureVideoPlayer in the standalone-loader');
		ReactDOM.render(
			React.createElement(RedVentureVideoPlayer, {
				videoDetails: videoDetails,
				showScrollPlayer: context?.showScrollPlayer ?? false,
			} as RedVentureVideoPlayerProps),
			reactRoot,
		);
		videoWrapperEl.appendChild(reactRoot);
		console.debug("Should've loaded RedVentureVideoPlayer with preconfigured video.");
	});
};
