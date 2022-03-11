import React from 'react';
// import usePlaylistItem from 'utils/usePlaylistItem';
import usePlaying from 'utils/usePlaying';
import styled from 'styled-components';
import VideoDetails from 'players/MobileArticleVideoPlayer/OffScreenOverlay/VideoDetails';

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

const OffScreenOverlay: React.FC = () => {
	const playing = usePlaying();

	return (
		<OffScreenOverlayWrapper playing={playing}>
			<VideoDetails playing={playing} />
		</OffScreenOverlayWrapper>
	);
};

export default OffScreenOverlay;
