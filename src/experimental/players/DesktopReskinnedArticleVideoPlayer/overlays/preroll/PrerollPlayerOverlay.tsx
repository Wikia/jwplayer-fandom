import React, { useRef } from 'react';
import styled from 'styled-components';
import useOnScreen from 'utils/useOnScreen';
import PlayerOverlay from 'experimental/shared/PlayerOverlay';
import TimeSlider from 'experimental/shared/TimeSlider';
import { PrerollPlayerOverlayProps } from 'jwplayer/types';
import PrerollPlayerFullOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/preroll/PrerollPlayerFullOverlay';
import PrerollPlayerScrollOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/preroll/PrerollPlayerScrollOverlay';

const PrerollOverlayTimeSlider = styled(TimeSlider)`
	align-items: flex-end;
	position: absolute;
	bottom: 0;
`;

const PrerollPlayerOverlay: React.FC<PrerollPlayerOverlayProps> = ({ isScrollPlayer }) => {
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
		<PlayerOverlay>
			{isScrollPlayer ? <PrerollPlayerScrollOverlay /> : <PrerollPlayerFullOverlay />}
			{/* Full size */}
			{/* Scroll player */}
			<PrerollOverlayTimeSlider interactive={false} />
		</PlayerOverlay>
	);
};

export default PrerollPlayerOverlay;
