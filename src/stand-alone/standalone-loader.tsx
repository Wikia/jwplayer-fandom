import React from 'react';
import ReactDOM from 'react-dom';
import { RedVentureVideoDetails, RedVentureVideoPlayerProps } from 'jwplayer/types';
import RedVentureVideoPlayer from 'jwplayer/players/RedVentureVideoPlayer/RedVentureVideoPlayer';
import {
	buildRedVentureVideoDetails,
	canPlayerRender,
	getVideoDetails,
	getVideoWrapperElement,
} from 'stand-alone/loaderHelper';
import { RedVenturePlayerContextProps } from 'stand-alone/loaderHelper';

console.debug('Standalone RedVenture Video Player ...');

interface WindowWithRedVentureJWPlayer extends Window {
	loadPlayer: (props: RedVenturePlayerContextProps) => void;
}

declare let window: WindowWithRedVentureJWPlayer;

// TODO: Investigate the following
/*
 *
 * -Figure out if the videos should have an item link to the video-platform. Given that
 * the PlayerOne videos might be hosted in a different Workspace on the JW Platform, they won't be available
 * on the video-platform.
 *
 * -Figure out mediaQuery breakpoints between desktop vs mobile on all the sites.
 * Do all the sites have the same exact breakpoints?
 * Is there a table version of any of the sites?
 * Should the sites provide a function that can be used by the player to determine whether
 * it should display a mobile/desktop typo of player?
 *
 * */

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

window.loadPlayer = async (context: RedVenturePlayerContextProps) => {
	const canProceed = canPlayerRender(context);

	if (!canProceed) {
		throw new Error('Could not render the video player. The requirements for initialization were not met.');
	}

	const jwMediaDetails = await getVideoDetails(context.mediaId);
	const redVentureVideoDetails: RedVentureVideoDetails = buildRedVentureVideoDetails(jwMediaDetails);

	const reactRoot = document.createElement('div');
	const videoWrapperElement = getVideoWrapperElement(context);
	videoWrapperElement.innerHTML = '';

	ReactDOM.render(
		React.createElement(RedVentureVideoPlayer, {
			videoDetails: redVentureVideoDetails,
			showScrollPlayer: context?.showScrollPlayer ?? false,
			jwPlayerContainerEmbedId: getJwPlayerContainerEmbedId(context),
		} as RedVentureVideoPlayerProps),
		reactRoot,
	);
	videoWrapperElement.appendChild(reactRoot);
};
