import React, { useEffect, useRef, useState } from 'react';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import styled, { css } from 'styled-components';
import UnmuteButton from 'jwplayer/players/DesktopArticleVideoPlayer/UnmuteButton';
import JwPlayerWrapper from 'jwplayer/players/shared/JwPlayerWrapper';
import VideoDetails from 'jwplayer/players/DesktopArticleVideoPlayer/VideoDetails';
import useOnScreen from 'utils/useOnScreen';
import useRvAdComplete from 'jwplayer/utils/useRvAdComplete';
import PlayerWrapper from 'jwplayer/players/shared/PlayerWrapper';
import { RedVentureVideoPlayerProps } from 'jwplayer/types';
import CloseButton from 'jwplayer/players/shared/CloseButton';
import redVenturePlayerOnReady from 'jwplayer/players/RedVentureVideoPlayer/redVenturePlayerOnReady';
import { getRedVentureVideoConfig } from 'jwplayer/players/RedVentureVideoPlayer/getRedVentureVideoConfig';
import { disableTimingEventsSamplingRate } from 'jwplayer/utils/videoTimingEvents';

interface PhoenixUser {
	isPremium?: () => boolean;
}

interface Phoenix {
	User?: PhoenixUser;
}

interface WindowWithPhoenix extends Window {
	Phoenix?: Phoenix;
}

declare let window: WindowWithPhoenix;

const RedVentureVideoTopPlaceholder = styled.div`
	z-index: ${Number(WDSVariables.z2) + 2};
	position: absolute;
	width: 100%;
	padding-top: 56.25%;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 2;
`;

interface RedVentureVideoWrapperProps {
	isScrollPlayer: boolean;
	right?: number;
	width?: number;
}

const RedVentureVideoWrapper = styled.div<RedVentureVideoWrapperProps>`
	height: max-content;
	${(props) =>
		props.isScrollPlayer
			? css`
					position: fixed;
					right: 18px;
					bottom: 45px;
					width: 300px;
			  `
			: css`
					position: absolute;
					bottom: 0;
					right: 0;
					top: 0;
					left: 0;
			  `}
`;

const TopBar = styled.div`
	width: 100%;
	position: relative;
`;

const RedVentureVideoPlayer: React.FC<RedVentureVideoPlayerProps> = ({
	videoDetails,
	showScrollPlayer,
	jwPlayerContainerEmbedId,
	playerUrl,
	autoPlay,
}) => {
	console.debug('This is a message from the usual RedVentureVideoPlayer');
	const placeholderRef = useRef<HTMLDivElement>(null);
	// Check if Ads are disabled on any of the N&R Games sites. If the resolving function is not present, then always resolve to connecting with AdEng.
	// This check should only apply to the GiantBomb N&R site. Safeguards are added in for other sites, where this function may not be defined.
	// If the user is a GiantBomb premium user, then let's flag the video player as not having ads. Premium users should not see video ads.
	const hasAds =
		window?.Phoenix?.User?.isPremium && typeof window?.Phoenix?.User?.isPremium === 'function'
			? !window.Phoenix.User.isPremium()
			: true;
	const adComplete = useRvAdComplete(hasAds);
	const onScreen = useOnScreen(placeholderRef, '0px', 0.5);
	const [dismissed, setDismissed] = useState(false);
	const isScrollPlayer = showScrollPlayer ? !(dismissed || onScreen) : false;
	const boundingClientRect = placeholderRef.current?.getBoundingClientRect();
	const right = boundingClientRect?.right;
	const width = boundingClientRect?.width;
	const controlbar = document.querySelector<HTMLElement>('.jw-controlbar');
	const shareIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-settings-sharing');
	const moreVideosIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-related-btn');
	const pipIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-icon-pip');

	useEffect(() => {
		// Remove this once the browser-tracking-metrics library (tracking-metrics package) is fixed,
		// and the proper App value is sourced.
		disableTimingEventsSamplingRate();
	}, []);

	if (onScreen) {
		if (controlbar) controlbar.style.background = 'rgba(0, 0, 0, 0.5)';
		if (shareIcon) shareIcon.style.display = 'flex';
		if (moreVideosIcon) moreVideosIcon.style.display = 'flex';
		if (pipIcon) pipIcon.style.display = 'flex';
	} else {
		if (controlbar) controlbar.style.background = 'linear-gradient(0,#000,transparent)';
		if (shareIcon) shareIcon.style.display = 'none';
		if (moreVideosIcon) moreVideosIcon.style.display = 'none';
		if (pipIcon) pipIcon.style.display = 'none';
	}

	return (
		<PlayerWrapper playerName="jw-red-venture-video">
			<RedVentureVideoTopPlaceholder ref={placeholderRef}>
				{adComplete && (
					<RedVentureVideoWrapper right={right} width={width} isScrollPlayer={isScrollPlayer}>
						<TopBar>
							{!isScrollPlayer && <UnmuteButton />}
							{isScrollPlayer && <CloseButton dismiss={() => setDismissed(true)} />}
						</TopBar>
						<JwPlayerWrapper
							config={getRedVentureVideoConfig(videoDetails, autoPlay)}
							onReady={(playerInstance) => redVenturePlayerOnReady(videoDetails, playerInstance)}
							stopAutoAdvanceOnExitViewport={false}
							shouldLoadSponsoredContentList={false}
							jwPlayerContainerEmbedId={jwPlayerContainerEmbedId}
							playerUrl={playerUrl}
						/>
						{isScrollPlayer && <VideoDetails />}
					</RedVentureVideoWrapper>
				)}
			</RedVentureVideoTopPlaceholder>
		</PlayerWrapper>
	);
};

export default RedVentureVideoPlayer;
