import React, { useRef } from 'react';
import styled from 'styled-components';
import VideoDetails from 'jwplayer/players/DesktopArticleVideoPlayer/VideoDetails';
import useOnScreen from 'utils/useOnScreen';
import { ContentPlayerOverlayProps } from 'jwplayer/types';
import CloseButton from 'jwplayer/players/shared/CloseButton';
import TimeSlider from 'experimental/shared/TimeSlider';
import ControlBarWrapper from 'experimental/shared/ControlBar';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
import PlayerOverlay from 'experimental/shared/PlayerOverlay';
/* import useAdComplete from 'jwplayer/utils/useAdComplete'; */

const TopBar = styled.div`
	width: 100%;
	position: relative;
`;

const PlayerOverlayStyled = styled(PlayerOverlay)`
	padding: 1em 1.6em;
`;

const ContentOverlayTimeSlider = styled(TimeSlider)`
	padding: 0 12px;
`;

const ContentPlayerOverlay: React.FC<ContentPlayerOverlayProps> = ({ isScrollPlayer, setDismissed }) => {
	const placeholderRef = useRef<HTMLDivElement>(null);
	/* TODO: FIX THIS - This is used to test the player locally ONLY */
	const onScreen = useOnScreen(placeholderRef, '0px', 0.1);
	const controlbar = document.querySelector<HTMLElement>('.jw-controlbar');
	const shareIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-settings-sharing');
	const moreVideosIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-related-btn');
	const pipIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-icon-pip');

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
		<PlayerOverlayStyled>
			<TopBar>
				{/* {!isScrollPlayer && <UnmuteButton />} */}
				{isScrollPlayer && <CloseButton dismiss={() => setDismissed(true)} />}
			</TopBar>
			<ControlBarWrapper id={'control-bar-wrapper'}>
				<ContentOverlayTimeSlider />
				<PlayStateWrapper />
			</ControlBarWrapper>
			{isScrollPlayer && <VideoDetails />}
		</PlayerOverlayStyled>
	);
};

export default ContentPlayerOverlay;
