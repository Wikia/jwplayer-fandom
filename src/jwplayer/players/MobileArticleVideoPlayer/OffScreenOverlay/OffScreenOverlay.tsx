import React from 'react';
import usePlaying from 'jwplayer/utils/usePlaying';
import VideoDetails from 'jwplayer/players/MobileArticleVideoPlayer/OffScreenOverlay/VideoDetails';
import CloseButton from 'jwplayer/players/shared/CloseButton/CloseButton';
import useAdBreak from 'utils/useAdBreak';

import clsx from 'clsx';

import styles from './offScreenOverlay.module.scss';

interface OffScreenOverlayWrapperProps {
	dismiss: () => void;
	isScrollPlayer: boolean;
}

const OffScreenOverlayWrapper: React.FC<OffScreenOverlayWrapperProps> = ({ dismiss, isScrollPlayer }) => {
	const playing = usePlaying();
	const adBreak = useAdBreak();

	const backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));`;
	const styleOverrides = {
		...(playing && { backgroundImage }),
	};
	const controlbar = document.querySelector<HTMLElement>('.jw-controlbar');
	let closeButtonOffset;

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
		<div
			className={clsx(`article-featured-video__on-scroll-video-wrapper`, styles.offScreenOverlayWrapper)}
			style={styleOverrides}
		>
			<CloseButtonStyled dismiss={dismiss} topOffset={closeButtonOffset} iconColor={'#fff'} />
			<VideoDetails playing={playing} />
		</div>
	);
};

interface CloseButtonStyledProps {
	dismiss: () => void;
	topOffset: number;
	iconColor: string;
}

const CloseButtonStyled: React.FC<CloseButtonStyledProps> = ({ dismiss, topOffset, iconColor }) => {
	const styleOverrides = {
		...(topOffset && { top: `${topOffset}px` }),
	};

	return (
		<CloseButton className={styles.closeButtonStyled} style={styleOverrides} iconColor={iconColor} dismiss={dismiss} />
	);
};

interface OffScreenOverlayProps {
	dismiss: () => void;
	isScrollPlayer: boolean;
}

const OffScreenOverlay: React.FC<OffScreenOverlayProps> = ({ dismiss, isScrollPlayer }) => {
	return <OffScreenOverlayWrapper dismiss={dismiss} isScrollPlayer={isScrollPlayer} />;
};

export default OffScreenOverlay;
