import React from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore (This package does exist, after the fandom player is built with 'yarn build-fandom-player')
import RedVentureVideoPlayer from '@fandom/jwplayer-fandom/RedVentureVideoPlayer';
import {
	assurePlayerUrl,
	buildRedVentureVideoDetails,
	canPlayerRender,
	getVideoDetails,
	getVideoWrapperElement,
	RedVenturePlayerContextProps
} from './loaderHelper';
import { RedVentureVideoDetails, RedVentureVideoPlayerProps } from "./types";

console.debug('Standalone RedVenture Video Player ...');

interface WindowWithRedVentureJWPlayer extends Window {
	fandomContext: {
		video?: {
			playerLoaded: boolean;
			playerName: string;
		};
		[key: string]: unknown;
	},
	loadPlayer: (props: RedVenturePlayerContextProps) => void;
}

declare let window: WindowWithRedVentureJWPlayer;

let jwPlayerContainerIdIncrementCounter = 0;

const getJwPlayerContainerEmbedId = (context: RedVenturePlayerContextProps): string => {
	if (context?.autoIncrementJwPlayerContainerId) {
		jwPlayerContainerIdIncrementCounter += 1;
		console.debug(
			`Auto increment option for the JWPlayer Container Id has been enabled. The next increment value is ${jwPlayerContainerIdIncrementCounter}.`,
		);
		return `featured-video__player_${jwPlayerContainerIdIncrementCounter}`;
	}

	if (context?.jwPlayerContainerEmbedId) {
		console.debug(
			`A jwPlayerContainerEmbedId value has been found. The JW Player container's id will be ${context?.jwPlayerContainerEmbedId}`,
		);
		return context?.jwPlayerContainerEmbedId;
	}

	return undefined;
};

const updateFandomContext = (): void => {
	(window.fandomContext = window.fandomContext || {}).video = {
		playerLoaded: true,
		playerName: 'jwplayer',
	};
};

window.loadPlayer = async (context: RedVenturePlayerContextProps) => {
	const canProceed = canPlayerRender(context);

	if (!canProceed) {
		throw new Error('Could not render the video player. The requirements for initialization were not met.');
	}

	context = assurePlayerUrl(context);

	const jwMediaDetails = await getVideoDetails(context);
	const redVentureVideoDetails: RedVentureVideoDetails = buildRedVentureVideoDetails(jwMediaDetails);

	const reactRoot = document.createElement('div');
	const videoWrapperElement = getVideoWrapperElement(context);
	videoWrapperElement.innerHTML = '';

	updateFandomContext();

	ReactDOM.render(
		React.createElement(RedVentureVideoPlayer, {
			videoDetails: redVentureVideoDetails,
			showScrollPlayer: context?.showScrollPlayer ?? false,
			jwPlayerContainerEmbedId: getJwPlayerContainerEmbedId(context),
			playerUrl: context?.playerUrl,
			autoPlay: context?.autoPlay,
		} as RedVentureVideoPlayerProps),
		reactRoot,
	);
	videoWrapperElement.appendChild(reactRoot);
};
