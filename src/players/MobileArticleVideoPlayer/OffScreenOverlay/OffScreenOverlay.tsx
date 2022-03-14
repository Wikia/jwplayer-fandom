import React from 'react';
// import usePlaylistItem from 'utils/usePlaylistItem';
import usePlaying from 'utils/usePlaying';
import styled from 'styled-components';
import VideoDetails from 'players/MobileArticleVideoPlayer/OffScreenOverlay/VideoDetails';
import CloseButton from 'players/MobileArticleVideoPlayer/OffScreenOverlay/CloseButton';

interface OffScreenOverlayWrapperProps {
	playing: boolean;
}

const OffScreenOverlayWrapper = styled.div<OffScreenOverlayWrapperProps>`
	${(props) => !props.playing && `background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));`}
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	z-index: 5;
`;

interface OffScreenOverlayProps {
	dismiss: () => void;
}

const OffScreenOverlay: React.FC<OffScreenOverlayProps> = ({ dismiss }) => {
	const playing = usePlaying();
	const controlbar = document.querySelector<HTMLElement>('.jw-controlbar');

	if (!playing) {
		if (controlbar) controlbar.style.visibility = 'hidden';
	} else {
		if (controlbar) controlbar.style.visibility = 'visible';
	}

	return (
		<OffScreenOverlayWrapper playing={playing}>
			<CloseButton dismiss={dismiss} />
			<VideoDetails playing={playing} />
		</OffScreenOverlayWrapper>
	);
};

export default OffScreenOverlay;
