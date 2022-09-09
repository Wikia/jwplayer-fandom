import React from 'react';
import usePlaying from 'jwplayer/utils/usePlaying';
import styled from 'styled-components';
import VideoDetails from 'jwplayer/players/MobileArticleVideoPlayer/OffScreenOverlay/VideoDetails';
import CloseButton from 'jwplayer/players/shared/CloseButton';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import useAdBreak from 'jwplayer/utils/useAdBreak';

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
	z-index: ${Number(WDSVariables.z7) + 2};
`;

interface OffScreenOverlayProps {
	dismiss: () => void;
}

const OffScreenOverlay: React.FC<OffScreenOverlayProps> = ({ dismiss }) => {
	const playing = usePlaying();
	const controlbar = document.querySelector<HTMLElement>('.jw-controlbar');
	const adBreak = useAdBreak();

	console.log('adBreak:', adBreak);

	if (!playing) {
		if (controlbar) controlbar.style.visibility = 'hidden';
	} else {
		if (controlbar) controlbar.style.visibility = 'visible';
	}

	return (
		<OffScreenOverlayWrapper className={'article-featured-video__on-scroll-video-wrapper'} playing={playing}>
			<CloseButton dismiss={dismiss} />
			<VideoDetails playing={playing} />
		</OffScreenOverlayWrapper>
	);
};

export default OffScreenOverlay;
