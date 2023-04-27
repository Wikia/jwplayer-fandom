import React from 'react';
import usePlaying from 'jwplayer/utils/usePlaying';
import styled from 'styled-components';
import VideoDetails from 'jwplayer/players/MobileArticleVideoPlayer/OffScreenOverlay/VideoDetails';
import CloseButton from 'jwplayer/players/shared/CloseButton/CloseButton';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import useAdBreak from 'utils/useAdBreak';

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

const CloseButtonStyled = styled(CloseButton).attrs((props: { topOffset: number }) => props)`
	position: absolute;
	right: 0;
	top: ${(props) => (props.topOffset ? `${props.topOffset}px` : 0)};
	filter: drop-shadow(1px 2px 2px rgb(0 0 0 / 0.7));
`;

interface OffScreenOverlayProps {
	dismiss: () => void;
	isScrollPlayer: boolean;
}

const OffScreenOverlay: React.FC<OffScreenOverlayProps> = ({ dismiss, isScrollPlayer }) => {
	const playing = usePlaying();
	const adBreak = useAdBreak();

	const controlbar = document.querySelector<HTMLElement>('.jw-controlbar');
	let closeButtonOffset = 0;

	if (adBreak) {
		console.debug('Ad should be playing. Adding 40px offset.');
		closeButtonOffset = 40;
	} else {
		console.debug("Ad should've finished. Setting top offset to 0px.");
		closeButtonOffset = 0;
	}

	if (!playing && !adBreak) {
		if (controlbar) controlbar.style.visibility = 'hidden';
	} else {
		if (controlbar) controlbar.style.visibility = 'visible';
	}

	if (!isScrollPlayer) return null;

	return (
		<OffScreenOverlayWrapper className={'article-featured-video__on-scroll-video-wrapper'} playing={playing}>
			<CloseButtonStyled dismiss={dismiss} topOffset={closeButtonOffset} iconColor={'#fff'} />
			<VideoDetails playing={playing} />
		</OffScreenOverlayWrapper>
	);
};

export default OffScreenOverlay;
