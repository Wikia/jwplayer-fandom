import React, { useRef, useState } from 'react';
import VimeoPlayerWrapper from 'vimeo/players/shared/VimeoPlayerWrapper';
import useOnScreen from 'utils/useOnScreen';
import PlayerWrapper from 'vimeo/players/shared/PlayerWrapper';
import { VimeoArticleVideoPlayerProps } from 'vimeo/types';

import clsx from 'clsx';

import styles from './VimeoMobileArticleVideoPlayer.module.css';
import MobileVimeoOffScreenOverlay from './overlays/MobileVimeoOffScreenOverlay';

interface MobileArticleVideoWrapperProps {
	topPosition: string;
	vimeoDetails: any;
}

interface MobileArticleVideoPlayerProps extends VimeoArticleVideoPlayerProps {
	hasPartnerSlot?: boolean;
	isFullScreen?: boolean;
}

const MobileArticleVideoWrapper: React.FC<MobileArticleVideoWrapperProps> = ({
	vimeoDetails,
	topPosition,
	children,
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const onScreen = useOnScreen(ref, '0px', 1);
	const [dismissed, setDismissed] = useState(false);
	const isScrollPlayer = !(dismissed || onScreen);

	return (
		<div ref={ref} className={clsx(styles.mobileArticleVideoTopPlaceholder, isScrollPlayer && `is-on-scroll-active`)}>
			<div
				className={clsx(
					`mobile-article-video-wrapper`,
					isScrollPlayer
						? styles.mobileArticleVideoWrapperIsScrollPlayer
						: styles.mobileArticleVideoWrapperIsNotScrollPlayer,
				)}
				style={{
					...(isScrollPlayer && { top: topPosition }),
				}}
			>
				<MobileVimeoOffScreenOverlay dismiss={() => setDismissed(true)} isScrollPlayer={isScrollPlayer} />
				<VimeoPlayerWrapper deviceType="mobile" vimeoDetails={vimeoDetails} />
				{children}
			</div>
		</div>
	);
};

const VimeoMobileArticleVideoPlayer: React.FC<MobileArticleVideoPlayerProps> = ({
	hasPartnerSlot,
	isFullScreen,
	vimeoDetails,
}) => {
	const getTopPosition = () => {
		if (isFullScreen) {
			return '0px';
		}

		if (hasPartnerSlot) {
			return '75px';
		}

		return '55px';
	};

	return (
		<PlayerWrapper playerName="youtube-mobile-article-video">
			<MobileArticleVideoWrapper vimeoDetails={vimeoDetails} topPosition={getTopPosition()} />
		</PlayerWrapper>
	);
};

export default VimeoMobileArticleVideoPlayer;
